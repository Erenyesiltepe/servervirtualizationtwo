<script setup lang="ts">
import { ref, watch } from "vue"
import { useDialog, useLoadingBar, useMessage, useNotification } from "naive-ui"
//import http from "@/utils/http-common"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

window.$loadingBar = useLoadingBar()
window.$notification = useNotification()
window.$dialog = useDialog()
window.$message = useMessage()

const route = useRoute()
const router = useRouter()
const activeKey = ref("")
//const version = ref()
const { t } = useI18n()

watch(
  () => route.name,
  () => {
    activeKey.value = route.name as string
  }
)
/* http.get("version").then((res) => {
  version.value = res.data.version
}) */

const goBackToMainPage = () => {
  router.push({
    name: "virtualization"
  })
}
</script>

<template>
  <div class="header_bg">
    <n-config-provider>
      <n-space class="mb-3" vertical>
        <n-breadcrumb separator="&raquo;" class="ml-n1" @click="goBackToMainPage">
          <n-breadcrumb-item><i class="fa-solid fa-home"></i></n-breadcrumb-item>
          <n-breadcrumb-item>
            {{ t("pages." + route.name?.toString()) }}
          </n-breadcrumb-item>
        </n-breadcrumb>
        <n-h2 class="m-0"> {{ t("pages." + route.name?.toString()) }}</n-h2>
      </n-space>
    </n-config-provider>
  </div>
</template>
