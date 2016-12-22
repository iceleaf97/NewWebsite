/**
 * Created by iceleaf on 2016/10/18.
 */
var scene, camera, WIDTH, HEIGHT, fov, aspect, near, far,
    renderer, container, control;
var bodyCube, bodyCylinder, propellerM, joint, tail, airfoil, propellerT;
var clock= new THREE.Clock();
var mouseDown = false;
var group;

// a web page has completely loaded, and run the function init()
window.addEventListener('load', init, false);

var Colors ={
    skin : 0xFFF3E0,
    darkred: 0x652e37,
    tiffany: 0x6ecccc,
    darkblue: 0x345C83,
    pink: 0xEB9F9F,
    darkyellow: 0xf7e57e,
    white: 0xffffff
};
var useColor=Colors.darkblue;

function init() {
    createScene();
    createLight();
    createModel();
    render();
    createOrbit();
    loop();
    window.addEventListener('mousedown',MouseDown,false);
    window.addEventListener('touchstart',MouseDown,false);
    window.addEventListener('mouseup', MouseUp,false);
    window.addEventListener('touchend', MouseUp,false);
    window.addEventListener('resize', ResizeWindow, false);
}

function ResizeWindow() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}


function MouseDown(){
    mouseDown = true;
    dt2=0;
}
function MouseUp() {
    mouseDown = false;
    dt1=0;
    h0 =3;
    h = group.position.y;
}

function createScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(useColor, 100, 950);
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    fov = 50;
    aspect = WIDTH/HEIGHT;
    near = 1;
    far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
}

function createLight() {
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.3);
    scene.add(ambientLight);
    var shadowLight = new THREE.DirectionalLight( 0xffffff, 0.9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 1000;
    shadowLight.shadow.mapSize.height = 1000;
    scene.add( shadowLight );

}


function createModel(){
    var planeGeom = new THREE.PlaneGeometry(1000, 1000);
    var planeMtl = new THREE.MeshLambertMaterial({
        color: Colors.darkblue
    });
    var plane = new THREE.Mesh(planeGeom, planeMtl);
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.rotation.x = -Math.PI/2;
    plane.position.set(0, -25.5, 0);
    scene.add(plane);

    BodyCube();
    BodyCylinder();
    PropellerM();
    Joint();
    Tail();
    Airfoil();
    PropellerT();
    Group();

}
function Group() {
    group = new THREE.Mesh();
    group.add(bodyCube);
    group.add(bodyCylinder);
    group.add(propellerM);
    group.add(joint);
    group.add(tail);
    group.add(airfoil);
    group.add(propellerT);
    scene.add(group);

}

function BodyCube(){
    var geom = new THREE.BoxBufferGeometry(50, 50, 35);
    var mtl = new THREE.MeshLambertMaterial({color: 0x448AFF});
    bodyCube = new THREE.Mesh(geom, mtl);
    bodyCube.castShadow = true;
    bodyCube.receiveShadow = true;
    scene.add(bodyCube);
}
function BodyCylinder() {
    var geom = new THREE.CylinderBufferGeometry(20, 20, 50, 5);
    var mtl = new THREE.MeshLambertMaterial({color: 0xFF9800});
    bodyCylinder = new THREE.Mesh(geom, mtl);
    bodyCylinder.rotation.x = Math.PI/2;
    bodyCylinder.castShadow = true;
    bodyCylinder.receiveShadow = true;
    scene.add(bodyCylinder);
}
function PropellerM(){
    var geom = new THREE.BoxBufferGeometry(20, 3, 90);
    var mtl = new THREE.MeshLambertMaterial({color: 0xEC407A});
    propellerM = new THREE.Mesh(geom, mtl);
    propellerM.position.y = 35;
    propellerM.rotation.y = Math.PI/2;
    propellerM.castShadow = true;
    propellerM.receiveShadow = true;
    scene.add(propellerM);
}
function Joint() {
    var geom = new THREE.BoxBufferGeometry(10, 10, 10);
    var mtl = new THREE.MeshLambertMaterial({color: 0xFFEB3B});
    joint = new THREE.Mesh(geom, mtl);
    joint.position.y = 30;
    joint.castShadow = true;
    joint.receiveShadow = true;
    scene.add(joint);
}

function Tail() {
    var geom = new THREE.BoxBufferGeometry(30, 20, 10);
    var mtl = new THREE.MeshLambertMaterial({color: 0x673AB7});
    tail = new THREE.Mesh(geom, mtl);
    tail.position.set(-40, 5, 0);
    tail.castShadow = true;
    tail.receiveShadow = true;
    scene.add(tail);
}
function Airfoil() {
    var geom = new THREE.BoxBufferGeometry(15, 30, 5);
    var mtl = new THREE.MeshLambertMaterial({color: 0x009688});
    airfoil = new THREE.Mesh(geom, mtl);
    airfoil.position.set(-60, 10, 0);
    airfoil.castShadow = true;
    airfoil.receiveShadow = true;
    scene.add(airfoil);
}
function PropellerT() {
    var geom = new THREE.BoxBufferGeometry(10, 25, 2);
    var mtl = new THREE.MeshLambertMaterial({color:0xFFEB3B});
    propellerT = new THREE.Mesh(geom, mtl);
    propellerT.position.set(-55, 4, 7);
    propellerT.castShadow = true;
    propellerT.receiveShadow = true;
    scene.add(propellerT);
}



function render() {
    renderer = new THREE.WebGLRenderer({antialias:true,alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0x9ad3de);
    renderer.shadowMap.enabled = true;
    // renderer.render(scene, camera);
    container = document.getElementById('scene');
    container.appendChild(renderer.domElement);
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
    control.object.position.set(92.2, 53.68, 284.5);
    control.target.set(0, 0, 0);
    control.maxPolarAngle = Math.PI/2;
    control.autoRotate = true;
    control.update();
}
var dt1 = 0;
var dt2 = 0;
var h=0;
var h0 = 3;
function loop() {
    if(mouseDown){
        var dy = Math.sin(dt1);
        group.position.y += dy;



        dt1 += 0.02;


        propellerM.rotation.y += 0.1;
        propellerT.rotation.z += 0.1;
    }else {
        if(group.position.y >0){
            group.position.y -= dt2*dt2;
            propellerM.rotation.y +=0.1*(group.position.y/h)*(group.position.y/h);
            propellerT.rotation.z +=0.1*(group.position.y/h)*(group.position.y/h);
        }

        dt2 += 0.04;
    }




    renderer.render(scene, camera);
    requestAnimationFrame(loop);
    control.update();
}




