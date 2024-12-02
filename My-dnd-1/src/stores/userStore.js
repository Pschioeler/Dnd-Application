// src/stores/userStore.js
import { defineStore } from 'pinia';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,  // Current user
    error: null, // Error messages
    loading: false, // Loading state
  }),
  actions: {
    // Login User
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    // Register User
    async register(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    // Logout User
    async logout() {
      this.loading = true;
      this.error = null;
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    // Monitor User State
    monitorAuthState() {
      onAuthStateChanged(auth, (user) => {
        this.user = user || null;
      });
    },
  },
});