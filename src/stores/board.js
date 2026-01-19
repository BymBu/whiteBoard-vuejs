import { defineStore } from "pinia";

function generateHash() {
  return Math.random().toString(36).substring(2, 10);
}

export const useBoards = defineStore("boards", {
  state: () => ({
    boards: JSON.parse(localStorage.getItem("boards") || "[]"),
  }),

  actions: {
    createBoard(title = "Новая доска") {
      const newBoard = {
        id: Date.now(),
        hash: generateHash(),
        title,
        createdAt: new Date().toISOString(),
        objects: [],
      };

      this.boards.push(newBoard);
      this.save();
      return newBoard.hash;
    },

    deleteBoard(id) {
      this.boards = this.boards.filter((board) => board.id !== id);
      this.save();
    },

    saveBoard(id, obj) {
      const board = this.boards.find((board) => board.id == id);
      board.objects.push(obj);
      this.save();
    },

    getBoardByHash(hash) {
      return this.boards.find((board) => board.hash === hash);
    },

    // Установка ID доски
    setCurrentId(id) {
      this.currentBoardId = id;
    },

    save() {
      localStorage.setItem("boards", JSON.stringify(this.boards));
    },
  },
});
