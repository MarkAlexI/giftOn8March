const width = window.innerWidth,
  height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

camera.position.z = 30;
camera.position.y = 30;
camera.position.x = 10;
scene.add(camera);

let light = new THREE.PointLight(0xffffff);
light.position.set(-100, 200, 100);
scene.add(light);

controls = new THREE.OrbitControls(camera, renderer.domElement);

axes = new THREE.AxesHelper(50);
scene.add(axes);

const heartShape = new THREE.Shape();

heartShape.moveTo(25, 25);
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

const cube = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 'red' }));
scene.add(cube);


var spritey = makeTextSprite(" Кохана ", { fontsize: 32, textColor: { r: 255, g: 255, b: 255, a: 1.0 } });
spritey.position.set(-5, -5, -5);
scene.add(spritey);

var spritey = makeTextSprite(" Сонечко ", { fontsize: 32, textColor: { r: 255, g: 255, b: 255, a: 1.0 } });
spritey.position.set(-5, 5, -5);
scene.add(spritey);

var spritey = makeTextSprite(" Hello ", { fontsize: 32, textColor: { r: 255, g: 255, b: 255, a: 1.0 } });
spritey.position.set(5, -5, -5);
scene.add(spritey);
var spritey = makeTextSprite(" Красуня ", { fontsize: 32, textColor: { r: 255, g: 255, b: 255, a: 1.0 } });
spritey.position.set(5, 5, -5);
scene.add(spritey);
var spritey = makeTextSprite(" Неймовірна ", { fontsize: 32, textColor: { r: 255, g: 255, b: 255, a: 1.0 } });
spritey.position.set(5, 5, 5);
scene.add(spritey);
cube.scale.set(.1, .1, .1);
cube.position.x = 0;

function makeTextSprite(message, parameters)
{
  if (parameters === undefined) parameters = {};
  const fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
  const fontsize = parameters.hasOwnProperty("fontsize") ?
    parameters["fontsize"] : 16;
  const borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 2;
  const borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };
  const backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r: 0, g: 0, b: 255, a: 1.0 };
  const textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = "Bold " + fontsize + "px " + fontface;
  const metrics = context.measureText(message);
  const textWidth = metrics.width;

  context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
  context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
  context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
  context.fillText(message, borderThickness, fontsize + borderThickness);

  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
  return sprite;
}

animate();

function animate() {
  cube.rotation.z -= .005;
  cube.rotation.y += .005;
  cube.rotation.x -= .008;

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
}