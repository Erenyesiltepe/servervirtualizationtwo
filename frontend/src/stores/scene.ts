/* import { HttpClient } from "@/utils/http-common"
import { defineStore } from "pinia"

const http = new HttpClient("sceneProxy")

export const useSceneStore = defineStore({
  id: "nexus",
  state: () => ({
    scenes: [] as string[],
    scene: "any" as any
  }),
  getters: {
    getScenes: (state) => state.scenes,
    getScene: (state) => state.scene
  },
  actions: {
    async fetchSceneNames() {
      return http.get("names").then((res: any) => {
        if (res.status == 200) {
          if (res.data != "")
            this.scenes = res.data
              .replace("\t", " ")
              .split(" ")
              .filter((item: string) => item != "")
        } else {
          console.log(res.data)
        }
      })
    },
    async fetchScene(name: string) {
      return http.get("scene", { data: JSON.stringify(name) }).then((res: any) => {
        if (res.status == 200) {
          this.scene = res.data
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      })
    },
    async saveScene(scene: any, name: string) {
      console.log(scene)
      return http
        .post("scene", {
          data: JSON.stringify({ scene: scene, name: name })
        })
        .then((res: any) => {
          if (res.status == 200) {
            this.scenes = res.data
          } else {
            console.log(res.data)
          }
        })
    }
  }
})
 */
