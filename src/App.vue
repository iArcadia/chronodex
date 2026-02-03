<script setup lang="ts">
import AppLayout from "./components/layout/AppLayout.vue";
import GameSidebar from "./components/sidebar/GameSidebar.vue";
</script>

<template>
    <AppLayout>
        <template #sidebar>
            <GameSidebar />
        </template>

        <template #main>
            MainView
        </template>

        <template #leaderboard>
            LeaderboardPanel
        </template>
    </AppLayout>
</template>
