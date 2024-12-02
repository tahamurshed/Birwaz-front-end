<template>
  <div id="app">
    <!-- Sidebar with Profile -->
    <div :class="['sidebar', { 'open': isSidebarOpen }]">
      <div class="profile-info">
        <img :src="profileImage" alt="User Profile" class="profile-image" />
        <div class="profile-details">
          <h1 class="profile-name">{{ profile.name }}</h1>
          <p class="profile-email">{{ profile.email }}</p>
        </div>
      </div>
      <button class="logout-button" @click="logout">Logout</button>
    </div>

    <!-- Button to Toggle Sidebar -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      {{ isSidebarOpen ? 'Hide Profile' : 'Show Profile' }}
    </button>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Your other main content goes here -->
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isSidebarOpen: false, // Sidebar visibility
      profile: {
        name: '',
        email: '',
      },
      profileImage: 'https://via.placeholder.com/150', // Default profile image
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async fetchUserProfile() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/profile/${userId}`);
          this.profile = response.data;
          if (response.data.image) {
            this.profileImage = response.data.image;
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        this.$router.push('/login');
      }
    },
    async logout() {
      const confirmed = confirm("Are you sure you want to log out?");
      if (confirmed) {
        localStorage.removeItem('userId');
        this.profile = { name: '', email: '' };
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
/* Sidebar Styles */
.sidebar {
  position: fixed;
  top: 60px; /* Below the navbar */
  left: -300px; /* Initially hidden */
  width: 300px;
  height: 100%;
  background-color: #4a90e2;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

.sidebar.open {
  left: 0; /* Slide in when open */
}

.profile-info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-name {
  font-size: 1.5em;
  font-weight: bold;
}

.profile-email {
  font-size: 1.1em;
  margin-top: 5px;
}

/* Logout Button */
.logout-button {
  background-color: #ff4d4d;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
}

.logout-button:hover {
  background-color: #ff3333;
}

/* Toggle Button Styles */
.sidebar-toggle {
  position: fixed;
  top: 15px; /* Adjusted to be just under the navbar */
  left: 15px;
  background-color: #4a90e2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1100;
}

.sidebar-toggle:hover {
  background-color: #3578e5;
}

/* Main Content Area */
.main-content {
  padding-left: 20px;
  padding-top: 20px;
  transition: margin-left 0.3s ease-in-out;
}

.sidebar.open + .main-content {
  margin-left: 300px; /* Shift main content when sidebar is open */
}
</style>
