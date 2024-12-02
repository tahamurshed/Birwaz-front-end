<template>
  <div class="home-page">
    <div class="content">
      <h1>Trello brings all your tasks, teammates, and tools together</h1>
      <p>Keep everything in the same place—even if your team isn’t.</p>
      
      <div class="signup-container">
        <input type="email" placeholder="Email" class="email-input" />
        <button class="signup-button">Sign up – it's free!</button>
      </div>
      
      <a href="#" class="watch-video">
        Watch video <span class="play-icon">▶️</span>
      </a>
    </div>

    <div class="images">
      <img src="/public/image.png" alt="Example Image" class="image" />
    </div>

    <!-- SVG Curve -->
    <svg class="curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#6a11cb" fill-opacity="1" d="M0,128L60,138.7C120,149,240,171,360,176C480,181,600,171,720,149.3C840,128,960,96,1080,106.7C1200,117,1320,171,1380,197.3L1440,224V320H0Z"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  background: linear-gradient(to right, #6a11cb, #b92b27);
  color: white;
  padding: 40px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  width: 100vw;
  flex-wrap: wrap; /* Allow content to wrap on smaller screens */
}

.content {
  max-width: 500px;
  margin-right: 20px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

/* Signup form styling */
.signup-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.email-input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%; /* Full width on small screens */
  max-width: 200px; /* Limit max width */
}

.signup-button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background-color: #0056b3;
}

/* Watch video link styling */
.watch-video {
  font-size: 1rem;
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
}

.play-icon {
  font-size: 1.2rem;
}

/* Image positioning */
.images {
  flex-shrink: 0;
}

.image {
  width: 100%; /* Full width on smaller screens */
  max-width: 400px; /* Limit max width */
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s;
}

.image:hover {
  transform: scale(1.05);
}

/* Curve styling */
.curve {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: -1; /* Place it behind other content */
}

/* Responsive styles */
@media (max-width: 768px) {
  .home-page {
    flex-direction: column; /* Stack content on small screens */
    padding: 20px; /* Reduce padding */
    text-align: center; /* Center text */
  }

  .content {
    margin-right: 0; /* Remove margin on small screens */
    margin-bottom: 20px; /* Add margin below content */
  }

  h1 {
    font-size: 2rem; /* Smaller font size for headings */
  }

  p {
    font-size: 1rem; /* Smaller font size for paragraphs */
  }

  .signup-container {
    flex-direction: column; /* Stack input and button */
    align-items: center; /* Center items */
  }

  .email-input {
    width: 100%; /* Full width on small screens */
    max-width: none; /* Remove max width */
    margin-bottom: 10px; /* Add margin below input */
  }

  .signup-button {
    width: 100%; /* Full width on small screens */
  }
}
</style>
