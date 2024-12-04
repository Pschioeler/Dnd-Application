<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="Email" required @blur="clearError">
      <input v-model="password" type="password" placeholder="Password" required @blur="clearError">
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <router-link to="/register">Don't have an account? Sign up here.</router-link>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { ref, computed } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();
    const email = ref("");
    const password = ref("");
    const error = computed(() => userStore.error);

    const loginUser = () => {
      userStore.login(email.value, password.value);
    };

    const clearError = () => {
      userStore.clearError();
    };

    return { email, password, loginUser, error, clearError };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>