<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-logo" @click="goHome">Birwaz</div>
      <div class="navbar-toggle" @click="toggleMenu">
        <span :class="{ 'open': isMenuOpen }"></span>
        <span :class="{ 'open': isMenuOpen }"></span>
        <span :class="{ 'open': isMenuOpen }"></span>
      </div>
      <ul :class="{ 'nav-links': true, 'active': isMenuOpen }">
        <li>
          <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
        </li>
        <li v-if="userId">
          <router-link to="/boards" class="nav-link" @click="closeMenu">Boards</router-link>
        </li>
        <li v-if="userId">
          <router-link to="/profile" class="nav-link" @click="closeMenu">Profile</router-link>
        </li>
        <li>
          <router-link to="/about" class="nav-link" @click="closeMenu">About</router-link>
        </li>
        <li>
          <router-link to="/contact" class="nav-link" @click="closeMenu">Contact Us</router-link>
        </li>
        <li v-if="!userId">
          <router-link to="/login" class="nav-link login" @click="closeMenu">Login</router-link>
        </li>
        <li v-if="userId">
          <button class="nav-link logout" @click="logout">Logout</button>
        </li>
      </ul>
    </nav>

    <!-- Router view to capture emitted login events -->
    <router-view @user-logged-in="updateUserId" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      userId: localStorage.getItem('userId'), // Initialize userId from localStorage
    };
  },
  created() {
    window.addEventListener("storage", this.syncUserId);
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.syncUserId);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    goHome() {
      this.$router.push('/');
    },
    async logout() {
      const confirmed = confirm("Are you sure you want to log out?");
      if (confirmed) {
        localStorage.removeItem('userId');
        this.userId = null;
        this.$router.push('/');
      }
    },
    updateUserId(userId) {
      this.userId = userId;
      localStorage.setItem('userId', userId);
    },
    syncUserId(event) {
      if (event.key === 'userId') {
        this.userId = event.newValue;
      }
    },
  },
};
</script>







<style scoped>
/* Basic Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Navbar styling */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6a89cc, #b8e994);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.navbar-toggle span {
  width: 25px;
  height: 3px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.navbar-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.navbar-toggle span.open:nth-child(2) {
  opacity: 0;
}

.navbar-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Navbar Links */
.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #333;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background: #333;
  bottom: -4px;
  left: 0;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

/* Login and Logout button style */
.login {
  color: #ff6b6b;
}

.login:hover {
  color: #fff;
  background-color: #ff6b6b;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.logout {
  color: #ff6b6b;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: 0.4s;
}
.logout:hover {
  color: #fff;
  background-color: #ff6b6b;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    right: 0;
    flex-direction: column;
    background: #6a89cc;
    width: 100%;
    max-width: 250px;
    padding: 1rem 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .nav-links.active {
    transform: translateX(0);
  }

  .nav-link {
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }
}

/* Add padding to content to avoid being hidden under fixed navbar */
#app {
  padding-top: 80px;
}
</style>
