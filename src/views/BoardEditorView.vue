<template>
    <div class="canvas--wrapper">
        <router-link to="/boards">
            <span class="btn">Вернуться назад</span>
        </router-link>
        <div class="canvas__instruments">
            <div class="instrument">
                <button @click="createObject('block')" class="card">
                    🟥
                </button>
                <button @click="createObject('shape')" class="card">
                    🔴
                </button>
                <button @click="createObject('line')" class="card">
                    〰️
                </button>
                <button @click="createObject('text')" class="card">
                    T
                </button>
                <button class="card">
                    🖼️
                </button>

            </div>

        </div>

        <div class="canvas" ref="canvas" @mousemove="onMouseMove" @mouseup="onMouseUp">
            <div v-for="block in blocks" :key="block.id" class="block"
                :style="{ left: block.x + 'px', top: block.y + 'px', transform: `rotate(${block.deg}deg)`, height: block.size + 'px', width: block.size + 'px', background: selectedColor }"
                @mouseenter="updateSize(block, $event)" @mouseleave="hideControls(block)"
                @wheel.prevent="rotateBlock(block, $event)" @mousedown="startDrag(block, $event)">
                <div class="block__size" :style="{ display: block.showControls ? 'flex' : 'none' }">
                    <span @click="increaseSize(block)">+</span>
                    <span @click="decreaseSize(block)">–</span>
                    <span>
                        <input v-model="selectedColor" type="color">
                    </span>
                </div>
            </div>


            <div v-for="block in shapes" :key="block.id" class="shape"
                :style="{ left: block.x + 'px', top: block.y + 'px' }" @mousedown="startDrag(block, $event)"></div>
            <div v-for="block in lines" :key="block.id" class="line"
                :style="{ left: block.x + 'px', top: block.y + 'px', transform: `rotate(${block.deg}deg)` }"
                @wheel.prevent="rotateBlock(block, $event)" @mousedown="startDrag(block, $event)"></div>
            <div v-for="block in texts" :key="block.id" class="text"
                :style="{ left: block.x + 'px', top: block.y + 'px' }" @mousedown="startDrag(block, $event)"
                contenteditable="true">
                {{ block.text }}
            </div>



        </div>


    </div>

</template>

<script setup>
import { ref } from 'vue'

// возможности доски
const blocks = ref([])
const shapes = ref([])
const lines = ref([])
const texts = ref([])

// позиция и выделенный блок
const draggingBlock = ref(null)
const offsetX = ref(0)
const offsetY = ref(0)

const canvas = ref(null)

// для цвета блоков
const selectedColor = ref('#000000')

function createObject(name) {
    if (name == "block") {
        const newBlock = {
            id: Date.now(),
            x: 50,
            y: 50,
            deg: 0,
            size: 100,
            showControls: false
        };
        blocks.value.push(newBlock);
    }

    if (name == "shape") {
        const newShape = {
            id: Date.now(),
            x: 50,
            y: 50
        };
        shapes.value.push(newShape);
    }

    if (name == "line") {
        const newLine = {
            id: Date.now(),
            x: 50,
            y: 50,
            deg: 0
        };
        lines.value.push(newLine);
    }

    if (name == "text") {
        const newText = {
            id: Date.now(),
            x: 50,
            y: 50,
            text: 'Новый текст'
        };
        texts.value.push(newText);
    }
}

function startDrag(block, event) {
    draggingBlock.value = block;

    const rect = event.target.getBoundingClientRect();
    offsetX.value = event.clientX - rect.left;
    offsetY.value = event.clientY - rect.top;

}


function rotateBlock(block, event) {
    const delta = event.deltaY > 0 ? 10 : -10;
    block.deg += delta;
}

function updateSize(block) {
    block.showControls = true;
}

function hideControls(block) {
    block.showControls = false;
}

function increaseSize(block) {
    block.size += 10;
}

function decreaseSize(block) {
    block.size -= 10;

}



function onMouseMove(event) {
    if (!draggingBlock.value) return;
    const canvasRect = canvas.value.getBoundingClientRect()

    let newX = event.clientX - canvasRect.left - offsetX.value
    let newY = event.clientY - canvasRect.top - offsetY.value

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

::v-deep .shape {
    position: absolute;
    width: 100px;
    height: 100px;
    background: rgb(255, 0, 0);
    cursor: move;
    user-select: none;
    border-radius: 50%;
}

::v-deep .line {
    position: absolute;
    width: 10px;
    height: 100px;
    background: rgb(2, 136, 35);
    cursor: move;
    user-select: none;
}

::v-deep .text {
    position: absolute;
    padding: 5px;
    min-width: 50px;
    color: #667eea;
    cursor: move;
    user-select: none;
    font-size: 20px;
    white-space: nowrap;
}

::v-deep .block__size {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    padding: 4px 5px;
}

::v-deep .block__size span {
    color: white;
    font-size: 20px;
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