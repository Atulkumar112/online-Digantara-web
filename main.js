import * as THREE from "three"
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"; // this is for i can move it in every diraction as i want

const scene = new THREE.Scene();  // this is a scene which i need to see like car, game body etc
// scene.background = new THREE.Color(0.5, 0.5, 0.5);
const canvasContainer = document.querySelector('#canvasContainer');
const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth/canvasContainer.offsetHeight, 0.1, 1000);
// 75 is an angle,     
camera.position.z=50;  // size of object or distance b/w my eye and object

const renderer = new THREE.WebGLRenderer({
  
  canvas: document.querySelector('canvas')
});

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
// document.getElementById('app').appendChild(renderer.domElement);

//light of side
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// point Light
const pointLight = new THREE.PointLight(0xffffff, 3, 100);
pointLight.position.set(6, 0, 3);
scene.add(pointLight);

// below shap is for earth 
const geometry = new THREE.SphereGeometry(24, 32, 32);  // givne width, hight, depth
const texture = new THREE.TextureLoader().load("earth2.jpg");
// const texture2 = new THREE.TextureLoader().load("earth_clouds.png");
// const material = new THREE.MeshStandardMaterial({
  const material = new THREE.MeshBasicMaterial({
  map: texture,
  // map: texture2,
  shineness: 15,
  roughness:10,
  metalness:0.5,
 });
const earth = new THREE.Mesh(geometry, material);  // mesh for you compelte body 
scene.add(earth);


//creating object of orbitCortrol
// const controls = new OrbitControls(camera, renderer.domElement);

//creating a stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVertices = [];
for(let i=0; i<1000; i++){
    const x = (Math.random()-0.5)*2000;
    const y = (Math.random()-0.5)*2000;
    // const z = Math.random()-0.5*2000;
    const z = (Math.random()-0.5)*2000;
    starVertices.push(x, y, z); 
}
// console.log(starVertices);
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);


let theeta =0;   
animate();
// just for moving in x,y and z axis
function animate(){
    // controls.update();

    theeta+=0.01;
    let sin0 = Math.sin(theeta);
    let cos0 = Math.cos(theeta);
  
    let scalledCos = 100*cos0;
    let scalledSin = 100*sin0;

    pointLight.position.set(30*sin0, 0, 30*cos0);  
    // lightSphere.position.set(scalledSin, 0, scalledCos);
    

    earth.rotation.y +=0.001;
    // earth.rotation.y +=0.1;
      
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}


