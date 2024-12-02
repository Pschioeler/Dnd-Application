// src/stores/userStore.js
import { defineStore } from 'pinia';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const userStore = defineStore('userStore', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    // Log in user
    async login(email, password) {
      const auth = getAuth();
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
      } catch (err) {
        this.error = err.message;
        console.error('Login error:', err);
      } finally {
        this.loading = false;
      }
    },

    // Register a new user
    async register(email, password) {
      const auth = getAuth();
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
      } catch (err) {
        this.error = err.message;
        console.error('Register error:', err);
      } finally {
        this.loading = false;
      }
    },

    // Log out user
    async logout() {
      const auth = getAuth();
      this.loading = true;
      this.error = null;
      try {
        await signOut(auth);
        this.user = null;
      } catch (err) {
        this.error = err.message;
        console.error('Logout error:', err);
      } finally {
        this.loading = false;
      }
    },

    // Automatically set user on app load if logged in
    async fetchUser() {
      const auth = getAuth();
      this.loading = true;
      this.error = null;
      try {
        const currentUser = auth.currentUser;
        this.user = currentUser || null;
      } catch (err) {
        this.error = err.message;
        console.error('Fetch user error:', err);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {

  },
});
