
var scene = new THREE.Scene( );
var cam = new THREE.PerspectiveCamera( 45, innerWidth/innerHeight,1,100 );
const renderer = new THREE.WebGLRenderer( );

const bg = new THREE.TextureLoader().load('bg.png');
scene.background = bg;

const boxTexture = new THREE.TextureLoader().load('bbump.png');
const wall = new THREE.TextureLoader().load('bwall.jpg')
var box = new THREE.BoxGeometry(1,1,1);
const boxMat = new THREE.MeshStandardMaterial( {map:wall, bumpMap : boxTexture} );
var boxMesh = new THREE.Mesh(box, boxMat);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.SphereGeometry(0.5,24,24);
const moonMat = new THREE.MeshLambertMaterial({map:moonTexture});
const moonMesh = new THREE.Mesh(moon,moonMat);

const moonTexture2 = new THREE.TextureLoader().load('Tangent normal maps.png');
const moon2 = new THREE.TorusGeometry(1,0.5,24,100);
const moonMat2 = new THREE.MeshStandardMaterial({map : moonTexture2});
moonMat2.roughness = 0.1;
moonMat2.metalness = 0.3;
const moonMesh2 = new THREE.Mesh(moon2,moonMat2);

const clock = new THREE.Clock();

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 5);

scene.add(boxMesh, moonMesh, moonMesh2, pointLight);
cam.position.z = 7;

renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function(){
    renderer.setSize(this.window.innerWidth,this.window.innerHeight);
    cam.aspect = this.window.innerWidth/this.window.innerHeight;
    cam.updateProjectionMatrix();
});

function rotate(){
    requestAnimationFrame(rotate);

    const elaspsedTime = clock.getElapsedTime();

    boxMesh.rotation.y += 0.01;
    //boxMesh.rotation.z += 0.005;

    moonMesh.rotation.y +=0.005
    moonMesh.position.x = 3*Math.cos(elaspsedTime);
    moonMesh.position.y = 3*Math.sin(elaspsedTime);

    moonMesh2.rotation.z += 0.009;
    moonMesh2.position.x = 3*Math.cos(elaspsedTime);
    moonMesh2.position.y = 3*Math.sin(elaspsedTime);
    moonMesh2.position.z = 3*Math.tan(elaspsedTime);
    renderer.render( scene, cam );
}

rotate();