<script setup lang="ts">
import { NAvatar, NTooltip } from 'naive-ui';
import {Game} from "../../types/game.ts";

defineProps<{
    game: Game;
    active: boolean;
}>();

const emit = defineEmits<{
    (e: 'select', gameId: number): void;
}>();

function onClick(): void {
    emit('select', game.id);
}
</script>

<template>
    <NTooltip placement="right">
        <template #trigger>
            <div
                class="game-item"
                :class="{ active }"
                @click="onClick"
            >
                <NAvatar
                    :src="game.logoPath"
                    :fallback-src="undefined"
                    round
                    size="large"
                >
                    {{ game.name[0] }}
                </NAvatar>
            </div>
        </template>

        {{ game.name }}
    </NTooltip>
</template>

<style scoped>
.game-item {
    cursor: pointer;
    padding: 6px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.game-item:hover {
    transform: scale(1.08);
    box-shadow: 0 0 10px var(--n-primary-color);
}

.game-item.active {
    background-color: var(--n-primary-color);
    box-shadow: 0 0 20px var(--n-primary-color);
}
</style>
