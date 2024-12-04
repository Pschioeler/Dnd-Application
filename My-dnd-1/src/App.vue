<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link v-if="!user" to="/login">Login</router-link>
        <router-link v-if="!user" to="/register">Register</router-link>
        <router-link v-if="user" to="/profile">Profile</router-link>
        <button v-if="user" @click="logout">Logout</button>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { computed, onMounted } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();

    onMounted(() => {
      userStore.monitorAuthState();
    });

    const user = computed(() => userStore.user);
    const logout = () => {
      userStore.logout();
    };

    return { user, logout };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
