<template>
  <div class="signup-page">
    <div class="signup-box">
      <h1 class="logo">Birwaz</h1>
      <p class="subtitle">Create your account and start managing your team!</p>

      <form @submit.prevent="handleSignUp" class="signup-form">
        <!-- Name Field -->
        <input
          type="text"
          v-model="name"
          @input="validateName"
          placeholder="Name"
          required
          class="input-field"
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <!-- Email Field -->
        <input
          type="email"
          v-model="email"
          @input="validateEmail"
          placeholder="Email"
          required
          class="input-field"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>

        <!-- Password Field -->
        <input
          type="password"
          v-model="password"
          @input="validatePassword"
          placeholder="Password"
          required
          class="input-field"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>

        <!-- Confirm Password Field -->
        <input
          type="password"
          v-model="passwordConfirmation"
          placeholder="Confirm Password"
          required
          class="input-field"
        />
        <span v-if="errors.passwordConfirmation" class="error">{{ errors.passwordConfirmation }}</span>

        <!-- Submit Button -->
        <button type="submit" :disabled="!isFormValid" class="signup-button">Sign Up</button>
      </form>

      <p class="login-option">
        Already have an account?
        <router-link to="/login" class="login-link">Log in here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "SignUpPage",
    data() {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
        };
    },
    computed: {
        isFormValid() {
            // Check if all fields are valid and passwords match
            return (
                !this.errors.name &&
                !this.errors.email &&
                !this.errors.password &&
                this.password === this.passwordConfirmation &&
                this.name !== '' &&
                this.email !== '' &&
                this.password !== '' &&
                this.passwordConfirmation !== ''
            );
        },
    },
    methods: {
        validateName() {
            const nameRegex = /^[a-zA-Z\s]{3,50}$/;
            this.errors.name = nameRegex.test(this.name)
                ? ""
                : "Name should be 3-50 letters.";
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.errors.email = emailRegex.test(this.email)
                ? ""
                : "Enter a valid email address.";
        },
        validatePassword() {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            this.errors.password = passwordRegex.test(this.password)
                ? ""
                : "Password must be 8 characters long with uppercase, lowercase, number, and special character.";
        },
        async handleSignUp() {
            this.errors = {}; // Reset errors
            if (this.password !== this.passwordConfirmation) {
                this.errors.passwordConfirmation = "Passwords do not match.";
                return;
            }

            if (this.isFormValid) {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.passwordConfirmation,
                    });
                    console.log('Sign-up successful:', response.data);

                    // Redirect to login page after successful signup
                    this.$router.push('/login');
                } catch (error) {
                    // Display backend validation errors
                    if (error.response && error.response.data.errors) {
                        this.errors = error.response.data.errors;
                    }
                }
            }
        }

    }
};

</script>

<style scoped>
/* Container and Background */
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #6a89cc, #b8e994);
  font-family: Arial, sans-serif;
  animation: fadeInBackground 1s ease;
}

.signup-box {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeInBackground {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

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

.signup-form {
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

.signup-button {
  padding: 0.75rem;
  background-color: #4a69bd;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup-button:hover {
  background-color: #3b5998;
}

.login-option {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.login-link {
  color: #4a69bd;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #3b5998;
}

.error {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: -0.5rem;
}
</style>
