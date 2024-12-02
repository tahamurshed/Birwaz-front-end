<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">&times;</button>
      <h2>{{ modalTitle }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="boardName">Board Name</label>
          <input
            type="text"
            id="boardName"
            :value="boardName"
            @input="$emit('update:boardName', $event.target.value)"
            placeholder="Enter board name"
            required
          />
        </div>
        <div class="form-group">
          <label for="theme">Theme</label>
          <select
            id="theme"
            :value="boardTheme"
            @change="$emit('update:boardTheme', $event.target.value)"
            required
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div class="modal-actions">
          <button type="submit" class="btn primary">
            {{ isEditing ? "Update" : "Create" }}
          </button>
          <button type="button" class="btn secondary" @click="closeModal">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    modalTitle: String,
    isEditing: Boolean,
    boardName: String,
    boardTheme: String,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitForm() {
      this.$emit('submit');
    }
  }
};
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out; /* Modal fade-in animation */
}

/* Modal Content */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.4s ease-in-out; /* Slide-up animation for the modal */
  transform: translateY(10px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(0);
  }
}

/* Modal Header */
.modal-content h2 {
  font-size: 22px;
  color: #333;
  font-weight: 600;
  margin-bottom: 15px;
}

/* Close Button */
.modal-content .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s ease;
}

.modal-content .close-btn:hover {
  color: #f44336; /* Red on hover */
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4CAF50;
  outline: none;
}

/* Buttons */
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-actions button {
  width: 48%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.modal-actions button:hover {
  transform: scale(1.05);
}

/* Primary button style */
.modal-actions .btn.primary {
  background-color: #4CAF50;
  color: white;
}

.modal-actions .btn.primary:hover {
  background-color: #45a049;
}

/* Secondary button style */
.modal-actions .btn.secondary {
  background-color: #f44336;
  color: white;
}

.modal-actions .btn.secondary:hover {
  background-color: #e53935;
}

</style>