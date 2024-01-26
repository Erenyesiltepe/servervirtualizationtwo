import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader, Color } from "three"
import { numberTexture } from "@/assets/textures/numberTexture"
export default class PMesh extends Mesh {
  numberMaterial!: MeshStandardMaterial[]
  numberMaterialOn: boolean = false
  defaultMaterial!: MeshStandardMaterial | MeshStandardMaterial[]
  defaultColor: string | number = (Math.random() * 0xffffff) << 0

  constructor(name: string) {
    const shape = new BoxGeometry(1, 1, 1)
    super(shape)
    this.defaultMaterial = new MeshStandardMaterial({ color: this.defaultColor })
    this.material = this.defaultMaterial
    this.initNumberMaterial()
    this.name = name.includes("rack") ? name : name + "rack"
  }

  initNumberMaterial() {
    this.numberMaterial = []
    const loader = new TextureLoader()
    // eslint-disable-next-line no-var
    for (var i = 0; i < 6; i++) {
      const texture = loader.load(numberTexture[i])
      this.numberMaterial.push(new MeshStandardMaterial({ map: texture }))
    }
  }

  toggleNumberMaterial() {
    if (this.numberMaterialOn) {
      this.material = this.defaultMaterial
    } else {
      this.material = this.numberMaterial
    }
    this.numberMaterialOn = !this.numberMaterialOn
  }

  addTextureToSelected(number: number, itexture: string) {
    const loader = new TextureLoader()
    const materiala = []
    console.log(this.material)
    // eslint-disable-next-line no-var
    for (var i = 1; i <= 6; i++) {
      if (i == number) {
        const texture = loader.load(itexture)
        materiala.push(new MeshStandardMaterial({ map: texture }))
      } else {
        if (Array.isArray(this.defaultMaterial) && this.defaultMaterial[i - 1]?.map != undefined) {
          materiala.push(this.defaultMaterial[i - 1])
        } else {
          materiala.push(new MeshStandardMaterial({ color: this.defaultColor }))
        }
      }
    }
    this.defaultMaterial = materiala
    this.material = materiala
    if (this.numberMaterialOn) this.toggleNumberMaterial()
  }

  updateColor(color: string) {
    this.defaultColor = color
    const colorObj = new Color(color)
    if (Array.isArray(this.defaultMaterial)) {
      // eslint-disable-next-line no-var
      for (var i = 0; i < 6; i++) {
        // @ts-ignore
        if (this.defaultMaterial[i].map == null) this.defaultMaterial[i].color = colorObj
      }
    } else {
      // @ts-ignore
      this.defaultMaterial.color = colorObj
    }
  }

  /*  toJSON() {
    // Call the base class's toJSON method to get the default representation
    return {
      scale: { x: this.scale.x, y: this.scale.y, z: this.scale.z },
      position: { x: this.position.x, y: this.position.y, z: this.position.z },
      rotation: { x: this.rotation.x, y: this.rotation.y, z: this.rotation.z },
      numberMaterial: this.numberMaterial,
      defaultMaterial: this.defaultMaterial,
      defaultColor: this.defaultColor,
      numberMaterialOn: this.numberMaterialOn,
      name: this.name,
      material: this.material
    }
  } */

  load(json: any) {
    this.scale.x = json.scale.x
    this.scale.y = json.scale.y
    this.scale.z = json.scale.z

    this.position.x = json.position.x
    this.position.y = json.position.y
    this.position.z = json.position.z

    this.rotation.x = json.rotation.x
    this.rotation.y = json.rotation.y
    this.rotation.z = json.rotation.z

    this.numberMaterial = json.numberMaterial
    this.defaultMaterial = json.defaultMaterial
    this.defaultColor = json.defaultColor
    this.numberMaterialOn = json.numberMaterialOn
    this.material = json.material
  }
}
