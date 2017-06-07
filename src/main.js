import THREE from 'n3d-threejs'

class OilPaint {
  constructor(rdrr) {
    this.rdrr = rdrr;
    this.oldtime = new Date() * 0.001;
    this.newtime = new Date() * 0.001;
    this.deltime = 0.0;

    this.rtt = new THREE.WebGLRenderTarget(
      window.innerWidth, window.innerHeight, {
        minFilter : THREE.LinearFilter,
        magFilter : THREE.LinearFilter
      }
    );

    this.rttc = new THREE.Camera();
    this.rtts = new THREE.Scene();
    this.rtts.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({ map : this.rtt})
    ));


    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight , 1.0, 100.0);
    this.camera.position.z = 80.0;
    this.scene = new THREE.Scene();

    this.object = new THREE.Object3D();
    this.object.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        transparent : true,
        fragmentShader : `
        varying vec2 vtex;
        void main(void) {
          float len = 1.0 - length(vtex);
          gl_FragColor = vec4(0.0, 0.0, 0.0, len * 0.2);
        }
        `,
        vertexShader : `
        varying vec2 vtex;
        void main(void) {
          vtex = uv * 2.0 - 1.0;
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

        }`
      })
    ));
    this.scene.add(this.object);
  }

  _random() {
    return Math.random() * 2.0 - 1.0;
  }

  _gaussian(w) {
    var u = 1.0 - Math.random();
    return Math.sqrt(-w * Math.log(u)) * this._random();
  }

  _move(rad) {
    this.object.position.x += 0.5 * Math.sin(rad);
    this.object.position.y += 0.5 * Math.cos(rad);
  }
  _randomWalk_4dir() {
    switch((Math.random() * 4) << 0) {
      case 0 : this._move(Math.PI * 2.0 * 0.00); break;
      case 1 : this._move(Math.PI * 2.0 * 0.25); break;
      case 2 : this._move(Math.PI * 2.0 * 0.50); break;
      case 3 : this._move(Math.PI * 2.0 * 0.75); break;
      default : console.log("?");
    }
  }

  _randomWalk_8dir() {
    switch((Math.random() * 8) << 0) {
      case 0 : this._move(Math.PI * 2.0 * 0.000); break;
      case 1 : this._move(Math.PI * 2.0 * 0.125); break;
      case 2 : this._move(Math.PI * 2.0 * 0.250); break;
      case 3 : this._move(Math.PI * 2.0 * 0.375); break;
      case 4 : this._move(Math.PI * 2.0 * 0.500); break;
      case 5 : this._move(Math.PI * 2.0 * 0.625); break;
      case 6 : this._move(Math.PI * 2.0 * 0.750); break;
      case 7 : this._move(Math.PI * 2.0 * 0.875); break;
      default : console.log("?");
    }
  }

  update() {
    this.newtime = new Date() * 0.001;
    this.deltime = this.newtime - this.oldtime;
    this.oldtime = new Date() * 0.001;

    if(this.deltime < 0.0 || this.deltime > 0.1) this.deltime = 0.0;

    // this.object.position.x = this._gaussian(1.0) * 5.0;
    // this._randomWalk_4dir();
    this._randomWalk_8dir();
  }

  render() {
    this.rdrr.autoClear = false;
    this.rdrr.render(this.scene, this.camera, this.rtt);
    this.rdrr.autoClear = true;

    this.rdrr.render(this.rtts, this.rttc);
    // console.log(this.canvas.texture);
  }
}

export default OilPaint
