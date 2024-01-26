<script setup lang="ts">
import { ref } from "vue"
import emitter from "@/utils/emitter"
import { useSceneStore } from "@/stores/scene"
import { ObjectLoader } from "three/src/Three.js"

const sceneInstance = ref()
const rackControllerInstance = ref()
emitter.on("sceneInstance", (obj: any) => {
  sceneInstance.value = obj.scene
  rackControllerInstance.value = obj.rackController
})

const objname = ref()
const selectedSceneName = ref("Select A Scene")
const newSceneName = ref("")
const options = ref()
const store = useSceneStore()

getNames()

function getNames() {
  store.fetchSceneNames().then(() => {
    options.value = store.getScenes.map((element: string) => {
      return { label: element, key: element }
    })
  })
}

function cleanScene() {
  while (sceneInstance.value.children.length > 0) {
    var obj = sceneInstance.value.children[0]
    sceneInstance.value.remove(obj)
  }
}

function loadScene() {
  store.fetchScene(selectedSceneName.value).then(() => {
    cleanScene()
    const objects = store.getScene
    const loader = new ObjectLoader()
    const iobj = loader.parse(objects)
    sceneInstance.value.add(iobj)
    emitter.emit("sceneReload")
  })
}

function saveScene() {
  store.saveScene(sceneInstance.value.toJSON(), newSceneName.value).then(() => {
    getNames()
  })
}
</script>
<template>
  <n-space justify="space-between">
    <n-space>
      <n-input v-model:value="objname" type="text" placeholder="Object Name"></n-input>
      <n-button @click="sceneInstance.add(rackControllerInstance.createRack(objname))"
        ><i class="fa-solid fa-plus"></i
      ></n-button>
    </n-space>
    <n-space>
      <n-dropdown
        :options="options"
        @select="
          (key: string) => {
            selectedSceneName = key
          }
        "
        ><n-button>{{ selectedSceneName }}</n-button></n-dropdown
      >
      <n-button v-if="selectedSceneName != ''" @click="loadScene">load</n-button>
      <n-input
        v-model:value="newSceneName"
        type="text"
        placeholder="Enter new scene name"
      ></n-input>
      <n-button @click="saveScene">save</n-button>
    </n-space>
  </n-space>
</template>
