import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axiosInstance from "../api/axiosConfig";
import Card from "./Card";

export default function Home() {
  const canvasRef = useRef(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    axiosInstance
      .get("/api/product", {})
      .then((res) => {
        console.log("Products Response: ", res);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Products Response Error: ", error);
      });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ markers: false, immediateRender: false }); // set immediateRender to false to prevent the weird snapping back to original position.x bug
    /**
     * Base
     */
    // Debug

    // const gui = new GUI();
    //return;
    // Canvas
    // const canvas = document.querySelector("canvas.webgl");
    if (canvasRef.current === null) {
      return;
    }
    // Scene
    const scene = new THREE.Scene();
    // set to yellow
    scene.background = new THREE.Color(0xe4be9b);
    // use GUI to change the background color
    // gui.addColor(scene, "background").name("Background Color");
    // console log the real hex value
    // gui
    //   .addColor(scene, "background")
    //   .name("Background Color")
    //   .onChange(() => {
    //     console.log(scene.background);
    //   });

    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    // gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.96);
    directionalLight.position.set(-1.47, -1.47, 3.5);
    // gui.add(directionalLight, "intensity").min(0).max(3).step(0.001);
    // gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
    // gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
    // gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);

    // Shadow properties
    directionalLight.castShadow = true;
    console.log(directionalLight.shadow);

    // These are like the resolution of the shadow map
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 6;
    scene.add(directionalLight);
    const directionalLightCameraHelper = new THREE.CameraHelper(
      directionalLight.shadow.camera
    );
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.right = 2;
    directionalLight.shadow.camera.bottom = -2;
    directionalLight.shadow.camera.left = -2;
    directionalLight.shadow.radius = 101;
    // scene.add(directionalLightCameraHelper);

    // var lightFolder = gui.addFolder("Directional Light");

    /**
     * Materials
     */
    // const material = new THREE.MeshStandardMaterial();
    // material.roughness = 0.7;
    // gui.add(material, "metalness").min(0).max(1).step(0.001);
    // gui.add(material, "roughness").min(0).max(1).step(0.001);

    /**
     * Objects
     */
    // const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
    // sphere.castShadow = true;

    // const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
    // plane.rotation.x = -Math.PI * 0.5;
    // plane.position.y = -0.5;
    // plane.receiveShadow = true;
    // scene.add(plane);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0.87;
    camera.position.z = 2;
    scene.add(camera);
    // const cameraFolder = gui.addFolder("Camera Position");
    // cameraFolder.add(camera.position, "x", -10, 10, 0.01);
    // cameraFolder.add(camera.position, "y", -10, 10, 0.01);
    // cameraFolder.add(camera.position, "z", -10, 10, 0.01);
    // Create an object to hold the lookAt position
    //const lookAtPosition = { x: 0, y: 0.5, z: 0 };

    // Add lookAt position properties to the GUI
    // const lookAtFolder = gui.addFolder("LookAt Position");
    // lookAtFolder
    //   .add(lookAtPosition, "x", -10, 10, 0.01)
    //   .onChange(updateCameraLookAt);
    // lookAtFolder
    //   .add(lookAtPosition, "y", -10, 10, 0.01)
    //   .onChange(updateCameraLookAt);
    // lookAtFolder
    //   .add(lookAtPosition, "z", -10, 10, 0.01)
    //   .onChange(updateCameraLookAt);

    // Function to update the camera's lookAt position
    // function updateCameraLookAt() {
    //   console.log(lookAtPosition);
    //   camera.lookAt(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);
    // }

    // Initial update
    //updateCameraLookAt();

    // Controls
    // const controls = new OrbitControls(camera, canvas);
    // controls.enableDamping = true;

    /**
     * Renderer
     */
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    // If you use PCFSoftShadowMap you can't use the shadow.radius property
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // const textureLoader = new THREE.TextureLoader();
    // const texture = textureLoader.load("/textures/wood-light.jpeg");
    // Test to load 3d model
    // const loader = new GLTFLoader();
    // loader.load("/textures/wooden_display_stand_rack.glb", function (gltf) {
    //   gltf.scene.traverse(function (child) {
    //     if (child.isMesh) {
    //       // Apply the texture to the mesh material
    //       child.material.map = texture;
    //       child.material.needsUpdate = true;
    //     }
    //   });

    //   scene.add(gltf.scene);
    // });
    // Test to load 3d model
    const loader = new GLTFLoader();
    let storeModel = null;
    loader.load("/capstone-shelf-5a.glb", function (gltf) {
      storeModel = gltf.scene;
      scene.add(storeModel);
      // const modelFolder = gui.addFolder("storeModel Position");
      // modelFolder.add(storeModel.position, "x", -10, 10, 0.01);
      // modelFolder.add(storeModel.position, "y", -10, 10, 0.01);
      // modelFolder.add(storeModel.position, "z", -10, 10, 0.01);
      console.log(storeModel.position);

      // animation set up
      const scrubValue = true;
      const timeline = new gsap.timeline();
      timeline.to(storeModel.position, {
        y: -0.4,
        scrollTrigger: {
          trigger: ".section-1",
          marker: true,
          start: "top bottom",
          end: "top center",
          scrub: scrubValue,
        },
      });
      timeline.to(storeModel.position, {
        z: 1,
        scrollTrigger: {
          trigger: ".section-1",
          marker: true,
          start: "top bottom",
          end: "top center",
          scrub: scrubValue,
        },
      });

      // Add a new timeline animation for the second section
      timeline.to(storeModel.position, {
        x: -0.4,
        scrollTrigger: {
          trigger: ".section-2",
          marker: true,
          start: "top bottom",
          end: "top center",
          scrub: scrubValue,
          // overwrite: true,
        },
      });

      timeline.to(
        storeModel.position,
        {
          x: -0.6,
          y: 0.1,
          scrollTrigger: {
            trigger: ".section-3",
            marker: true,
            start: "top bottom",
            end: "top center",
            scrub: scrubValue,
            // overwrite: true,
          },
        },
        ">"
      );

      timeline.to(
        storeModel.position,
        {
          x: -0.2,
          scrollTrigger: {
            trigger: ".section-4",
            marker: true,
            start: "top bottom",
            end: "top center",
            scrub: scrubValue,
            // overwrite: true,
          },
        },
        ">"
      );

      timeline.to(
        storeModel.position,
        {
          x: 0.3,
          scrollTrigger: {
            trigger: ".section-5",
            marker: true,
            start: "top bottom",
            end: "top center",
            scrub: scrubValue,
            // overwrite: true,
          },
        },
        ">"
      );

      // End of load model
    });

    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    /**
     * Animate
     */
    //const clock = new THREE.Clock();

    const tick = () => {
      //const elapsedTime = clock.getElapsedTime();

      // Update controls
      //  controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  function renderProductCards() {
    if (!products || products.length === 0) {
      return;
    }
    console.log("Products: ", products);
    return products.map((product, index) => {
      let margin = "mb-96";
      if (index === products.length - 1) {
        margin = "mb-44";
      }
      return (
        <div
          key={index}
          className={`section-${index + 1} grid grid-cols-12 ${margin}`}
        >
          <div className="col-start-8 col-end-13 rounded-box">
            <div className="grid grid-cols-3 gap-4">
              <Card
                key={product.id}
                id={product.id}
                title={product.name}
                description={product.description}
                imageUrl={product.imageUrl}
              />
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="">
      <canvas
        className="webgl fixed top-[64px] left-0 z-[2]"
        ref={canvasRef}
      ></canvas>
      <div className="z-10 relative">
        <div className=" w-screen h-screen border-solid border-2 border-red-500 grid grid-cols-12 grid-rows-12">
          <div className="col-start-2 col-end-8 row-start-2 row-end-12">
            <h1 className="text-8xl font-bold text-white">Metamerce</h1>
            <h2 className="text-3xl font-bold text-white">
              Your "Next-Gen 3D Immersive" online shopping experience
            </h2>
          </div>
        </div>
        {renderProductCards()}
      </div>
    </div>
  );
}
