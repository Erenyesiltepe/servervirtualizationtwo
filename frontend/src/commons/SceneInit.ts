import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  // Clock,
  AmbientLight,
  DirectionalLight,
  AxesHelper,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
// import Stats from "three/examples/jsm/libs/stats.module.js"

interface boundary {
  x: number
  y: number
  z: number
}

export default class SceneInit {
  scene!: Scene
  camera!: PerspectiveCamera
  renderer!: WebGLRenderer
  //clock!: Clock
  fov: number
  nearPlane: number
  farPlane: number
  controls!: OrbitControls
  // stats!: Stats
  ambientLight!: AmbientLight
  directionalLight!: DirectionalLight
  axesHelper!: AxesHelper
  element!: HTMLElement
  boundary: boundary = { x: 8, y: 5, z: 8 }
  base: any = { g: null, w1: null, w2: null }

  constructor(canvasId: string) {
    // NOTE: Camera params;
    this.fov = 45
    this.nearPlane = 1
    this.farPlane = 1000
    const element = document.getElementById(canvasId)
    if (element != null) {
      this.element = element
    }

    // NOTE: Additional components.

    // NOTE: Lighting is basically required.
  }

  initialize() {
    this.scene = new Scene()

    this.camera = new PerspectiveCamera(
      this.fov,
      this.element.clientWidth / this.element.clientHeight,
      this.nearPlane,
      this.farPlane
    )
    this.camera.position.z = 18

    // NOTE: Specify a canvas which is already created in the HTML.
    this.renderer = new WebGLRenderer({
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true
    })
    const portion = 19 / 20
    this.renderer.setSize(this.element.clientWidth * portion, this.element.clientHeight * portion)
    // this.renderer.shadowMap.enabled = true;

    this.element.appendChild(this.renderer.domElement)

    //this.clock = new Clock()
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    //this.stats = new Stats()
    // element.appendChild(this.stats.dom)

    // ambient light which is for the whole scene
    this.ambientLight = new AmbientLight(0xffffff, 0.5)
    this.ambientLight.castShadow = true
    this.scene.add(this.ambientLight)

    // directional light - parallel sun rays
    this.directionalLight = new DirectionalLight(0xffffff, 1)
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64)
    this.scene.add(this.directionalLight)

    //this.axesHelper = new AxesHelper()
    //this.scene.add(this.axesHelper)

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false)
    this.onWindowResize()

    // NOTE: Load space background.
    // this.loader = new TextureLoader();
    // this.scene.background = this.loader.load('./pics/space.jpeg');

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new Color(0xffffff) },
    // };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this))
    this.render()
    // this.stats.update()
    this.controls.update()
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera)
  }

  onWindowResize() {
    this.camera.aspect = this.element.clientWidth / this.element.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)
  }

  createEmptyScene(): void {
    const x_size = this.boundary.x
    const y_size = this.boundary.y
    const z_size = this.boundary.z

    // ground
    const ground_base = new BoxGeometry(x_size, 0, z_size)
    const ground_material = new MeshBasicMaterial({ color: "#5e5848" })
    const ground = new Mesh(ground_base, ground_material)
    ground.position.setY(-y_size / 2)
    ground.name = "ground"
    this.scene.add(ground)

    // wall1
    const wall1_base = new BoxGeometry(x_size, y_size, 0)
    const wall1_material = new MeshBasicMaterial({ color: "#7a776e" })
    const wall1 = new Mesh(wall1_base, wall1_material)
    wall1.position.setZ(-z_size / 2)
    wall1.name = "wall1"
    this.scene.add(wall1)

    // wall2
    const wall2_base = new BoxGeometry(0, y_size, z_size)
    const wall2_material = new MeshBasicMaterial({ color: "#7a776e" })
    const wall2 = new Mesh(wall2_base, wall2_material)
    wall2.position.setX(+x_size / 2)
    wall2.name = "wall2"
    this.scene.add(wall2)

    this.base = { g: ground, w1: wall1, w2: wall2 }
  }

  updateWalls(boundary: boundary) {
    this.boundary = boundary

    this.base.g.setSize(boundary.x, 0, boundary.z)
    this.base.g.position.setY(-boundary.y / 2)

    this.base.w1.setSize(boundary.x, boundary.y, 0)
    this.base.w1.position.setZ(-boundary.z / 2)

    this.base.w1.setSize(0, boundary.y, boundary.z)
    this.base.w1.position.setZ(boundary.x / 2)
  }
}
