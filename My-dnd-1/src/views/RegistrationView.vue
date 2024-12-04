// RegistrationView.vue
<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <input v-model="repeatPassword" type="password" placeholder="Repeat Password" required>
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

    return { email, username, password, repeatPassword, registerUser, error };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
