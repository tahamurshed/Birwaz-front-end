<template>
  <div class="board-page">
    <header class="board-header">
      <h1>Your Boards</h1>
      <button class="create-board-btn" @click="openCreateBoardModal">
        + Create Board
      </button>
    </header>
    <!-- Loading Spinner -->
    <div v-if="loading" class="loader-overlay">
      <div class="loader"></div>
    </div>

    <div v-if="boards.length" class="board-list">
      <div v-for="board in boards" :key="board.id" class="board-card">
        <div class="board-card-header">
          <h3 @click="navigateToBoard(board.id)">{{ board.name }}</h3>
          <div class="card-actions">
            <i class="fas fa-edit" @click="openEditModal(board)" title="Edit Board"></i>
            <i class="fas fa-trash-alt" @click="confirmDeleteBoard(board.id)" title="Delete Board"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-boards">
      <p>You don't have any boards yet. Click "Create Board" to start!</p>
    </div>

    <!-- Modal for Create/Edit Board -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        <h2>{{ modalTitle }}</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="boardName">Board Name</label>
            <input
              type="text"
              id="boardName"
              v-model="boardName"
              placeholder="Enter board name"
              required
            />
          </div>
          <div class="form-group">
            <label for="theme">Theme</label>
            <select v-model="boardTheme" required>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn primary">
              {{ isEditing ? "Update" : "Create" }}
            </button>
            <button type="button" class="btn secondary" @click="closeModal">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal for Confirming Deletion -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-content delete-modal">
        <button class="close-btn" @click="closeDeleteModal">&times;</button>
        <h2>Are you sure you want to delete this board?</h2>
        <div class="modal-actions">
          <button class="btn primary" @click="deleteBoard(confirmedDeleteBoardId)">Yes, Delete</button>
          <button class="btn secondary" @click="closeDeleteModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toastMessage" class="toast" :class="toastType">
      {{ toastMessage }}
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      boards: [],
      showModal: false, 
      modalTitle: "",
      isEditing: false,
      boardName: "",
      boardTheme: "light",
      editedBoard: null,
      toastMessage: "",
      toastType: "",
      showDeleteModal: false, // To control the delete confirmation modal
      confirmedDeleteBoardId: null, // The board ID to be deleted
       loading: false, // Add loading state
    };
  },
  methods: {
  fetchBoards() {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      this.loading = true; // Start loading

      axios
        .get(`http://127.0.0.1:8000/api/boards/${userId}`)
        .then((response) => {
          this.boards = response.data;
          this.loading = false; // End loading
        })
        .catch((error) => {
          console.error("Error fetching boards:", error);
          this.loading = false; // End loading
        });
    },
    openCreateBoardModal() {
      this.modalTitle = "Create New Board";
      this.boardName = "";
      this.boardTheme = "light";
      this.isEditing = false;
      this.showModal = true;
    },
    openEditModal(board) {
      this.modalTitle = "Edit Board";
      this.boardName = board.name;
      this.boardTheme = board.theme || "light";
      this.editedBoard = board;
      this.isEditing = true;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.boardName = "";
      this.boardTheme = "light";
    },
    submitForm() {
      if (this.isEditing) {
        this.updateBoard();
      } else {
        this.createBoard();
      }
    },
    createBoard() {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      axios
        .post("http://127.0.0.1:8000/api/boards", {
          name: this.boardName,
          theme: this.boardTheme,
          userId,
        })
        .then(() => {
          this.fetchBoards();
          this.showToast("Board created successfully!", "success");
          this.closeModal();
        })
        .catch((error) => {
          this.showToast("Error creating board.", "error");
          console.error("Error creating board:", error);
        });
    },
    updateBoard() {
     const userId = JSON.parse(localStorage.getItem("userId"));
      const { id } = this.editedBoard;
      axios
        .put(`http://127.0.0.1:8000/api/boards/${id}`, {
          name: this.boardName,
          theme: this.boardTheme,
          userId:userId
        })
        .then(() => {
          this.fetchBoards();
          this.showToast("Board updated successfully!", "success");
          this.closeModal();
        })
        .catch((error) => {
          this.showToast("Error updating board.", "error");
          console.error("Error updating board:", error);
        });
    },
    confirmDeleteBoard(boardId) {
      this.confirmedDeleteBoardId = boardId; // Store the board ID to delete
      this.showDeleteModal = true; // Show the confirmation modal
    },
    closeDeleteModal() {
      this.showDeleteModal = false; // Hide the delete confirmation modal
      this.confirmedDeleteBoardId = null; // Reset the confirmed ID
    },
    deleteBoard(boardId) {
      axios
        .delete(`http://127.0.0.1:8000/api/boards/${boardId}`)
        .then(() => {
          this.fetchBoards();
          this.showToast("Board deleted successfully!", "success");
          this.closeDeleteModal(); // Close the delete modal after successful deletion
        })
        .catch((error) => {
          this.showToast("Error deleting board.", "error");
          console.error("Error deleting board:", error);
        });
    },
    navigateToBoard(boardId) {
      this.$router.push(`/boards/${boardId}`);
    },
    showToast(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      setTimeout(() => {
        this.toastMessage = "";
      }, 3000); // Hide toast after 3 seconds
    },
  },
  created() {
    this.fetchBoards();
  },
};

