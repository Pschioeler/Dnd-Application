<template>
  <div class="auth-container">
    <div class="auth-content">
      <div class="auth-image">
        <img src="../assets/images/dragontest.jpg" alt="Dragon Image" />
      </div>
      <div class="auth-box">
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
          <div class="input-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" required />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" required />
          </div>
          <button type="submit" class="auth-button">Login</button>
          <p class="error-message" v-if="error">{{ error }}</p>
          <p class="error-placeholder" v-else></p>
        </form>
        <p class="switch-auth">Don't have an account? <router-link to="/register">Sign up here</router-link></p>
        <div class="divider">
          <hr />
          <span>Or sign in with</span>
          <hr />
        </div>
        <button @click="googleSignIn" class="google-signin-button">
          <img src="/path/to/google-logo.png" alt="Google logo" /> Sign in with Google
        </button>
      </div>
    </div>
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
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  background-color: var(--color-background-primary-light);
}

.auth-content {
  display: flex;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.auth-image {
  display: none;
}

@media (min-width: 768px) {
  .auth-image {
    display: block;
    width: 50%;
    
  }

  .auth-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .auth-box {
    width: 50%;
    padding: 40px;
  }
}

.auth-box {
  background-color: var(--white-pure);
  padding: 40px;
  border-radius: 8px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--grey-medium);
  border-radius: 4px;
}

.auth-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: var(--color-primary);
  color: var(--color-text-light);
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
}

.error-message {
  color: var(--red-danger);
  margin-top: 10px;
  min-height: 20px;
}

.error-placeholder {
  min-height: 20px;
}

.switch-auth {
  margin-top: 20px;
  font-size: 0.9rem;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: var(--grey-dark);
  font-size: 0.9rem;
}

.divider hr {
  flex: 1;
  border: none;
  border-top: 1px solid var(--grey-medium);
}

.divider span {
  margin: 0 10px;
}

.google-signin-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: var(--white-pure);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-weight: bold;
  color: black;
  margin: 0 auto;
}

.google-signin-button img {
  height: 20px;
  margin-right: 10px;
}
</style>