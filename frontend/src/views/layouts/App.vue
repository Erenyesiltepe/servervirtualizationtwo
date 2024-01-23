<script setup lang="ts">
/* import { ref } from "vue" */
import { RouterView } from "vue-router"
import AppProvider from "./AppProvider.vue"
/* import Errors from "./Errors.vue" */
import Navigation from "./Navigation.vue"

/* const err = ref()
const stack = ref()
const errorCapture = (error: any) => {
  err.value = error.error.toString()
  stack.value = error.error.stack as string
} */
</script>

<template>
  <AppProvider>
    <RouterView v-slot="{ Component }">
      <div style="padding: 30px; width: 100%">
        <Navigation />
        <component :is="Component" />
      </div>
    </RouterView>
  </AppProvider>
</template>
