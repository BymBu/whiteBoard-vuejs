<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('')
const name = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

async function handleRegister() {
  error.value = ''
  try {
    await authStore.register(email.value, password.value, name.value)
    router.push('/boards')
  } catch (err) {
    error.value = err.message || 'Ошибка входа'
  }
  
}

</script>
<template>
  <div class="white-board">
    <main>
      <section class="page-left">
        <div class="app__name--wrapper">
          <div class="app__ico--left">🖥️</div>
          <h1 class="app__name--left">WhiteBoard</h1>
        </div>

        <h2 class="app__title--left">Создайте свой аккаунт</h2>
        <p class="app__descr--left">Присоединяйтесь к тысячам пользователей, которые уже работают вместе</p>

        <div class="advantages">
          <div class="advantages__item">
            <div class="item--logo">🚀</div>
            <div class="item-content">
              <h3>Быстрый старт</h3>
              <p>Начните работать за 1 минуту</p>
            </div>
          </div>

          <div class="advantages__item">
            <div class="item--logo">🔒</div>
            <div class="item-content">
              <h3>Безопасность</h3>
              <p>Ваши данные под защитой</p>
            </div>
          </div>

          <div class="advantages__item">
            <div class="item--logo">🎨</div>
            <div class="item-content">
              <h3>Без ограничений</h3>
              <p>Создавайте сколько угодно досок</p>
            </div>
          </div>
        </div>
      </section>

      <section class="page-right">
        <div class="card">
          <div class="card-header">
            <h1 class="app__name--right">Регистрация</h1>
            <p class="app__descr--right">Заполните форму ниже</p>
          </div>
          <form @submit.prevent="handleRegister" class="auth-form">
            <div class="input-group">
              <label for="name">Имя</label>
              <input v-model="name" id="name" type="text" placeholder="Иван Иванов" />
            </div>

            <div class="input-group">
              <label for="email">Email</label>
              <input v-model="email" id="email" type="email" placeholder="example@mail.com" />
            </div>

            <div class="input-group">
              <label for="password">Пароль</label>
              <input v-model="password" id="password" type="password" placeholder="••••••••" />
            </div>

            <div class="input-group">
              <label for="confirm-password">Подтвердите пароль</label>
              <input id="confirm-password" type="password" placeholder="••••••••" />
            </div>

            <button type="submit" class="register-btn">
              <span class="btn-text">Создать аккаунт</span>
            </button>

            <p v-if="error" class="error">{{ error }}</p>


            <div class="login-link">
              Уже есть аккаунт?
              <router-link to="/login"><span class="link">Войти</span></router-link>
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.white-board {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: grid;
  place-items: center;
  padding: 20px;
}

.error {
  color: #e53e3e;
  font-size: 14px;
  text-align: center;
  padding: 12px;
  background: #fff5f5;
  border-radius: 8px;
  margin: 0;
  border: 1px solid #fc8181;
}


main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
}

/* Левая часть */
.page-left {
  color: white;
}

.app__name--wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.app__ico--left {
  font-size: 42px;
}

.app__name--left {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.app__title--left {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.app__descr--left {
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 50px;
  max-width: 500px;
}

.advantages {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.advantages__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.item--logo {
  font-size: 28px;
  flex-shrink: 0;
}

.item-content h3 {
  margin: 0 0 6px 0;
  font-size: 17px;
  font-weight: 600;
}

.item-content p {
  margin: 0;
  opacity: 0.8;
  font-size: 14px;
}

.page-right {
  display: flex;
  justify-content: center;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 440px;
}

.card-header {
  text-align: center;
  margin-bottom: 35px;
}

.app__name--right {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #1a202c;
}

.app__descr--right {
  font-size: 16px;
  color: #718096;
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
}

.input-group input {
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s;
  outline: none;
}

.input-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-group input::placeholder {
  color: #a0aec0;
}

.register-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: opacity 0.2s;
}

.register-btn:hover {
  opacity: 0.95;
}

.login-link {
  text-align: center;
  color: #718096;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.login-link .link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link .link:hover {
  text-decoration: underline;
}

/* Адаптив */
@media (max-width: 1024px) {
  main {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }

  .page-left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .app__descr--left {
    max-width: 600px;
  }

  .card {
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .card {
    padding: 30px 25px;
  }

  .app__title--left {
    font-size: 36px;
  }

  .app__name--left,
  .app__name--right {
    font-size: 28px;
  }
}
</style>