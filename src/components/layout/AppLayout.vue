<script setup lang="ts">
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui';
</script>

<template>
    <n-layout has-sider style="height: 100vh;">
        <n-layout-sider
            width="96"
            bordered
        >
            <slot name="sidebar" />
        </n-layout-sider>

        <n-layout-content style="padding: 24px;">
            <slot name="main" />
        </n-layout-content>

        <n-layout-sider
            width="320"
            bordered
        >
            <slot name="leaderboard" />
        </n-layout-sider>
    </n-layout>
</template>