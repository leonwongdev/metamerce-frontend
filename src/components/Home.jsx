import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axiosInstance from "../api/axiosConfig";
import Card from "./Card";
import GUI from "lil-gui";

export default function Home() {
  const canvasRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    // console.log("Home.jsx useEffect called");
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
    console.log("Home.jsx useEffect for threejs called");
    // set immediateRender to false to prevent the weird snapping back to original position.x bug
    /**
     * Base
     */

    if (products.length === 0) {
      return;
    }
    // Scene
    const scene = new THREE.Scene();
    // set to yellow
    scene.background = new THREE.Color(0xede3cc);

    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.96);
    directionalLight.position.set(-1.47, -1.47, 3.5);

    scene.add(directionalLight);

    /**
     * Sizes
     */
    const sizes = {
      width: document.getElementById("root").clientWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      console.log("Resizing threejs canvas");
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

    // Test to load 3d model
    const loader = new GLTFLoader();
    let storeModel = null;
    loader.load("/store.glb", function (gltf) {
      storeModel = gltf.scene;
      scene.add(storeModel);
      setIsModelLoaded(true);
      // const modelFolder = gui.addFolder("storeModel Position");
      // modelFolder.add(storeModel.position, "x", -10, 10, 0.01);
      // modelFolder.add(storeModel.position, "y", -10, 10, 0.01);
      // modelFolder.add(storeModel.position, "z", -10, 10, 0.01);

      // Animation set up
      setupGSAPTimeline(sizes, storeModel, camera);

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
  }, [products]);

  const setupGSAPTimeline = (sizes, storeModel, camera) => {
    if (!storeModel || !camera) return;
    console.log("Setting up GSAP Timeline...");
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ markers: false, immediateRender: false });

    // Animation setup code using storeModel and camera...
    const scrubValue = 0.6;
    const timeline = new gsap.timeline();
    let responsiveScale = 1;
    let zoom = 1.35;
    if (sizes.width < 576) {
      responsiveScale = 3.2;
      zoom = 9.4;
      camera.position.z = 4;
    } else if (sizes.width < 640) {
      responsiveScale = 3;
      zoom = 6;
      camera.position.z = 4;
    } else if (sizes.width <= 1024) {
      responsiveScale = 1.3;
      zoom = 2.2;
      camera.position.z = 2.3;
    }
    timeline.to(storeModel.position, {
      x: sizes.width * 0.0003 * responsiveScale,
      y: sizes.width * -0.0002 * responsiveScale,
      z: sizes.width * 0.0007 * zoom,
      scrollTrigger: {
        trigger: ".section-1",
        marker: true,
        start: "top bottom",
        end: "top center",
        scrub: scrubValue,
      },
    });
    // timeline.to(storeModel.position, {
    //   z: sizes.width * 0.0007 * zoom,
    //   scrollTrigger: {
    //     trigger: ".section-1",
    //     marker: true,
    //     start: "top bottom",
    //     end: "top center",
    //     scrub: scrubValue,
    //   },
    // });

    // Add a new timeline animation for the second section
    timeline.to(storeModel.position, {
      x: sizes.width * -0.0001 * responsiveScale,
      scrollTrigger: {
        trigger: ".section-2",
        marker: true,
        start: "top bottom",
        end: "top center",
        scrub: scrubValue,
        // overwrite: true,
      },
    });

    timeline.to(storeModel.position, {
      x: sizes.width * -0.0005 * responsiveScale,
      scrollTrigger: {
        trigger: ".section-3",
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
        x: sizes.width * -0.0005 * responsiveScale,
        y: sizes.width * 0.00006 * responsiveScale,
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
        x: sizes.width * -0.0001 * responsiveScale,
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

    timeline.to(
      storeModel.position,
      {
        x: sizes.width * 0.0003 * responsiveScale,
        scrollTrigger: {
          trigger: ".section-6",
          marker: true,
          start: "top bottom",
          end: "top center",
          scrub: scrubValue,
          // overwrite: true,
        },
      },
      ">"
    );
  };

  function renderProductCards() {
    if (!products || products.length === 0) {
      return;
    }

    return products.map((product, index) => {
      let margin = "mb-96";
      if (index === products.length - 1) {
        margin = "mb-80 md:mb-44";
      }
      return (
        <div
          key={index}
          className={`section-${index + 1} grid grid-cols-12 ${margin}`}
        >
          <div className="col-start-7 col-end-12 rounded-box">
            <div className="grid grid-cols-3 gap-4">
              <Card
                key={product.id}
                id={product.id}
                title={product.name}
                description={product.description}
                imageUrl={product.imageUrl}
                price={product.price}
              />
            </div>
          </div>
        </div>
      );
    });
  }

  function renderProgress() {
    if (isModelLoaded && products.length > 0) {
      return;
    }

    let msg = "";

    if (!isModelLoaded) {
      msg = "Loading your immersive 3D store, sit tight!";
    } else if (products.length === 0) {
      msg = "Now loading products, you will be surprised how fun they are!";
    }

    return (
      <div>
        <p className="text-xl font-semibold text-neutral-600">{msg}</p>
        <progress className="progress w-full"></progress>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <canvas
        className="webgl fixed top-[64px] z-[2] w-screen h-screen block"
        ref={canvasRef}
      ></canvas>
      <div className="z-10 relative">
        <div
          className={
            `w-full h-screen grid grid-cols-12 grid-rows-12` +
            (isModelLoaded && products.length > 0 ? " scroll-indicator" : "")
          }
        >
          <div className="col-start-2 col-end-12 md:col-start-2 md:col-end-8 row-start-2 row-end-12">
            <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold text-neutral">
              Metamerce
            </h1>
            <h2 className="text-xl md:text-3xl lg:text-3xl font-bold text-neutral-700">
              Your Next-Gen 3D Immersive online shopping experience
            </h2>
            {renderProgress()}
          </div>
        </div>
        {renderProductCards()}
      </div>
    </div>
  );
}
