import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email, password) {
      if (!email || !password) {
        throw new Error("Заполните email и пароль");
      }

      if (password.length < 3) {
        throw new Error("Пароль слишком короткий");
      }

      const mockToken = `fake-jwt-${btoa(email).slice(0, 20)}`;

      this.token = mockToken;
      this.user = {
        email,
        name: email.split("@")[0],
      };

      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(this.user));

      return true;
    },

    async register(email, password, name) {
      if (!email || !password || !name) {
        throw new Error("Заполните все поля");
      }

      if (password.length < 6) {
        throw new Error("Пароль должен быть не менее 6 символов");
      }

      if (!email.includes("@") || !email.includes(".")) {
        throw new Error("Введите корректный email");
      }

      const existingToken = localStorage.getItem("token");
      if (existingToken && existingToken.includes(email)) {
        throw new Error("Пользователь с таким email уже существует");
      }

      const mockToken = `fake-jwt-${btoa(email).slice(0, 20)}`;

      this.token = mockToken;
      this.user = {
        email,
        name,
      };

      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(this.user));

      return true;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
