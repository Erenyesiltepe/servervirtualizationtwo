<script setup lang="ts">
import type { IUploadedFile } from "@/models/UploadedFile"
import http from "@/utils/http-common"
import type { UploadCustomRequestOptions } from "naive-ui"
import { ref } from "vue"

const fileInformation = ref<IUploadedFile>()
const emits = defineEmits<{
  (e: "uploaded", data: IUploadedFile): void
}>()

const props = defineProps<{
  accept: string
}>()

const customRequest = ({ file, onFinish, onError, onProgress }: UploadCustomRequestOptions) => {
  window.upload({
    file: file.file,
    onError: onError(),
    onProgress: function (bytesUploaded: number, bytesTotal: number) {
      onProgress({
        percent: (bytesUploaded / bytesTotal) * 100
      })
    },
    onSuccess: function (upload: any) {
      fileInformation.value = upload.info
      emits("uploaded", upload.info)
      onFinish()
    }
  })
}

const handleRemove = () => {
  http
    .php("cancelUpload", {
      name: fileInformation.value?.name
    })
    .then((res) => {
      if (res.status == 200) {
        fileInformation.value = undefined
      }
    })
}
</script>

<template>
  <n-upload :max="1" :custom-request="customRequest" @remove="handleRemove" :accept="props.accept">
    <n-upload-dragger>
      <div style="margin-bottom: 18px">
        <n-icon size="48" :depth="3">
          <i class="fa-solid fa-upload fa-fw" style="color: rgba(0, 0, 0, 0.8)"></i>
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        Yükleme yapmak için tıklayabilir veya bu alana dosyanızı sürükleyebilirsiniz
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0"> Desteklenen dosya türleri: {{ props.accept }} </n-p>
    </n-upload-dragger>
  </n-upload>
</template>
