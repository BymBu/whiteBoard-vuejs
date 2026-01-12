import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),

  actions: {
    // POST /auth берем токен
    login(email, password) {
      return fetch("/school-api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.token = data.token;
          localStorage.setItem("token", data.token);
        });
    },

    register(email, name, password){
        return fetch('/', {
            method: 'POST',
            headers: { "Content-Type": 'application/json'},
            body: JSON.stringify({email, name, password}),
        })
        .then(() => {})
    }
  },
});
