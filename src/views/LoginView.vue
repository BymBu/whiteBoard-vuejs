<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

async function handleLogin() {
    error.value = ''
    try {
        await authStore.login(email.value, password.value)
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

                <h2 class="app__title--left">Добро пожаловать!</h2>
                <p class="app__descr--left">Ваше пространство для творчества и совместной работы. Создавайте,
                    организуйте
                    и
                    делитесь идеями</p>

                <div class="advantages">
                    <div class="advantages__item">
                        <div class="item--logo">🎯</div>
                        <div class="item-content">
                            <h3>Интуитивные доски</h3>
                            <p>Простой интерфейс для быстрого старта</p>
                        </div>
                    </div>

                    <div class="advantages__item">
                        <div class="item--logo">👥</div>
                        <div class="item-content">
                            <h3>Совместная работа</h3>
                            <p>Работайте вместе в реальном времени</p>
                        </div>
                    </div>

                    <div class="advantages__item">
                        <div class="item--logo">⚡</div>
                        <div class="item-content">
                            <h3>Мгновенная синхронизация</h3>
                            <p>Изменения сохраняются мгновенно</p>
                        </div>
                    </div>
                </div>

                <div class="inspiration">
                    <div class="inspiration-item">✨</div>
                    <div class="inspiration-item">💡</div>
                    <div class="inspiration-item">🚀</div>
                    <div class="inspiration-item">🌟</div>
                </div>
            </section>

            <section class="page-right">
                <div class="card">
                    <div class="card-header">
                        <h1 class="app__name--right">Вход в аккаунт</h1>
                        <p class="app__descr--right">Введите свои данные для авторизации</p>
                    </div>

                    <form @submit.prevent="handleLogin" class="auth-form">
                        <div class="input-group">
                            <label for="email">Email</label>
                            <input v-model="email" id="email" type="email" placeholder="example@mail.com" required />
                        </div>

                        <div class="input-group">
                            <label for="password">Пароль</label>
                            <input v-model="password" id="password" type="password" placeholder="••••••••" required />
                        </div>

                        <button type="submit" class="login-btn">
                            <span class="btn-text">Войти</span>
                            <span class="btn-arrow">→</span>
                        </button>

                        <p v-if="error" class="error">{{ error }}</p>

                        <div class="divider">
                            <span>Или</span>
                        </div>

                        <router-link to="/register" class="register-link">
                            <span class="link-text">Нет аккаунта? <strong>Зарегистрироваться</strong></span>
                            <span class="link-icon">📝</span>
                        </router-link>
                    </form>
                </div>

                <div class="hint">
                    <span class="hint-icon">💡</span>
                    <p>Для тестирования используйте: admin@example.com / demo123</p>
                </div>
            </section>
        </main>
    </div>
</template>

<style scoped>
.white-board {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

main {
    display: flex;
    gap: 80px;
    max-width: 1200px;
    width: 100%;
}

.page-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
    color: white;
}

.app__name--wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
}

.app__ico--left {
    font-size: 48px;
    animation: float 3s ease-in-out infinite;
}

.app__name--left {
    font-size: 32px;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #e6e6e6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.app__title--left {
    font-size: 48px;
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
    gap: 25px;
    margin-bottom: 50px;
}

.advantages__item {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.advantages__item:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
}

.item--logo {
    font-size: 28px;
    flex-shrink: 0;
}

.item-content h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
}

.item-content p {
    margin: 0;
    opacity: 0.8;
    font-size: 14px;
}

.inspiration {
    display: flex;
    gap: 15px;
    margin-top: auto;
}

.inspiration-item {
    font-size: 24px;
    opacity: 0.6;
    animation: float 3s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.2s);
}

.inspiration-item:nth-child(1) { --i: 1; }
.inspiration-item:nth-child(2) { --i: 2; }
.inspiration-item:nth-child(3) { --i: 3; }
.inspiration-item:nth-child(4) { --i: 4; }

.page-right {
    flex: 0 0 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.card {
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.6s ease-out;
}

.card-header {
    text-align: center;
    margin-bottom: 40px;
}

.app__name--right {
    font-size: 32px;
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
    gap: 24px;
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
    padding: 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.3s ease;
    outline: none;
}

.input-group input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-group input::placeholder {
    color: #a0aec0;
}

.login-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.login-btn:active {
    transform: translateY(0);
}

.btn-arrow {
    font-size: 20px;
    transition: transform 0.3s ease;
}

.login-btn:hover .btn-arrow {
    transform: translateX(4px);
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

.divider {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 10px 0;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
}

.divider span {
    color: #a0aec0;
    font-size: 14px;
}

.register-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: #f7fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    text-decoration: none;
    color: #4a5568;
    transition: all 0.3s ease;
}

.register-link:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
    transform: translateY(-1px);
}

.link-text strong {
    color: #667eea;
}

.link-icon {
    font-size: 20px;
    opacity: 0.7;
}

.hint {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 30px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.hint-icon {
    font-size: 20px;
}

.hint p {
    margin: 0;
    color: white;
    font-size: 14px;
    opacity: 0.9;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@media (max-width: 1024px) {
    main {
        flex-direction: column;
        gap: 40px;
    }
    
    .page-right {
        flex: none;
        width: 100%;
        max-width: 450px;
        margin: 0 auto;
    }
    
    .page-left {
        text-align: center;
        align-items: center;
    }
}
</style>