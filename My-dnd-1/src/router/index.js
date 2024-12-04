import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegistrationView.vue';
import ProfileView from '../views/ProfileView.vue';
import { useUserStore } from '@/stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        userStore.clearError();
        next();
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        userStore.clearError();
        next();
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.user) {
    next('/login');
  } else {
    next();
  }
});

export default router