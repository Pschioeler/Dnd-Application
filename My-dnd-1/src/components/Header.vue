<template>
    <header class="header">
      <div class="header-inner">
        <div class="header-logo">
          <router-link to="/">
            <img src="/path/to/placeholder-logo.png" alt="Logo" />
          </router-link>
        </div>
        <nav class="header-nav">
          <router-link to="/battle-tracker" class="nav-link">Battle Tracker</router-link>
          <router-link to="/party" class="nav-link">Party</router-link>
          <router-link to="/shop" class="nav-link">Shop</router-link>
          <router-link to="/rules" class="nav-link">Rules</router-link>
        </nav>
        <div class="header-profile">
          <router-link v-if="user" to="/profile">
            <img src="/path/to/profile-placeholder.png" alt="Profile" class="profile-icon" />
          </router-link>
          <button v-if="user" @click="logout" class="logout-button">Logout</button>
          <router-link v-if="!user" to="/login" class="login-button">Login</router-link>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  import { computed } from 'vue';
  
  export default {
    name: 'Header',
    setup() {
      const userStore = useUserStore();
      const user = computed(() => userStore.user);
      const logout = () => {
        userStore.logout();
      };
  
      return { user, logout };
    }
  };
  </script>
  
  <style scoped>
  .header {
    background-color: var(--color-background-primary-dark);
    border-bottom: 2px solid var(--color-secondary);
    width: 100%;
  }
  
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1440px;
    margin: 0 auto;
    padding: 15px;
  }
  
  .header-logo img {
    height: 50px;
  }
  
  .header-nav {
    display: flex;
    gap: 20px;
  }
  
  .nav-link {
    color: var(--color-text-light);
    text-decoration: none;
    font-weight: bold;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  
  .header-profile {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header-profile .profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .logout-button, .login-button {
    background: none;
    border: none;
    color: var(--color-text-light);
    font-weight: bold;
    cursor: pointer;
  }
  
  .logout-button:hover, .login-button:hover {
    text-decoration: underline;
  }
  </style>
  