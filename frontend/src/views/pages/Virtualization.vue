<script setup lang="ts">
import D3Viewer from "@/views/layouts/D3Viewer.vue"
import Setting from "@/views/layouts/Setting.vue"
import TopSettingBar from "@/views/layouts/TopSettingBar.vue"
</script>

<template>
  <n-space vertical>
    <TopSettingBar></TopSettingBar>
    <n-space>
      <D3Viewer />
      <Setting></Setting>
    </n-space>
  </n-space>
</template>
