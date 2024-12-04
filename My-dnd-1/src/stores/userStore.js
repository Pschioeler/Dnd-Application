import { defineStore } from 'pinia';
import { auth } from '@/firebase/config';
import router from '@/router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword, deleteUser, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
        if (!userCredential.user.emailVerified) {
          this.error = "Please verify your email before logging in.";
          this.loading = false;
          return;
        }
        this.user = userCredential.user;
        router.push('/');
      } catch (error) {
        this.error = "Invalid email or password.";
      } finally {
        this.loading = false;
      }
    },

    // Register User with Email Verification
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
        await sendEmailVerification(userCredential.user);
        this.error = "Verification email sent. Please check your inbox.";
        this.user = null;
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

    // Google Sign-In
    async googleSignIn() {
      this.loading = true;
      this.error = null;
      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        this.user = userCredential.user;
        router.push('/');
      } catch (error) {
        this.error = "Google sign-in failed. Please try again.";
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
    async changePassword(oldPassword, newPassword) {
      if (!this.user) return;
      if (oldPassword === newPassword) {
        this.error = "New password can't be the same as older passwords.";
        return;
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}/.test(newPassword)) {
        this.error = "Password must be at least 14 characters and include uppercase, lowercase, a number, and a special character.";
        return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.user.email, oldPassword);
        if (userCredential) {
          await updatePassword(this.user, newPassword);
          this.error = "Password successfully updated.";
        } else {
          this.error = "Incorrect old password.";
        }
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