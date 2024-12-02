<template>
  <main class="board-content">
    <header class="top-bar">
      <div v-if="isDesktop" class="profile">
        <span class="profile-name">{{ user.name }}</span>
        <span class="profile-email">{{ user.email }}</span>
      </div>
    </header>
    <div class="content-area">
      <h1>{{ selectedBoard?.name || 'Select a Board' }}</h1>
      <div v-if="selectedBoard" class="task-columns">
        <div v-for="(column, index) in columns" :key="index" class="task-column" :style="{ backgroundColor: column.color }">
          <h2>{{ column.name }}</h2>
          <button @click="openAddTaskModal(column)">Add Task</button>
        </div>
        <div class="add-column">
          <button @click="openAddColumnModal" class="add-column-button">+</button>
        </div>
      </div>
      <p v-else>Select a board from the sidebar to view its details.</p>
    </div>
  </main>
</template>

<script>
export default {
  props: ['selectedBoard', 'columns', 'user', 'isDesktop'],
  methods: {
    openAddTaskModal(column) {
      this.$emit('open-add-task-modal', column);
    },
    openAddColumnModal() {
      this.$emit('open-add-column-modal');
    }
  }
};
</script>
