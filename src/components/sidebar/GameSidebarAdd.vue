<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { AddOutline } from '@vicons/ionicons5';

function onAddGame(): void {
    console.log('Add game clicked');
};
</script>

<template>
    <div class="add-game">
        <NButton circle type="primary" @click="onAddGame">
            <template #icon>
                <NIcon>
                    <AddOutline />
                </NIcon>
            </template>
        </NButton>
    </div>
</template>

<style scoped>
.add-game {
    padding: 12px;
    display: flex;
    justify-content: center;
}
</style>
