import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import _ from 'lodash-es';
import { Group, Easing, Tween } from '@tweenjs/tween.js';
import player from './player';
import analyser from './analyser';
import lyricList, { lyricPositions } from './lyric';
import note from './note';

const listener = new THREE.AudioListener();
const audio = new THREE.Audio(listener);

const loader = new THREE.AudioLoader();
loader.load('../../public/superman.mp3', (buffer) => {
    audio.setBuffer(buffer);
    audio.autoplay = false;   
});
const scene = new THREE.Scene();
scene.add(player);
player.position.x = 1000;
player.position.z = 600;

scene.add(analyser);
analyser.position.y = -200;
analyser.scale.z = 0.5;
analyser.rotateX(Math.PI /8);
scene.add(lyricList);
lyricList.position.y = 650;

scene.add(note);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
// scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 300, 10000);
camera.position.set(0, 800, 1500);
camera.lookAt(0, 0, 0);

const audioAnalyser = new THREE.AudioAnalyser(audio);
function updateHeight() {
    const frequencyData = audioAnalyser.getFrequencyData();

    const sumArr = _.map(_.chunk(frequencyData, 50), (arr) => {
        return _.sum(arr);
    }).reverse();

    for(let i = 0; i < analyser.children.length; i++) {
        const mesh = analyser.children[i];
        const height = sumArr[i] / 5000;
        mesh.scale.z = height;
    }
};

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height)

let costTime = 0;
let startTime = 0;
const tweenGroup = new Group();
let i = 0;
function updateLyricPosition() {
  if(lyricPositions.length && audio.isPlaying) {
    let currentTime = costTime + Date.now() - startTime;

    const mSeconds = currentTime;
    if(i >= lyricPositions.length - 1) {
      lyricList.position.z = lyricPositions[lyricPositions.length - 1][1];
    } else if(mSeconds > lyricPositions[i][0] && mSeconds < lyricPositions[i + 1][0]) {
      const tween= new Tween(lyricList.position).to({
          z: lyricPositions[i][1] + 300
      }, 300)
      .easing(Easing.Quadratic.InOut)
      .repeat(0)
      .start()
      .onComplete(() => {
          tweenGroup.remove(tween);
      })
      tweenGroup.add(tween);
      i++;
    }
  }
}

function render() {
    updateLyricPosition();
    tweenGroup.update();
    updateHeight();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

window.onresize = function () {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width,height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

const playbtn = player.getObjectByName('playbtn');
const pausebtn = player.getObjectByName('pausebtn');
renderer.domElement.addEventListener('click', (e) => {
    const y = -((e.offsetY / height) * 2 - 1);
    const x = (e.offsetX / width) * 2 - 1;

    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const intersections = rayCaster.intersectObjects(player.children);

    if(intersections.length) {
        const obj = intersections[0].object.target;
        if(obj) {
            if(obj.name === 'playbtn') {
                obj.scale.y = 0.6;
                obj.position.y = -80 * 0.4 / 2;
            
                startTime = Date.now();
                pausebtn.scale.y = 1;
                pausebtn.position.y = 0;
                audio.play();
            } else if(obj.name === 'pausebtn') {
                obj.scale.y = 0.6;
                obj.position.y = -80 * 0.4 / 2;
            
                costTime += Date.now() - startTime;
                playbtn.scale.y = 1;
                playbtn.position.y = 0;
                audio.pause();
            }
        }
    }
});