<template>
  <div>
    <h2>Task Lists for Board: {{ boardId }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="taskList in taskLists" :key="taskList.id">
          <h3>{{ taskList.name }}</h3>
          <p>{{ taskList.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      boardId: this.$route.params.id, // Get the board ID from the route parameters
      taskLists: [], // Store the fetched task lists
      loading: true, // Flag to indicate loading state
      error: null, // Store error message if any
    };
  },
  mounted() {
    this.fetchTaskLists();
  },
  methods: {
    async fetchTaskLists() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/boards/${this.boardId}/task-lists`);
          this.taskLists = response.data; // Store the task lists in the data object
        console.log(this.taskLists); //
      } catch (err) {
          this.error = 'Error fetching task lists';
          console.log(this.error, err);// Set error message if the API request fails
      } finally {
        this.loading = false; // Hide loading spinner
      }
    },
  },
};
</script>

<style scoped>
/* Add some styles for loading, error, and task list */
.error {
  color: red;
  font-weight: bold;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
</style>
