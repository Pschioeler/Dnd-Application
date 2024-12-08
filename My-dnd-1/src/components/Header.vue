<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-logo">
        <router-link to="/">
          <h2>My D&D</h2>
        </router-link>
      </div>
      <nav class="header-menu">
        <router-link to="/battle-tracker" active-class="active">Battle Tracker</router-link>
        <router-link to="/party" active-class="active">Party</router-link>
        <router-link to="/shop" active-class="active">Shop</router-link>
        <router-link to="/rules" active-class="active">Rules</router-link>
      </nav>
      <div class="header-user">
        <button class="logout-button" v-if="user" @click="logout">Logout</button>
        <router-link to="/profile" class="profile-icon">
          <img src="../assets/svg/Profile-icon.svg" alt="Profile Icon" />
        </router-link>
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
  },
};
</script>

<style scoped>
.header {
  background-color: var(--color-background-primary-dark);
  color: var(--color-text-light);
  border-bottom: 2px solid var(--color-secondary);
  width: 100%;
  padding: 10px 0;
}

.header-inner {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-logo {
  font-size: 1.5rem;
}

.header-logo h2 {
  color: var(--color-secondary);
  margin: 0;
  font-family: 'Cinzel Decorative', serif;
}

.header-logo a {
  text-decoration: none;
}

.header-menu {
  display: flex;
  gap: 20px;
  font-family: 'Cinzel Decorative', serif;
}

.header-menu a {
  color: var(--color-text-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.header-menu a:hover {
  color: var(--color-secondary);
}

.header-menu .active {
  color: var(--color-secondary);
}

.header-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logout-button {
  background: none;
  border: none;
  color: var(--color-text-light);
  font-family: 'Raleway', sans-serif;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-button:hover {
  color: var(--color-secondary);
}

.profile-icon {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-text-light);
  text-decoration: none;
}

.profile-icon:hover {
  color: var(--color-secondary);
}

.profile-icon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
