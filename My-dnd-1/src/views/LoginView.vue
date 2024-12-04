<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <button @click="googleSignIn">Sign in with Google</button>
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

    const googleSignIn = () => {
      userStore.googleSignIn();
    };

    return { email, password, loginUser, googleSignIn, error };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
