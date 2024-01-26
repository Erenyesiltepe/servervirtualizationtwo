<script setup lang="ts">
import { onMounted } from "vue"
import SceneInit from "@/commons/SceneInit"
import { Raycaster, Vector2, Mesh } from "three"
import emitter from "@/utils/emitter"
import RackController from "@/commons/RackController"

onMounted(() => {
  const scene = new SceneInit("d3space")
  const rackController = new RackController()
  scene.initialize()
  scene.animate()
  scene.createEmptyScene()
  emitter.emit("sceneInstance", { scene: scene.scene, rackController: rackController })
  emitter.on("sceneReload", () => {
    scene.animate()
  })

  const pointer = new Vector2()
  const raycaster = new Raycaster()

  var selectedRack: any | null = null

  const element = document.getElementById("d3space")

  if (element != null) {
    const getIntersects = (event: any) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      const offset = element.getBoundingClientRect()
      const cx = event.clientX - offset.left + 1
      const cy = event.clientY - offset.top + 1.5

      pointer.x = (cx / element.clientWidth) * 2 - 1
      pointer.y = -(cy / element.clientHeight) * 2 + 1

      raycaster.setFromCamera(pointer, scene.camera)
      return raycaster.intersectObjects(scene.scene.children)
    }

    const onClick = (event: any) => {
      const intersects = getIntersects(event)

      // change color of the closest object intersecting the raycaster
      if (intersects.length > 0) {
        const selected = intersects[0].object
        if (selected.name.includes("rack")) {
          emitter.emit("setting", { selected: selected, boundary: scene.boundary })
        }
      }
    }
    const onMouseMove = (event: any) => {
      const intersects = getIntersects(event)

      // change color of the closest object intersecting the raycaster
      if (intersects.length > 0) {
        const selected = intersects[0].object
        if (selected.name.includes("rack")) {
          if (selectedRack != null && selectedRack != selected) {
            rackController.setDefaultMaterial(selectedRack as Mesh)
          }
          rackController.setHoverMaterial(selected as Mesh)
          selectedRack = selected
        } else if (selectedRack != null && !rackController.checkNumberMaterial(selectedRack)) {
          rackController.setDefaultMaterial(selectedRack)
        }
      } else {
        if (selectedRack != null && !rackController.checkNumberMaterial(selectedRack)) {
          rackController.setDefaultMaterial(selectedRack as Mesh)
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
