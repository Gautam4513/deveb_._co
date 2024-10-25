import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
  antialias: true,
  alpha:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



// Add a cube (example object)
const geometry = new THREE.IcosahedronGeometry(1,50);
const material = new THREE.ShaderMaterial({
  vertexShader:vertex,
  fragmentShader:fragment,
  uniforms:{
    uTime:{value:0},
    uColor:{value:0}
  }
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.y=-1.3;

camera.position.z = 5;

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const tl=gsap.timeline({
  scrollTrigger:{
    trigger:'.landing',
    start:'top top',
    end:'bottom bottom',
    scrub:1
  }
})
tl.to(cube.position,{
  y:`0`,
  z:-1.5,
  ease:'none'
},"a")
.to(material.uniforms.uColor,{
  value:1,
  ease:'none'
},"a")
const headingContent=document.querySelector(".headingContent")
const heading=document.querySelector('.heading');
const tl2 = gsap.timeline({
  scrollTrigger:{
    trigger:heading,
    start:'top top',
    end:'bottom bottom',
    scrub:2,
  },
  snap: {
    duration: { min: 2, max: 3 },
    delay: 0.2,
  }
})
tl2.to(heading,{
  opacity:0,
  ease:'none',
  duration:5
})
.to(headingContent,{
  opacity:1,
  duration:5,
  delay:1,
  ease:'none'
})

const cursor = document.querySelector("#cursor")
window.addEventListener("mousemove",(e)=>{
  let x=e.clientX+'px';
  let y=e.clientY+'px';
  gsap.to(cursor,{
    x:x,
    y:y,
    duration:0.2,
    ease:"none"
  })
})

const clock = new THREE.Clock();
// Animation loop
function animate() {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value=clock.getElapsedTime();
  renderer.render(scene, camera);
}

animate();
