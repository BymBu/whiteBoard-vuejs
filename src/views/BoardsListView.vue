<script setup>
import { useBoards } from '@/stores/board';

const board = useBoards()

</script>

<template>
    <div class="boards__list">
        <div class="container">
            <header>
                <span @click="board.createBoard()" class="btn">Создать доску</span>
                <span class="btn">Фильтр по лайкам</span>
            </header>
            <div class="board--wrapper">
                <div v-for="b in board.boards" :key="b.id" class="board">
                    <span class="board__name">{{ b.title }}</span>
                    <router-link :to="`/board/${b.hash}`">
                        <span class="board__btn">Редактировать</span>
                    </router-link>
                    <span @click="board.deleteBoard(b.id)" class="board__btn">Удалить</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.boards__list {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin-bottom: 0px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 0;
    gap: 20px;
    flex-wrap: wrap;
}

.container {
    margin-top: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1800px;
    max-height: 2000px;
    height: auto;

    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    gap: 20px;
    overflow-y: auto;

}

.board--wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1800px;
    max-height: 2000px;
    height: auto;
    padding: 40px;
    gap: 20px;
    overflow-y: auto;
    justify-content: center;
}

.board {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: white;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

    min-width: 280px;
    max-width: 400px;
}

.board__btn {
    padding: 16px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}

.btn {
    padding: 16px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}
</style>