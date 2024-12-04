<template>
    <div>
      <h1>Profile Page</h1>
      <button @click="logout">Log Out</button>
      <div>
        <input v-model="newPassword" type="password" placeholder="New Password">
        <button @click="changePassword">Change Password</button>
        <p v-if="error">{{ error }}</p>
      </div>
      <button @click="deleteAccount">Delete Account</button>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  import { ref, computed } from 'vue';
  
  export default {
    setup() {
      const userStore = useUserStore();
      const newPassword = ref("");
      const error = computed(() => userStore.error);
      
      const changePassword = () => {
        userStore.changePassword(newPassword.value);
      };
  
      const deleteAccount = () => {
        userStore.deleteAccount();
      };
  
      const logout = () => {
        userStore.logout();
      };
  
      return { newPassword, changePassword, deleteAccount, logout, error };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>