import { numberTexture } from "@/assets/textures/numberTexture"
import {
  TextureLoader,
  MeshLambertMaterial,
  MeshStandardMaterial,
  Mesh,
  Color,
  BoxGeometry,
  MeshBasicMaterial
} from "three"
import emitter from "@/utils/emitter"

export default class RackController {
  defaultMaterial!: MeshStandardMaterial | MeshStandardMaterial[]
  numberMaterial!: MeshLambertMaterial[]
  emitter!: any

  constructor() {
    this.initNumberMaterial()
    this.emitter = emitter
  }

  initNumberMaterial() {
    this.numberMaterial = []
    const loader = new TextureLoader()
    // eslint-disable-next-line no-var
    for (var i = 0; i < 6; i++) {
      const texture = loader.load(numberTexture[i])
      this.numberMaterial.push(new MeshLambertMaterial({ map: texture }))
    }
  }

  createRack(name: string) {
    const rack_base = new BoxGeometry()
    const rack_material = new MeshStandardMaterial({ color: (Math.random() * 0xffffff) << 0 })
    const rack = new Mesh(rack_base, rack_material)
    rack.name = name + " rack"
    return rack
  }

  /*   toggleNumberMaterial(mesh: Mesh) {
    if (Array.isArray(mesh.material) && mesh.material[0] instanceof MeshLambertMaterial) {
      mesh.material = this.defaultMaterial
    } else {
      this.defaultMaterial = mesh.material as MeshStandardMaterial | MeshStandardMaterial[]
      mesh.material = this.numberMaterial
    }
  }

  setHoverMaterial(mesh: Mesh,toset:boolean) {
    if (mesh.material instanceof MeshBasicMaterial) {
      mesh.material = this.defaultMaterial
    } else {
      this.defaultMaterial = mesh.material as MeshStandardMaterial | MeshStandardMaterial[]
      mesh.material = new MeshBasicMaterial({ color: 0x00ffff })
    }
  }

  
  checkToggleMaterial(mesh: Mesh) {
      return mesh.material instanceof MeshBasicMaterial
    } */
  checkNumberMaterial(mesh: Mesh) {
    return Array.isArray(mesh.material) && mesh.material[0] instanceof MeshLambertMaterial
  }
  checkHoverMaterial(mesh: Mesh) {
    return mesh.material instanceof MeshBasicMaterial
  }
  setHoverMaterial(mesh: Mesh) {
    if (!this.checkNumberMaterial(mesh) && !this.checkHoverMaterial(mesh)) {
      this.defaultMaterial = mesh.material as MeshStandardMaterial | MeshStandardMaterial[]
      mesh.material = new MeshBasicMaterial({ color: 0x00ffff })
    }
  }
  setNumberMaterial(mesh: Mesh) {
    this.defaultMaterial = mesh.material as MeshStandardMaterial | MeshStandardMaterial[]
    mesh.material = this.numberMaterial
  }
  setDefaultMaterial(mesh: Mesh) {
    mesh.material = this.defaultMaterial
  }

  addTextureToSelected(mesh: Mesh, number: number, itexture: string) {
    const loader = new TextureLoader()
    const materiala = []
    // eslint-disable-next-line no-var
    for (var i = 1; i <= 6; i++) {
      if (i == number) {
        const texture = loader.load(itexture)
        materiala.push(new MeshStandardMaterial({ map: texture }))
      } else {
        if (
          Array.isArray(this.defaultMaterial) &&
          (this.defaultMaterial[i - 1] as MeshStandardMaterial)?.map != undefined
        ) {
          materiala.push(this.defaultMaterial[i - 1])
        } else {
          materiala.push(this.defaultMaterial)
        }
      }
    }
    this.defaultMaterial = materiala as any
    this.setDefaultMaterial(mesh)
  }

  updateColor(mesh: Mesh, color: string) {
    const colorObj = new Color(color)
    if (Array.isArray(mesh.material)) {
      // eslint-disable-next-line no-var
      for (var i = 0; i < 6; i++) {
        // @ts-ignore
        if (mesh.material[i].map == null) this.defaultMaterial[i].color = colorObj
      }
    } else {
      // @ts-ignore
      mesh.material.color = colorObj
    }
  }

  updateDefaultMaterial(material: any) {
    this.defaultMaterial = material
  }
}
