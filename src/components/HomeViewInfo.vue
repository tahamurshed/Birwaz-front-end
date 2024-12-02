<template>
  <div class="board-info">
    <div class="text-section">
      <h2 class="title">A Productivity Powerhouse</h2>
      <p class="description">
        Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.
      </p>
      <a href="#" class="guide-link">Guide for Getting Started</a>

      <div class="options">
        <transition-group name="fade" mode="out-in">
          <div
            v-for="option in options"
            :key="option.name"
            class="option"
            :class="{ active: activeOption === option.name }"
            @click="changeImage(option)"
          >
            <h3>{{ option.name }}</h3>
            <p>{{ option.description }}</p>
          </div>
        </transition-group>
      </div>
    </div>

    <div class="image-section">
      <transition name="fade">
        <img :src="activeImage" :alt="activeOption" class="main-image" />
      </transition>
      <div class="dots">
        <span
          v-for="(option, index) in options"
          :key="option.name"
          class="dot"
          :class="{ active: index === currentIndex }"
          @click="goToImage(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeViewInfo",
  data() {
    return {
      options: [
        {
          name: "Boards",
          description: "Trello boards keep tasks organized and work moving forward.",
          image: "/public/image1.png",
        },
        {
          name: "Lists",
          description: "The different stages of a task. Start as simple as To Do, Doing, or Done.",
          image: "/public/image2.png",
        },
        {
          name: "Cards",
          description: "Cards represent tasks and ideas and hold all the information to get the job done.",
          image: "/public/image3.png",
        },
      ],
      activeOption: "Boards",
      activeImage: "/public/image1.png",
      currentIndex: 0,
    };
  },
  methods: {
    changeImage(option) {
      this.activeOption = option.name;
      this.activeImage = option.image;
      this.currentIndex = this.options.findIndex(opt => opt.name === option.name);
    },
    autoSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.options.length;
      this.updateActiveImage();
    },
    goToImage(index) {
      this.currentIndex = index;
      this.updateActiveImage();
    },
    updateActiveImage() {
      this.activeOption = this.options[this.currentIndex].name;
      this.activeImage = this.options[this.currentIndex].image;
    },
  },
  mounted() {
    this.interval = setInterval(this.autoSlide, 5000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.board-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px 30px;
  background: #f5faff;
  border-radius: 10px;
  color: #222;
  width: 100vw;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  gap: 20px;
}

.text-section {
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #0079bf;
}

.description {
  font-size: 1rem;
  margin-bottom: 15px;
}

.guide-link {
  color: #0079bf;
  text-decoration: none;
  margin-bottom: 20px;
  display: inline-block;
  transition: color 0.3s;
}

.guide-link:hover {
  color: #005f8a;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.option {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  width: 100%;
  max-width: 300px;
  text-align: center;
}

.option:hover {
  background-color: #ebf1f8;
  transform: scale(1.02);
}

.option.active {
  background-color: #d4e9ff;
}

.option h3 {
  font-size: 1.1rem;
  margin: 0;
}

.option p {
  font-size: 0.875rem;
  margin: 5px 0 0;
}

.image-section {
  max-width: 400px;
  position: relative;
}

.main-image {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.main-image:hover {
  transform: scale(1.05);
}

.dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.dot {
  height: 12px;
  width: 12px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: #bbb;
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active {
  background-color: #0079bf;
}

/* Responsive styles */
@media (max-width: 768px) {
  .board-info {
    flex-direction: column; /* Stack text and image sections */
    padding: 15px; /* Less padding on smaller screens */
  }

  .text-section,
  .image-section {
    max-width: 100%;
  }

  .option {
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem; /* Smaller title */
  }

  .description,
  .option h3,
  .option p {
    font-size: 0.85rem; /* Smaller text for small screens */
  }
}
</style>
