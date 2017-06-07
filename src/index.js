import THREE from "n3d-threejs"
import Main from "./main.js"

var renderer = undefined;
var main = undefined;

var setup = function() {
  renderer = new THREE.WebGLRenderer({ alpha : true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  main = new Main(renderer);

}

var update = function() {
  main.update();
  main.render();
  requestAnimationFrame(update);
}

setup();
update();
