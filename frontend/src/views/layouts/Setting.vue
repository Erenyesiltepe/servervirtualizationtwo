<script setup lang="ts">
import { ref } from "vue"
import emitter from "@/utils/emitter"
import type { UploadCustomRequestOptions } from "naive-ui"
const rackController = ref()
const boundaries = ref({ x: 1, y: 1, z: 1 })
const active = ref(false)
const obj = ref()
const name = ref("null")
const selected = ref(1)
const image = ref()
//const color=ref()
emitter.on("setting", (object: any) => {
  active.value = true
  obj.value = object.selected
  name.value = obj.value.name
  boundaries.value = object.boundary
})
emitter.on("sceneInstance", (obj: any) => {
  rackController.value = obj.rackController
})

const options = ref([
  {
    label: 1,
    key: 1
  }
])
for (var i = 2; i <= 6; i++) {
  options.value.push({
    label: i,
    key: i
  })
}

const customRequest = ({ file }: UploadCustomRequestOptions) => {
  var reader = new FileReader()
  reader.onload = function (e) {
    // @ts-ignore
    image.value = e.target.result
  }
  // @ts-ignore
  reader.readAsDataURL(file.file)
}

function removeObj() {
  obj.value.parent.remove(obj.value)
  active.value = false
}

function numberSet() {
  if (rackController.value.checkNumberMaterial(obj.value)) {
    rackController.value.setDefaultMaterial(obj.value)
  } else {
    rackController.value.setNumberMaterial(obj.value)
  }
}
</script>
<template>
  <n-card v-show="active" :title="name" style="width: 350px; height: 600px">
    <n-space vertical>
      <n-button @click="removeObj">delete<i class="fa-solid fa-minus"></i></n-button>
      <n-scrollbar style="max-height: 450px">
        <n-collapse style="max-width: 300px">
          <n-collapse-item title="position">
            <n-form-item label="x">
              <n-slider
                v-model:value="obj.position.x"
                :min="-boundaries.x / 2"
                :max="boundaries.x / 2"
                :step="0.5"
              ></n-slider>
            </n-form-item>
            <n-form-item label="y">
              <n-slider
                v-model:value="obj.position.y"
                :min="-boundaries.y / 2"
                :max="boundaries.y / 2"
                :step="0.5"
              ></n-slider>
            </n-form-item>
            <n-form-item label="z">
              <n-slider
                v-model:value="obj.position.z"
                :min="-boundaries.z / 2"
                :max="boundaries.z / 2"
                :step="0.5"
              ></n-slider>
            </n-form-item>
          </n-collapse-item>
          <n-collapse-item title="rotation">
            <n-form-item label="x">
              <n-slider
                v-model:value="obj.rotation.x"
                :min="-Math.PI"
                :max="Math.PI"
                :step="1 / Math.PI"
              ></n-slider>
            </n-form-item>
            <n-form-item label="y">
              <n-slider
                v-model:value="obj.rotation.y"
                :min="-Math.PI"
                :max="Math.PI"
                :step="1 / Math.PI"
              ></n-slider>
            </n-form-item>
            <n-form-item label="z">
              <n-slider
                v-model:value="obj.rotation.z"
                :min="-Math.PI"
                :max="Math.PI"
                :step="1 / Math.PI"
              ></n-slider>
            </n-form-item>
          </n-collapse-item>
          <n-collapse-item title="scale">
            <n-form-item label="x">
              <n-slider
                v-model:value="obj.scale.x"
                :min="0"
                :max="boundaries.x"
                :step="0.5"
              ></n-slider>
            </n-form-item>
            <n-form-item label="y">
              <n-slider
                v-model:value="obj.scale.y"
                :min="0"
                :max="boundaries.x"
                :step="0.5"
              ></n-slider>
            </n-form-item>
            <n-form-item label="z">
              <n-slider
                v-model:value="obj.scale.z"
                :min="0"
                :max="boundaries.x"
                :step="0.5"
              ></n-slider>
            </n-form-item>
          </n-collapse-item>
          <n-collapse-item title="material">
            <n-form-item label="base color">
              <n-color-picker
                :on-update:value="
                  (value: string) => {
                    rackController.updateColor(obj, value)
                  }
                "
                :show-alpha="false"
              />
            </n-form-item>
            <n-form-item label="texture">
              <n-space>
                <n-button @click="numberSet">toggle</n-button>
                <n-dropdown
                  :options="options"
                  @select="
                    (key: number) => {
                      selected = key
                    }
                  "
                >
                  <n-button>{{ selected }}</n-button>
                </n-dropdown>
                <n-upload response-type="blob" :customRequest="customRequest">
                  <n-button>Upload</n-button>
                </n-upload>
                <n-button @click="rackController.addTextureToSelected(obj, selected, image)"
                  >Apply</n-button
                >
              </n-space>
            </n-form-item>
          </n-collapse-item>
        </n-collapse>
      </n-scrollbar>
    </n-space>
  </n-card>
</template>
