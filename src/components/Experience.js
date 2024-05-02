import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ARButton } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';


class ARExperience {
    constructor() {
        this.container = document.createElement("div");

        // Crea la escena 
        this.scene = new THREE.Scene();

        // Configura la cámata
        this.camera = new THREE.PerspectiveCamera(
            60, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            100  // Far clipping plane
        );
        this.camera.position.set(5, 5, 5);
        this.scene.add(this.camera);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({alpha: true,} );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Controles para mover en la compu
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
 
        // Controles del beam de luz 
        this.initControllers();

        
        //Configuración de las luces 
        const drLight = new THREE.DirectionalLight(0xffffff, 1.5)
        drLight.position.set(5,5,5)
        this.scene.add(drLight)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
        drLight.position.set(5,5,5)
        this.scene.add(ambientLight)


        // Resize event
        window.addEventListener('resize', this.resize.bind(this));
    }

    setupARExperience(){
        this.renderer.xr.enabled = true

        const controller = this.renderer.xr.getController(0)
        this.scene.add(controller)

        //permanezca en la posicion en la que fue creado sin importar cómo mueva el cel

        this.scene.traverse(child => {
            if(child instanceof THREE.Mesh) {
                child.position.set(0,0,-2) //medio metro lejos desde la cámara del cel
                .applyMatrix4(controller.matrixWorld)
                child.quaternion.setFromRotationMatrix(
                    controller.matrixWorld
                )
            }
        })

        this.container.appendChild(
            ARButton.createButton(this.renderer)
        )

    }
    initControllers() {
        // Inicializar los dos controles 
        this.controllers = [this.renderer.xr.getController(0), this.renderer.xr.getController(1)];
        this.controllers.forEach((controller, index) => {
            this.scene.add(controller);

            // Crear un beam para cada control
            const beamGeometry = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 32);
            const beamMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
            const beam = new THREE.Mesh(beamGeometry, beamMaterial);

            beam.position.set(0, 0, -1.25);
            beam.rotation.x = -Math.PI / 2;
            controller.add(beam);
            
            controller.addEventListener('selectstart', () => this.onSelectStart(beam));
            controller.addEventListener('selectend', () => this.onSelectEnd(beam));
            
            if (index === 0) {
                controller.addEventListener('selectstart', () => this.scaleModel(1.1)); // Incrementa el tamaño
            } else {
                controller.addEventListener('selectstart', () => this.scaleModel(0.9)); // Lo decrementa
            }
        });
    }

    scaleModel(scaleFactor) {
        const obj = this.scene.getObjectByName("panelCajonModel");
        if (obj) {
            obj.scale.multiplyScalar(scaleFactor);
        }
    }

    onSelectStart(beam) {
        beam.material.color.set(0x00008B); // Azul oscuro cuando se presiona el botón 
    }

    onSelectEnd(beam) {
        beam.material.color.set(0xADD8E6); // Azul claro de otra forma
    }

    animate() {
        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    /* loadModel() {
        const mtlLoader = new MTLLoader();
        mtlLoader.load("./models/panelcajon.mtl", (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load("./models/panelcajon.obj", (obj) => {
                obj.name = "panelCajonModel";
                obj.scale.set(0.001, 0.001, 0.001);
                this.scene.add(obj);
            });
        });
    } */

    loadModel(mtlUrl, objUrl) {
        // Instantiate MTLLoader
        const mtlLoader = new MTLLoader();
        
        // Load the MTL file
        mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();
            

            // Instantiate OBJLoader and set the materials
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            // Load the OBJ file
            objLoader.load(objUrl, (obj) => {
                obj.scale.set(0.001, 0.001, 0.001);  // Adjust these values as needed to reduce the initial size
                this.scene.add(obj);
            });
        });
    }

    
    initScene() {
        document.querySelector(".container3D").appendChild(this.container);
        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    resize() {
        const { clientWidth: width, clientHeight: height } = document.querySelector(".container3D");
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    cleanUp() {
        this.scene.dispose()
        const container = document.querySelector(".container3D")
        let child = container.lastElementChild
        while (child) {
            container.removeChild(child)
            child = container.lastElementChild
        }
    }
}

export { ARExperience };
