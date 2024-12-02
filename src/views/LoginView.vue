<template>
  <div class="login-page">
    <div class="login-box">
      <h1 class="logo">Birwaz</h1>
      <p class="subtitle">Welcome back! Manage your team and tasks with ease.</p>

      <!-- Login Form -->
      <form v-if="!showVerificationPage" @submit.prevent="handleLogin" class="login-form">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
          class="input-field"
          @input="errorMessage = ''"
          aria-label="Email"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="input-field"
          @input="errorMessage = ''"
          aria-label="Password"
        />
        <button type="submit" class="login-button">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>

      <!-- Verification Form Component -->
      <VerificationCodeForm
        v-if="showVerificationPage"
        :errorMessage="errorMessage"
        @verifyCode="handleVerifyCode"
        @clearError="clearErrorMessage"
      />

      <!-- Sign Up Option -->
      <p v-if="!showVerificationPage" class="signup-option">
        New to Birwaz?
        <router-link to="/signup" class="create-account-link">Create an account</router-link>
      </p>

      <!-- Divider and Social Login -->
      <div v-if="!showVerificationPage" class="divider">
        <span>OR</span>
      </div>
      <div v-if="!showVerificationPage" class="social-login">
        <button @click="signInWithGoogle" class="social-button google-button">
          <img src="/src/assets/google-logo-search-new-svgrepo-com.svg" alt="Google Icon" />
          Sign in with Google
        </button>
        <button @click="signInWithFacebook" class="social-button facebook-button">
          <img src="/src/assets/facebook-svgrepo-com.svg" alt="Facebook Icon" />
          Sign in with Facebook
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import VerificationCodeForm from '../components/VerificationCodeForm.vue';

export default {
  name: "LoginPage",
  components: {
    VerificationCodeForm
  },
  data() {
    return {
      email: '',
      password: '',
      showVerificationPage: false,
      errorMessage: '',
      isLoading: false // Added loading state
    };
  },
  methods: {
  async handleLogin() {
    try {
      this.errorMessage = ''; // Clear previous error messages
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: this.email,
        password: this.password
      });

      console.log('Login successful:', response.data);
      const { is_verified, verification_code, userId, access_token } = response.data;
       this.$emit("user-logged-in", userId);

      if (is_verified) {
        // User is verified; proceed to the main app
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('userId', userId);
        this.$router.push({ name: 'boards' });
        this.$emit("user-logged-in", userId);
      } else if (verification_code) {
        // User needs verification; show verification page
        this.showVerificationPage = true;
        localStorage.setItem('userId', userId);
        
      }
    } catch (error) {
      console.error('Login failed:', error);
      this.errorMessage = error.response && error.response.status === 401
        ? 'Invalid credentials. Please try again.'
        : 'Login failed. Please try again later.';
    }
  },
  async handleVerifyCode(verificationCode) {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://127.0.0.1:8000/api/verify-code', {
        userId: userId,
        verification_code: verificationCode,
        email: this.email,
      });

      if (response.status == 200) {
        // Store user details and proceed to main app
        localStorage.setItem('accessToken', response.data.access_token);
        this.$router.push({ name: 'boards' });
        this.showVerificationPage = false; // Hide verification page after successful verification
        this.$emit("user-logged-in", userId);
      } else {
        this.errorMessage = 'Invalid verification code. Please try again.';
      }
    } catch (error) {
      console.error('Verification failed:', error);
      this.errorMessage = 'Verification failed. Please try again later.';
    }
  },
  clearErrorMessage() {
    this.errorMessage = '';
  }
}

};
</script>








<style scoped>
/* Add your styles here */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Prevent horizontal scroll */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

/* Full-Page Background */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw; /* Full viewport width */
  background: linear-gradient(135deg, #6a89cc, #b8e994);
  font-family: Arial, sans-serif;
}

/* Login Box */
.login-box {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.8s ease-out;
}

/* Logo and Title */
.logo {
  font-size: 2rem;
  color: #4a69bd;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-field {
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #4a69bd;
  outline: none;
}

.login-button {
  padding: 0.75rem;
  background-color: #4a69bd;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #3b5998;
}

/* Error Message */
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Signup Option */
.signup-option {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.create-account-link {
  color: #4a69bd;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.create-account-link:hover {
  color: #3b5998;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ddd;
}
.divider span {
  padding: 0 0.5rem;
  color: #666;
}

/* Social Buttons */
.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.google-button {
  background-color: #db4437;
  color: #fff;
}

.google-button img,
.facebook-button img {
  width: 20px;
  height: 20px;
}

.facebook-button {
  background-color: #3b5998;
  color: #fff;
}

.social-button:hover {
  transform: scale(1.05);
}

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
