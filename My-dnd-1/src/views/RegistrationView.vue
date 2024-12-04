<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <input v-model="email" type="email" placeholder="Email" required @blur="validateEmail">
      <input v-model="username" type="text" placeholder="Username" required @blur="clearError">
      <input v-model="password" type="password" placeholder="Password" required @blur="validatePassword">
      <input v-model="repeatPassword" type="password" placeholder="Repeat Password" required @blur="validateRepeatPassword">
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <router-link to="/login">Already have an account? Login here.</router-link>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { ref, computed } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const repeatPassword = ref("");
    const error = computed(() => userStore.error);

    const registerUser = () => {
      userStore.register(email.value, password.value, username.value, repeatPassword.value);
    };

    const clearError = () => {
      userStore.clearError();
    };

    const validateEmail = () => {
      if (!/.+@.+\..+/.test(email.value)) {
        userStore.error = "Invalid email format.";
      } else {
        clearError();
      }
    };

    const validatePassword = () => {
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}/.test(password.value)) {
        userStore.error = "Password must be at least 14 characters and include uppercase, lowercase, a number, and a special character.";
      } else {
        clearError();
      }
    };

    const validateRepeatPassword = () => {
      if (password.value !== repeatPassword.value) {
        userStore.error = "Passwords do not match.";
      } else {
        clearError();
      }
    };

    return { email, username, password, repeatPassword, registerUser, error, clearError, validateEmail, validatePassword, validateRepeatPassword };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>