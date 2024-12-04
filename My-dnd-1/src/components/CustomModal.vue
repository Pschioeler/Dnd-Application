<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <h3>{{ title }}</h3>
        <slot></slot>
        <p>{{ message }}</p>
        <div class="modal-actions">
          <button @click="confirmAction" v-if="showConfirm" :disabled="isConfirmDisabled">{{ confirmText }}</button>
          <button @click="cancelAction" v-if="showCancel">{{ cancelText }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      title: String,
      message: String,
      showConfirm: Boolean,
      showCancel: Boolean,
      confirmText: String,
      cancelText: String,
      isConfirmDisabled: Boolean
    },
    emits: ['confirm', 'cancel'],
    methods: {
      confirmAction() {
        this.$emit('confirm');
      },
      cancelAction() {
        this.$emit('cancel');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .modal-actions {
    margin-top: 20px;
  }
  button {
    margin: 0 10px;
  }
  </style>