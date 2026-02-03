<script setup lang="ts">
import { ref } from 'vue';
import GameSidebarItem from './GameSidebarItem.vue';
import GameSidebarAdd from './GameSidebarAdd.vue';
import {Game} from "../../types/game.ts";

const games = ref<Game[]>([
    { id: 1, name: 'Trackmania', logoPath: '' },
    { id: 2, name: 'Celeste', logoPath: '' },
]);

const selectedGameId = ref<number | null>(games.value[0]?.id ?? null);

function selectGame(gameId: number): void {
    selectedGameId.value = gameId;
};
</script>

<template>
    <aside class="game-sidebar">
        <div class="game-list">
            <GameSidebarItem
                v-for="game in games"
                :key="game.id"
                :game="game"
                :active="game.id === selectedGameId"
                @select="selectGame"
            />
        </div>

        <GameSidebarAdd />
    </aside>
</template>

<style scoped>
.game-sidebar {
    width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--n-color);
    border-right: 1px solid var(--n-border-color);
}

.game-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
}
</style>
