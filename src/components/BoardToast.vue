<template>
  <div v-if="visible" class="toast" :class="toastType">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      visible: false,
      toastType: '',
    };
  },
  methods: {
    show(message, type = 'success', duration = 3000) {
      this.message = message;
      this.toastType = type;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  animation: fade-in 0.3s ease-out;
}

.toast.success {
  background-color: #28a745;
}

.toast.error {
  background-color: #dc3545;
}

.toast.info {
  background-color: #17a2b8;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
