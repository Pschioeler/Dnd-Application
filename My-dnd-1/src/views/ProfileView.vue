<template>
    <div>
      <h1>Profile Page</h1>
      <button @click="showLogoutModal = true">Log Out</button>
      <custom-modal
        v-if="showLogoutModal"
        :show="showLogoutModal"
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        showConfirm="true"
        showCancel="true"
        confirmText="Yes"
        cancelText="No"
        @confirm="logout"
        @cancel="closeLogoutModal"
      />
      
      <div>
        <button @click="showChangePasswordModal = true">Change Password</button>
        <custom-modal
          v-if="showChangePasswordModal"
          :show="showChangePasswordModal"
          title="Change Password"
          showConfirm="true"
          showCancel="true"
          confirmText="Change"
          cancelText="Cancel"
          :isConfirmDisabled="!oldPassword || !newPassword || passwordError"
          @confirm="changePasswordWithValidation"
          @cancel="closeChangePasswordModal"
        >
          <input v-model="oldPassword" type="password" placeholder="Old Password" />
          <input v-model="newPassword" type="password" placeholder="New Password" @input="validateChangePassword" />
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </custom-modal>
      </div>
      
      <button @click="showDeleteAccountModal = true">Delete Account</button>
      <custom-modal
        v-if="showDeleteAccountModal"
        :show="showDeleteAccountModal"
        title="Delete Account"
        message="Please confirm your password to delete your account."
        showConfirm="true"
        showCancel="true"
        confirmText="Delete"
        cancelText="Cancel"
        :isConfirmDisabled="!confirmPassword"
        @confirm="deleteAccountWithPassword"
        @cancel="closeDeleteAccountModal"
      >
        <input v-model="confirmPassword" type="password" placeholder="Password" />
      </custom-modal>
      
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  import { ref, computed } from 'vue';
  import CustomModal from '@/components/CustomModal.vue';
  
  export default {
    components: { CustomModal },
    setup() {
      const userStore = useUserStore();
      const newPassword = ref("");
      const oldPassword = ref("");
      const confirmPassword = ref("");
      const showLogoutModal = ref(false);
      const showDeleteAccountModal = ref(false);
      const showChangePasswordModal = ref(false);
      const passwordError = ref(null);
      const error = computed(() => userStore.error);
      
      const changePasswordWithValidation = () => {
        if (!passwordError.value) {
          userStore.changePassword(oldPassword.value, newPassword.value);
          closeChangePasswordModal();
        }
      };
  
      const validateChangePassword = () => {
        if (oldPassword.value === newPassword.value) {
          passwordError.value = "New password can't be the same as old password.";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}/.test(newPassword.value)) {
          passwordError.value = "Password must be at least 14 characters and include uppercase, lowercase, a number, and a special character.";
        } else {
          passwordError.value = null;
        }
      };
  
      const deleteAccountWithPassword = () => {
        userStore.deleteAccount(confirmPassword.value);
        closeDeleteAccountModal();
      };
  
      const logout = () => {
        userStore.logout();
        closeLogoutModal();
      };
  
      const closeChangePasswordModal = () => {
        showChangePasswordModal.value = false;
        oldPassword.value = "";
        newPassword.value = "";
        passwordError.value = null;
      };
  
      const closeDeleteAccountModal = () => {
        showDeleteAccountModal.value = false;
        confirmPassword.value = "";
      };
  
      const closeLogoutModal = () => {
        showLogoutModal.value = false;
      };
  
      return {
        newPassword,
        oldPassword,
        confirmPassword,
        changePasswordWithValidation,
        deleteAccountWithPassword,
        logout,
        showLogoutModal,
        showDeleteAccountModal,
        showChangePasswordModal,
        passwordError,
        error,
        validateChangePassword,
        closeChangePasswordModal,
        closeDeleteAccountModal,
        closeLogoutModal
      };
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
  }
  </style>
  