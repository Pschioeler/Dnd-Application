import { defineStore } from 'pinia';
import { auth } from '@/firebase/config';
import router from '@/router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword, deleteUser } from 'firebase/auth';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,  // Current user
    error: null, // Error messages
    loading: false, // Loading state
  }),
  actions: {
    // Clear Error
    clearError() {
      this.error = null;
    },

    // Login User
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        router.push('/');
      } catch (error) {
        this.error = "Invalid email or password.";
      } finally {
        this.loading = false;
      }
    },

    // Register User
    async register(email, password, username, repeatPassword) {
      this.loading = true;
      this.error = null;
      if (password !== repeatPassword) {
        this.error = "Passwords do not match.";
        this.loading = false;
        return;
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}/.test(password)) {
        this.error = "Password must be at least 14 characters and include uppercase, lowercase, a number, and a special character.";
        this.loading = false;
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        router.push('/');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.error = "Email already in use.";
        } else {
          this.error = "Registration failed. Please try again.";
        }
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
        router.push('/login');
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

    // Change Password
    async changePassword(newPassword) {
      if (!this.user) return;
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}/.test(newPassword)) {
        this.error = "Password must be at least 14 characters and include uppercase, lowercase, a number, and a special character.";
        return;
      }
      try {
        await updatePassword(this.user, newPassword);
        this.error = "Password successfully updated.";
      } catch (error) {
        this.error = "Failed to update password.";
      }
    },

    // Delete Account
    async deleteAccount(password) {
      if (!this.user) return;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.user.email, password);
        if (userCredential) {
          await deleteUser(this.user);
          this.user = null;
          router.push('/register');
        } else {
          this.error = "Incorrect password.";
        }
      } catch (error) {
        this.error = "Failed to delete account.";
      }
    }
  },
});