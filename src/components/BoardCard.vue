<template>
  <div class="board-card">
    <div class="board-card-header">
      <h3 @click="navigateToBoard(board.id)">{{ board.name }}</h3>
      <div class="card-actions">
        <i class="fas fa-edit" @click="openEditModal(board)" title="Edit Board"></i>
        <i class="fas fa-trash-alt" @click="confirmDeleteBoard(board.id)" title="Delete Board"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    board: Object
  },
  methods: {
    navigateToBoard(boardId) {
      this.$router.push(`/boards/${boardId}`);
    },
    openEditModal(board) {
      this.$emit("open-edit-modal", board);
    },
    confirmDeleteBoard(boardId) {
      this.$emit("confirm-delete-board", boardId);
    }
  }
};
</script>
<style scoped>
/* Board Card Styles */
.board-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  cursor: pointer;
}

.board-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.board-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.board-card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
}

.board-card-header h3:hover {
  color: #4CAF50;
}

.card-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.card-actions i {
  font-size: 18px;
  color: #555;
  cursor: pointer;
  transition: color 0.3s ease;
}

.card-actions i:hover {
  color: #f44336;
}

/* Icon buttons */
.card-actions i.edit-icon {
  color: #4CAF50;
}

.card-actions i.delete-icon {
  color: #f44336;
}

.card-actions i:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}

/* Tag or Label inside Card (Optional) */
.board-card .board-tag {
  background-color: #f1f1f1;
  color: #333;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 10px;
}

/* Card Description (Optional) */
.board-card .board-description {
  font-size: 14px;
  color: #777;
  margin-top: 10px;
  line-height: 1.5;
}

</style>