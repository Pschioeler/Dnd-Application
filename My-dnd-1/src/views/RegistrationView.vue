<template>
  <main class="register-view">
    <form @submit.prevent="handleRegister">
      <h2>Create an Account</h2>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit" :disabled="loading">Register</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

export default {
  setup() {
    const store = useUserStore();
    const email = ref('');
    const password = ref('');

    const handleRegister = async () => {
      await store.register(email.value, password.value);
    };

    return {
      email,
      password,
      handleRegister,
      loading: store.loading,
      error: store.error,
    };
  },
};
</script>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1rem;
}

button {
  cursor: pointer;
}

.error {
  color: red;
}
</style>