</script>

<style scoped>
/* General Styles */
.board-page {
  padding: 20px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  background-size: 200% 200%;
  animation: gradient-animation 5s ease infinite;
  height: 100vh;
  width: 100vw;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Header */
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.create-board-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Board List */
.board-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.board-card {
  width: 220px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.board-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.board-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-actions i {
  margin-left: 10px;
  cursor: pointer;
  color: #007bff;
}

.card-actions i:hover {
  color: #0056b3;
}

.no-boards {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.modal-actions .btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.modal-actions .btn.primary {
  background-color: #007bff;
  color: white;
}

.modal-actions .btn.secondary {
  background-color: #f0f0f0;
  color: #333;
}

/* Toast Notifications */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
}

.toast.error {
  background-color: #dc3545;
}

.toast.success {
  background-color: #28a745;
}

.toast.warning {
  background-color: #ffc107;
}

/* Responsiveness */
@media (max-width: 1200px) {
  .board-card {
    width: 200px;
  }

  .board-list {
    gap: 15px;
  }

  .modal-content {
    width: 350px;
  }
}

@media (max-width: 992px) {
  .board-card {
    width: 180px;
  }

  .board-list {
    gap: 10px;
  }

  .create-board-btn {
    font-size: 14px;
  }

  .modal-content {
    width: 300px;
  }
}

@media (max-width: 768px) {
  .board-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .create-board-btn {
    width: 100%;
    margin-top: 10px;
  }

  .board-list {
    justify-content: center;
  }

  .board-card {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .modal-content {
    width: 280px;
  }
}

@media (max-width: 576px) {
  .board-header {
    text-align: center;
  }

  .board-list {
    flex-direction: column;
    align-items: center;
  }

  .board-card {
    width: 90%;
    max-width: 350px;
  }

  .modal-content {
    width: 100%;
    max-width: 280px;
  }

  .create-board-btn {
    font-size: 12px;
  }
}

/* Loader Styles */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.board-page {
  padding: 20px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  background-size: 200% 200%;
  animation: gradient-animation 5s ease infinite;
  height: 100vh;
  width: 100vw;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.create-board-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.board-card {
  width: 220px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.board-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.board-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-actions i {
  margin-left: 10px;
  cursor: pointer;
  color: #007bff;
}

.card-actions i:hover {
  color: #0056b3;
}

.no-boards {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.modal-actions .btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.modal-actions .btn.primary {
  background-color: #007bff;
  color: white;
}

.modal-actions .btn.secondary {
  background-color: #f0f0f0;
  color: #333;
}

.toast {
  position: fixed;
  top: 90%;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
}

.toast.error {
  background-color: #dc3545;
}

.toast.success {
  background-color: #28a745;
}

.toast.warning {
  background-color: #ffc107;
}


/* Modal Overlay for Background */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

/* Fade-in effect for modal overlay */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Modal Content */
.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

/* Slide-in animation for modal */
@keyframes slideIn {
  0% { transform: translateY(-50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  background: none;
  border: none;
}

.close-btn:hover {
  color: #333;
}

/* Modal Header (Title) */
.modal-content h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Form Group Styling */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 16px;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: #007bff;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.modal-actions .btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

/* Primary Button (Create/Update) */
.modal-actions .btn.primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.modal-actions .btn.primary:hover {
  background-color: #0056b3;
}

/* Secondary Button (Cancel) */
.modal-actions .btn.secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}

.modal-actions .btn.secondary:hover {
  background-color: #e0e0e0;
}

/* Delete Modal (Confirmation) */
.delete-modal .modal-content {
  width: 350px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.delete-modal .modal-content h2 {
  font-size: 20px;
  color: #721c24;
}

.delete-modal .modal-actions .btn.primary {
  background-color: #dc3545;
  color: white;
}

.delete-modal .modal-actions .btn.secondary {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Modal close animation */
.delete-modal .modal-overlay {
  background-color: rgba(255, 99, 71, 0.8);
  animation: fadeInDelete 0.3s ease-out;
}

@keyframes fadeInDelete {
  0% { opacity: 0; }
  100% { opacity: 1; }
}



</style>
