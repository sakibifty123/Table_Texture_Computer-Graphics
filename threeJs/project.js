var scene, camera, renderer, mesh, mesh2;
var meshFloor;
var keyboard = {};

var click = 1;

var socket = {
    height: 2.0,
    speed: 0.1
}



function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 900 / 600, 0.1, 1000);

    //texture loader
    var texture_1 = new THREE.TextureLoader().load("textures/texture_1.jpg");
    var texture_2 = new THREE.TextureLoader().load("textures/texture_2.jpg");
    var texture_3 = new THREE.TextureLoader().load("textures/texture_3.jpg");
    var texture_4 = new THREE.TextureLoader().load("textures/texture_4.jpg");


    //table
    //table_slab
    table_slab = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.1, 3),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_3
        })
    );

    scene.add(table_slab);
    table_slab.position.set(1.5, 1.5, 0);
    table_slab.receiveShadow = true;
    table_slab.castShadow = true;
    //table_slab

    //table_leg_1
    table_leg_1 = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 0.1),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_2
        })
    );

    scene.add(table_leg_1);
    table_leg_1.position.set(1.5, 0.7, -1.4);
    table_leg_1.receiveShadow = true;
    table_leg_1.castShadow = true;
    //table_leg_1

    //table_leg_2
    table_leg_2 = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 0.1),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_2
        })
    );

    scene.add(table_leg_2);
    table_leg_2.position.set(1.5, 0.7, 1.4);
    table_leg_2.receiveShadow = true;
    table_leg_2.castShadow = true;

    //table_leg_2
    //table

    //chair
    //chair_slab
    chair_slab = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.1, 1),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_2
        })
    );

    scene.add(chair_slab);
    chair_slab.position.set(-1, 0.8, 0);
    chair_slab.receiveShadow = true;
    chair_slab.castShadow = true;
    //chair_slab

    //chair_leg_1
    chair_leg_1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.75, 0.1),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_1
        })
    );

    scene.add(chair_leg_1);
    chair_leg_1.position.set(-.55, 0.375, -0.45);
    chair_leg_1.receiveShadow = true;
    chair_leg_1.castShadow = true;
    //chair_leg_1

    //chair_leg_2
    chair_leg_2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.75, 0.1),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_1
        })
    );

    scene.add(chair_leg_2);
    chair_leg_2.position.set(-.55, 0.375, 0.45);
    chair_leg_2.receiveShadow = true;
    chair_leg_2.castShadow = true;
    //chair_leg_2

    //chair_leg_3
    chair_leg_3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 1.8, 0.1),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_1
        })
    );

    scene.add(chair_leg_3);
    chair_leg_3.position.set(-1.45, 0.9, 0.45);
    chair_leg_3.receiveShadow = true;
    chair_leg_3.castShadow = true;
    //chair_leg_3

    //chair_leg_4
    chair_leg_4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 1.8, 0.1),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_1
        })
    );

    scene.add(chair_leg_4);
    chair_leg_4.position.set(-1.45, 0.9, -0.45);
    chair_leg_4.receiveShadow = true;
    chair_leg_4.castShadow = true;
    //chair_leg_4

    //chair_back
    chair_back = new THREE.Mesh(
        new THREE.BoxGeometry(.05, 0.5, 0.8),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture_4
        })
    );

    scene.add(chair_back);
    chair_back.position.set(-1.45, 1.4, 0.0);
    chair_back.receiveShadow = true;
    chair_back.castShadow = true;
    //chair_back
    //chair

    //meshFloor
    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(15, 15, 15, 15),
        new THREE.MeshPhongMaterial({ color: 0xB2BEB5, wireframe: false })
    );

    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;

    scene.add(meshFloor);

    //light
    ambientLight = new THREE.AmbientLight(0xffff00, 0.4);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = .5;
    light.shadow.camera.far = 15;
    scene.add(light);
    //

    camera.position.set(0, socket.height, -5);
    camera.lookAt(new THREE.Vector3(0, socket.height, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(900, 600);


    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);


    //try


    //

    animate();
}

function animate() {
    requestAnimationFrame(animate);


    //Up(arrow)
    if (keyboard[38]) {
        camera.position.x -= Math.sin(camera.rotation.y) * socket.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * socket.speed;
    }
    //Down(arrow)
    if (keyboard[40]) {
        camera.position.x += Math.sin(camera.rotation.y) * socket.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * socket.speed;
    }
    //left(arrow)
    if (keyboard[37]) {
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * socket.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * socket.speed;
    }
    //Right(arrow)
    if (keyboard[39]) {
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * socket.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * socket.speed;
    }


    //Left turn(q)
    if (keyboard[81]) {
        camera.rotation.y -= Math.PI * 0.01;
    }
    //Right turn(e)
    if (keyboard[69]) {
        camera.rotation.y += Math.PI * 0.01;
    }

    light.position.x +=.01;
        //light.rotation.y += 0.01;
        //renderer.render(scene, camera);

    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

function onClick(event) {

    console.log('clicked');

    if (click <= 3) {
        click += 1;
    } else {
        click = 1;
    }

    //texture loader
    var texture_1 = new THREE.TextureLoader().load("textures/texture_1.jpg");
    var texture_2 = new THREE.TextureLoader().load("textures/texture_2.jpg");
    var texture_3 = new THREE.TextureLoader().load("textures/texture_3.jpg");
    var texture_4 = new THREE.TextureLoader().load("textures/texture_4.jpg");

    switch (click) {
        case 1:
            table_slab = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 0.1, 3),
                new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    map: texture_1
                })
            );
            break;
        case 2:
            table_slab = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 0.1, 3),
                new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    map: texture_2
                })
            );
            break;
        case 3:
            table_slab = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 0.1, 3),
                new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    map: texture_3
                })
            );
            break;
        case 4:
            table_slab = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 0.1, 3),
                new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    map: texture_4
                })
            );
            break;

        default:

    }

    scene.add(table_slab);
    table_slab.position.set(1.5, 1.5, 0);
    table_slab.receiveShadow = true;
    table_slab.castShadow = true;

}


window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
window.addEventListener('click', onClick);


window.onload = init;