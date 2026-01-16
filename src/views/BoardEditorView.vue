<template>
    <div class="canvas--wrapper">
        <router-link to="/boards">
            <span class="btn">Вернуться назад</span>
        </router-link>
        <div class="canvas__instruments">
            <div class="instrument">
                <button @click="createObject()" class="card">
                    🟥
                </button>
                <button class="card">
                    🔴
                </button>
                <button class="card">
                    〰️
                </button>
                <button class="card">
                    T
                </button>
                <button class="card">
                    🖼️
                </button>

            </div>

        </div>

        <div class="canvas" ref="canvas" @mousemove="onMouseMove" @mouseup="onMouseUp">
            <div v-for="block in blocks" :key="block.id" class="block"
                :style="{ left: block.x + 'px', top: block.y + 'px' }" @mousedown="startDrag(block, $event)"></div>
        </div>


    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const blocks = ref([])

const draggingBlock = ref(null)
const offsetX = ref(0)
const offsetY = ref(0)

const canvas = ref(null)

function createObject() {
    const newBlock = {
        id: Date.now(),
        x: 50,
        y: 50
    };
    blocks.value.push(newBlock);
}

function startDrag(block, event) {
    draggingBlock.value = block;

    const rect = event.target.getBoundingClientRect()
    offsetX.value = event.clientX - rect.left
    offsetY.value = event.clientY - rect.top
}

function onMouseMove(event) {

    const canvasRect = canvas.value.getBoundingClientRect()

    let newX = event.clientX - canvasRect.left - offsetX.value
    let newY = event.clientY - canvasRect.top - offsetY.value
    console.log(event.clientX)

    const blockWidth = 100;
    const blockHeight = 100;

    newX = Math.max(0, Math.min(newX, canvasRect.width - blockWidth));
    newY = Math.max(0, Math.min(newY, canvasRect.height - blockHeight));

    draggingBlock.value.x = newX;
    draggingBlock.value.y = newY;
}

function onMouseUp() {
    draggingBlock.value = null;
}

</script>

<style scoped>
::v-deep .block {
    position: absolute;
    width: 100px;
    height: 100px;
    background: black;
    cursor: move;
    user-select: none;
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

.canvas--wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.instrument {
    border: 1px solid black;
    max-width: 300px;
    width: 300px;
    height: 50px;
    box-shadow: 0px 5px 30px;
    display: flex;
}

.card {
    font-size: 30px;
    background-color: none;
    width: 60px;
}

.canvas__instruments {
    margin-top: 50px;
    display: flex;
    width: 100%;
    max-width: 1600px;
}

.canvas {
    position: relative;
    background: white;
    width: 1600px;
    height: 700px;
    box-shadow: 0px 5px 30px;
    border-radius: 5px;
}
</style>