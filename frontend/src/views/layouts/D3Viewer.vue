<script setup lang="ts">
import { onMounted } from "vue"
import SceneInit from "@/commons/SceneInit"
import { Raycaster, Vector2, MeshStandardMaterial } from "three"
import emitter from "@/utils/emitter"

onMounted(() => {
  const scene = new SceneInit("d3space")
  scene.initialize()
  scene.animate()
  scene.createEmptyScene()
  emitter.emit("sceneInstance", scene.scene)
  emitter.on("sceneReload", () => {
    scene.animate()
  })

  const pointer = new Vector2()
  const raycaster = new Raycaster()

  var selectedRack: any | null = null

  const element = document.getElementById("d3space")

  if (element != null) {
    const onClick = (event: any) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      const offset = element.getBoundingClientRect()
      pointer.x = ((event.clientX - offset.left) / element.clientWidth) * 2 - 1
      pointer.y = -((event.clientY - offset.top) / element.clientHeight) * 2 + 1

      raycaster.setFromCamera(pointer, scene.camera)
      const intersects = raycaster.intersectObjects(scene.scene.children)

      // change color of the closest object intersecting the raycaster
      if (intersects.length > 0) {
        const selected = intersects[0].object
        if (selected.name.includes("rack")) {
          // @ts-ignore
          emitter.emit("setting", { selected: selected, boundary: scene.boundary })
        }
      }
    }
    const onMouseMove = (event: any) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      const offset = element.getBoundingClientRect()
      const cx = event.clientX - offset.left + 1
      const cy = event.clientY - offset.top + 1.5

      pointer.x = (cx / element.clientWidth) * 2 - 1
      pointer.y = -(cy / element.clientHeight) * 2 + 1

      raycaster.setFromCamera(pointer, scene.camera)
      const intersects = raycaster.intersectObjects(scene.scene.children)

      // change color of the closest object intersecting the raycaster
      if (intersects.length > 0) {
        const selected = intersects[0].object
        // @ts-ignore
        if (selected.name.includes("rack") && !selected.numberMaterialOn) {
          // @ts-ignore
          selected.material = new MeshStandardMaterial({ color: 0x00ffff })
          //change old selectedRack to normal
          if (selectedRack != null && selected != selectedRack && !selectedRack.numberMaterialOn) {
            selectedRack.material = selectedRack.defaultMaterial
          }
          selectedRack = selected
        } else {
          if (selectedRack != null && !selectedRack.numberMaterialOn)
            selectedRack.material = selectedRack.defaultMaterial
        }
      }
    }
    element.addEventListener("click", onClick)
    element.addEventListener("mousemove", onMouseMove)
  }
})
</script>
<template>
  <div id="d3space" style="width: 780px; height: 600px"></div>
</template>
