<script setup lang="ts">
import { onMounted, ref } from 'vue';

const games = ref<any[]>([]);

/**
 * Load games from database.
 */
async function loadGames(): Promise<void> {
    games.value = await window.api.getGames();

    return games;
}

/**
 * Add a test game.
 */
async function addGame(): Promise<void> {
    await window.api.createGame('Trackmania', null);
    await loadGames();
}

onMounted(() => {
    loadGames().then(g => {
        console.log(g);
    });
});
</script>

<template>
    <div>

    </div>
</template>