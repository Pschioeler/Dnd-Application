<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useUserStore } from '@/stores/userStore';
import { computed, onMounted } from 'vue';

export default {
  components: {
    Header,
    Footer
  },
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
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  flex: 1;
}
</style>
