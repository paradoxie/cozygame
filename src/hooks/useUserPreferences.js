import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { db, doc, getDoc, setDoc, updateDoc } from '../services/firebase';

const MAX_RECENTLY_PLAYED = 5;

export function useUserPreferences() {
  const { user } = useAuth();

  // 从localStorage初始化
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '{}'); }
    catch { return {}; }
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recentlyPlayed') || '[]'); }
    catch { return []; }
  });
  const [isSynced, setIsSynced] = useState(false); // 跟踪是否已从Firestore同步

  // 用户登录时从Firestore同步
  useEffect(() => {
    if (user && db && !isSynced) { // 只有当用户已登录且尚未同步时
      const syncFromFirestore = async () => {
        const userRef = doc(db, 'users', user.uid);
        try {
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const cloudData = snap.data();
            
            const localFav = JSON.parse(localStorage.getItem('favorites') || '{}');
            const cloudFav = cloudData.favorites || {};
            const mergedFavorites = { ...localFav, ...cloudFav }; // 云端数据优先
            setFavorites(mergedFavorites);
            localStorage.setItem('favorites', JSON.stringify(mergedFavorites));

            const localRecent = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
            const cloudRecent = cloudData.recentlyPlayed || [];
            let mergedRecently = Array.from(new Set([...cloudRecent, ...localRecent])); // 云端项目优先，然后是本地，去重
            if (mergedRecently.length > MAX_RECENTLY_PLAYED) {
              mergedRecently = mergedRecently.slice(0, MAX_RECENTLY_PLAYED);
            }
            setRecentlyPlayed(mergedRecently);
            localStorage.setItem('recentlyPlayed', JSON.stringify(mergedRecently));
          } else {
            // Firestore中没有数据，上传本地数据
            await setDoc(userRef, { 
              favorites: JSON.parse(localStorage.getItem('favorites') || '{}'), 
              recentlyPlayed: JSON.parse(localStorage.getItem('recentlyPlayed') || '[]') 
            });
          }
          setIsSynced(true); // 标记为已同步
        } catch (error) {
          console.error("从Firestore同步数据时出错:", error);
        }
      };
      syncFromFirestore();
    } else if (!user) {
      setIsSynced(false); // 登出时重置同步状态
    }
  }, [user, db, isSynced]);

  // 将特定数据类型同步到Firestore
  const syncToFirestore = useCallback(async (dataType, data) => {
    if (user && db) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userRef, { [dataType]: data });
      } catch (error) {
        // 如果文档不存在（例如，新用户，初始同步完成前的首次操作）
        if (error.code === 'not-found') {
          try {
            await setDoc(userRef, { [dataType]: data });
          } catch (setErr) {
            console.error(`not-found后将${dataType}设置到Firestore时出错:`, setErr);
          }
        } else {
          console.error(`将${dataType}同步到Firestore时出错:`, error);
        }
      }
    }
  }, [user, db]);

  const toggleFavorite = useCallback((gameId) => {
    setFavorites(prev => {
      const updated = { ...prev };
      if (updated[gameId]) {
        delete updated[gameId];
      } else {
        updated[gameId] = true; // 或存储时间戳: new Date().toISOString()
      }
      localStorage.setItem('favorites', JSON.stringify(updated));
      if (user) syncToFirestore('favorites', updated); // 如果用户已登录则同步
      return updated;
    });
  }, [user, syncToFirestore]);

  const addRecentlyPlayed = useCallback((gameId) => {
    setRecentlyPlayed(prev => {
      let updated = [gameId, ...prev.filter(id => id !== gameId)];
      if (updated.length > MAX_RECENTLY_PLAYED) {
        updated = updated.slice(0, MAX_RECENTLY_PLAYED);
      }
      localStorage.setItem('recentlyPlayed', JSON.stringify(updated));
      if (user) syncToFirestore('recentlyPlayed', updated); // 如果用户已登录则同步
      return updated;
    });
  }, [user, syncToFirestore]);

  return { favorites, recentlyPlayed, toggleFavorite, addRecentlyPlayed, isSyncedWithFirestore: isSynced };
} 