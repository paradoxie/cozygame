import { useState, useEffect, useCallback } from 'react';
import { 
  auth, 
  onAuthStateChanged as firebaseOnAuthStateChanged, 
  signInWithPopup as firebaseSignInWithPopup, 
  signOut as firebaseSignOut, 
  googleProvider 
} from '../services/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseOnAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setError(null); // Clear previous errors on auth state change
    }, (authError) => {
      console.error("Auth state change error:", authError);
      setError(authError);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await firebaseSignInWithPopup(auth, googleProvider);
      setUser(result.user);
      // Login successful, user state will be updated by onAuthStateChanged
    } catch (e) {
      console.error("Google login error:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignOut(auth);
      // setUser(null); // User state will be updated by onAuthStateChanged
    } catch (e) {
      console.error("Sign out error:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, loginWithGoogle, logout };
} 