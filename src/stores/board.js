import { defineStore } from "pinia";

function generateHash() {
  return Math.random().toString(36).substring(2, 10);
}

export const useBoards = defineStore("boards", {
  state: () => ({
    boards: JSON.parse(localStorage.getItem("boards") || "[]"),
  }),

  getters: {
    boardsSortedByLikes(state) {
      return [...state.boards].sort((a, b) => b.likes - a.likes);
    },
  },

  actions: {
    createBoard(title = "Новая доска") {
      const newBoard = {
        id: Date.now(),
        hash: generateHash(),
        title,
        createdAt: new Date().toISOString(),
        objects: [],
        likes: 0,
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

      if (Array.isArray(obj)) {
        board.objects = obj;
      } else {
        board.objects = [obj];
      }

      this.save();
    },

    getBoardByHash(hash) {
      return this.boards.find((board) => board.hash === hash);
    },

    likesBoard(hash) {
      const board = this.getBoardByHash(hash);
      board.likes += 1;
      this.save();
    },

    save() {
      localStorage.setItem("boards", JSON.stringify(this.boards));
    },
  },
});
