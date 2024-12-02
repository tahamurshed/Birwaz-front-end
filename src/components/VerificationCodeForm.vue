
<template>
  <form @submit.prevent="handleVerifyCode" class="verification-form">
    <h2 class="verification-title">Enter Verification Code</h2>
    <p class="verification-description">We've sent a code to your email. Please enter it below to continue.</p>
    <input
      type="text"
      v-model="verificationCode"
      placeholder="Verification Code"
      required
      maxlength="6"
      class="input-field verification-input"
      @input="clearError"
      aria-label="Verification Code"
    />
    <button type="submit" class="verify-button">Verify</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
</template>

<script>
export default {
  name: "VerificationCodeForm",
  props: {
    errorMessage: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      verificationCode: ""
    };
  },
  methods: {
    handleVerifyCode() {
      // Emit the verification code for parent to handle
      this.$emit("verifyCode", this.verificationCode);
    },
    clearError() {
      // Emit event to clear the error message in parent
      this.$emit("clearError");
    }
  }
};
</script>

<style scoped>
.verification-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  animation: fadeIn 0.6s ease;
}

.verification-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a69bd;
  margin-bottom: 0.5rem;
  text-align: center;
}

.verification-description {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.input-field {
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
}

.input-field:focus {
  border-color: #4a69bd;
  outline: none;
}

.verify-button {
  padding: 0.75rem;
  width: 100%;
  background-color: #4a69bd;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.verify-button:hover {
  background-color: #3b5998;
  transform: scale(1.03);
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

