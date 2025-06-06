import { useState, useEffect, useCallback, useRef } from 'react';

export function useGameData() {
  // 存储所有游戏数据（用于搜索和筛选）
  const [allGames, setAllGames] = useState([]);
  // 当前显示的游戏数据
  const [displayedGames, setDisplayedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const gamesPerPage = 20; // 每页显示的游戏数量
  
  // 使用localStorage缓存
  const cacheKey = 'cozygame_data_cache';
  const cacheTimeKey = 'cozygame_data_cache_time';
  const cacheDuration = 3600000; // 缓存时间1小时（毫秒）

  // 检查缓存是否有效
  const isCacheValid = () => {
    const cacheTime = localStorage.getItem(cacheTimeKey);
    if (!cacheTime) return false;
    
    const now = Date.now();
    return (now - parseInt(cacheTime)) < cacheDuration;
  };

  // 初始加载数据
  useEffect(() => {
    const fetchGames = async () => {
      setInitialLoading(true);
      
      // 尝试从缓存加载
      if (isCacheValid()) {
        try {
          const cachedData = JSON.parse(localStorage.getItem(cacheKey));
          if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
            setAllGames(cachedData);
            setDisplayedGames(cachedData.slice(0, gamesPerPage));
            setHasMore(cachedData.length > gamesPerPage);
            setInitialLoading(false);
            setLoading(false);
            console.log('Games loaded from cache:', cachedData.length);
            return;
          }
        } catch (e) {
          console.error("Error reading from cache:", e);
          // 缓存读取失败，继续从网络加载
        }
      }
      
      // 从网络加载
      try {
        setError(null);
        const response = await fetch('/games.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && Array.isArray(data.games)) {
          // 保存到state
          setAllGames(data.games);
          setDisplayedGames(data.games.slice(0, gamesPerPage));
          setHasMore(data.games.length > gamesPerPage);
          
          // 保存到缓存
          try {
            localStorage.setItem(cacheKey, JSON.stringify(data.games));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
          } catch (e) {
            console.error("Error writing to cache:", e);
            // 缓存写入失败不影响主功能
          }
        } else {
          throw new Error("Invalid games data format");
        }
      } catch (e) {
        console.error("Failed to fetch games:", e);
        setError(e.message);
        setAllGames([]);
        setDisplayedGames([]);
        setHasMore(false);
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    };
    
    fetchGames();
  }, []);

  // 加载更多游戏（分页）
  const loadMoreGames = useCallback(() => {
    if (!hasMore || loading) {
      return;
    }
    
    setLoading(true);
    
    // 计算下一页的起止索引
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    
    // 使用setTimeout模拟网络延迟，实际项目中可以移除
    setTimeout(() => {
      try {
        if (startIndex < allGames.length) {
          // 获取下一页的游戏数据
          const nextGames = allGames.slice(startIndex, endIndex);
          
          // 更新显示的游戏列表
          setDisplayedGames(prev => [...prev, ...nextGames]);
          setPage(nextPage);
          setHasMore(endIndex < allGames.length);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('加载更多游戏时发生错误:', error);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [allGames, page, gamesPerPage, hasMore, loading]);

  // 根据ID获取游戏
  const getGameById = useCallback((id) => {
    return allGames.find(game => game.id === id);
  }, [allGames]);

  // 搜索和筛选游戏的Web Worker
  const workerRef = useRef(null);
  
  // 初始化Web Worker
  useEffect(() => {
    // 创建内联Worker而不是单独文件，以简化部署
    const workerCode = `
      self.onmessage = function(e) {
        const { games, action, params } = e.data;
        
        let result;
        switch (action) {
          case 'filter':
            result = games.filter(game => {
              // 根据标签筛选
              if (params.tags && params.tags.length > 0) {
                const gameTags = game.tags?.[params.lang] || game.tags?.en || [];
                
                if (params.filterLogic === 'AND') {
                  // 需要包含所有标签
                  return params.tags.every(tag => gameTags.includes(tag));
                } else {
                  // 需要包含任一标签
                  return params.tags.some(tag => gameTags.includes(tag));
                }
              }
              return true;
            });
            break;
            
          case 'search':
            result = games.filter(game => {
              const searchTerm = params.searchTerm.toLowerCase();
              const title = game.title[params.lang] || game.title.en || '';
              const description = game.description[params.lang] || game.description.en || '';
              
              return title.toLowerCase().includes(searchTerm) || 
                     description.toLowerCase().includes(searchTerm);
            });
            break;
            
          default:
            result = games;
        }
        
        self.postMessage(result);
      };
    `;
    
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    workerRef.current = new Worker(URL.createObjectURL(blob));
    
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // 搜索游戏
  const searchGames = useCallback((searchTerm, lang) => {
    return new Promise((resolve) => {
      if (!searchTerm.trim()) {
        resolve(allGames);
        return;
      }
      
      if (workerRef.current) {
        const handleMessage = (e) => {
          resolve(e.data);
          workerRef.current.removeEventListener('message', handleMessage);
        };
        
        workerRef.current.addEventListener('message', handleMessage);
        
        workerRef.current.postMessage({
          games: allGames,
          action: 'search',
          params: { searchTerm, lang }
        });
      } else {
        // 回退方案：直接在主线程搜索
        const results = allGames.filter(game => {
          const title = game.title[lang] || game.title.en || '';
          const description = game.description[lang] || game.description.en || '';
          
          return title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 description.toLowerCase().includes(searchTerm.toLowerCase());
        });
        resolve(results);
      }
    });
  }, [allGames]);

  // 过滤游戏
  const filterGames = useCallback((tags, filterLogic, lang) => {
    return new Promise((resolve) => {
      if (!tags || tags.length === 0) {
        resolve(allGames);
        return;
      }
      
      if (workerRef.current) {
        const handleMessage = (e) => {
          resolve(e.data);
          workerRef.current.removeEventListener('message', handleMessage);
        };
        
        workerRef.current.addEventListener('message', handleMessage);
        
        workerRef.current.postMessage({
          games: allGames,
          action: 'filter',
          params: { tags, filterLogic, lang }
        });
      } else {
        // 回退方案：直接在主线程过滤
        const results = allGames.filter(game => {
          const gameTags = game.tags?.[lang] || game.tags?.en || [];
          
          if (filterLogic === 'AND') {
            // 需要包含所有标签
            return tags.every(tag => gameTags.includes(tag));
          } else {
            // 需要包含任一标签
            return tags.some(tag => gameTags.includes(tag));
          }
        });
        resolve(results);
      }
    });
  }, [allGames]);

  return { 
    games: displayedGames, 
    allGames,
    loading,
    initialLoading, 
    error, 
    loadMoreGames, 
    hasMore,
    getGameById,
    searchGames,
    filterGames
  };
} 