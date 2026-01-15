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

    getBoardByHash(hash) {
      return this.boards.find((board) => board.hash === hash);
    },

    addOrUpdateObject(hash, obj) {
      const board = this.getBoardByHash(hash);
      if (!board) return;

      const existingIndex = board.objects.findIndex((o) => o.id === obj.id);
      if (existingIndex >= 0) {
        board.objects[existingIndex] = obj;
      } else {
        board.objects.push(obj);
      }
      this.save();
    },

    save() {
      localStorage.setItem("boards", JSON.stringify(this.boards));
    },
  },
});
