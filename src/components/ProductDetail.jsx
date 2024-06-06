// import useParams from react-router-dom
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/axiosConfig";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const canvasRef = useRef(null);

  // Hook
  let { id } = useParams();
  const navigate = useNavigate();

  // Redux
  const jwt = useSelector((state) => state.auth.jwt);

  // Get product from server by id
  useEffect(() => {
    window.scrollTo(0, 0);
    axiosInstance
      .get(`/api/product/${id}`, {
        headers: {
          // Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("Response: ", res);
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        if (error.response.data.message === "Invalid Token") {
          console.log("Invalid Token");
          navigate("/signin");
        }
      });
  }, []);

  // Set up three js for loading spiderman.gltf
  useEffect(() => {
    console.log("Canvas ref: ", canvasRef.current);
    // set up three js renderer with canvasRef variable
    if (canvasRef.current === null) {
      console.log("product detail's canvas ref is null");
      return;
    }
    // const sizes = {
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // };
    const sizes = {
      width: 400,
      height: 400,
    };

    // Set up scene and load spiderman.gltf, then add to scene
    const scene = new THREE.Scene();
    const loader = new GLTFLoader();
    loader.load("/spiderman.gltf", (gltf) => {
      scene.add(gltf.scene);
      // set position of the model
      gltf.scene.position.z = -1;
      gltf.scene.position.y = -3;
      // add gui to move the model
      // const gui = new GUI();
      // const positionFolder = gui.addFolder("Position");
      // positionFolder.add(gltf.scene.position, "x").min(-10).max(10).step(0.01);
      // positionFolder.add(gltf.scene.position, "y").min(-10).max(10).step(0.01);
      // positionFolder.add(gltf.scene.position, "z").min(-10).max(10).step(0.01);
    });

    // Set up camera
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    // add lil-gui for caemra
    // const gui = new GUI();
    // gui.add(camera.position, "x").min(-10).max(10).step(0.01);
    // gui.add(camera.position, "y").min(-10).max(10).step(0.01);
    // gui.add(camera.position, "z").min(-10).max(10).step(0.01);

    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    // gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.96);
    directionalLight.position.set(-1.47, -1.47, 3.5);
    scene.add(directionalLight);

    scene.background = new THREE.Color(0xe4be9b);
    // add gui for background color
    // console log the real hex value
    // gui
    //   .addColor(scene, "background")
    //   .name("Background Color")
    //   .onChange(() => {
    //     console.log(scene.background);
    //   });

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Set up orbit controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    const tick = () => {
      //const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  });

  function renderProductImage(product) {
    if (product.name !== "Spiderman") {
      return (
        <div className="w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-box"
          />
        </div>
      );
    }
    return <canvas className="rounded-box" ref={canvasRef}></canvas>;
  }

  const onAddToCart = () => {
    // Check if user is authenticated first, if not redirect to signin
    if (!jwt) {
      navigate("/signin");
      return;
    }

    //POST /api/cart/add?productId=2&quantity=2
    console.log("Add to cart");
    setIsAddingToCart(true);
    axiosInstance
      .post(
        `/api/cart/add?productId=${product.id}&quantity=${quantity}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then((res) => {
        console.log("Response: ", res);
        setModalMessage("Awesome! Product added to cart successfully!");
        document.getElementById("add-to-cart-modal").showModal();
        setIsAddingToCart(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setModalMessage(
          "Failed to add product to cart, please contact the us!"
        );
        document.getElementById("add-to-cart-modal").showModal();
        setIsAddingToCart(false);
      });
  };

  // const product = {
  //   id: 1,
  //   name: "Naruto Figure 1",
  //   description: "Test",
  //   price: 110,
  //   category: null,
  //   imageUrl:
  //     "https://img2.cgtrader.com/items/2895079/2f05452561/large/naruto-uzumaki-3d-model-stl.jpg",
  //   creationDate: "2024-06-02T20:11:08.000+00:00",
  // };

  function renderModal() {
    return (
      <>
        {/* <button
          className="btn"
          onClick={() => document.getElementById("add-to-cart-modal").showModal()}
        >
          open modal
        </button> */}
        <dialog id="add-to-cart-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Dear Customer</h3>
            <p className="py-4">{modalMessage}</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  }

  return (
    <div className="h-screen">
      {renderModal()}
      <div className="rounded-box bg-base-200 px-8 mx-36 py-8 my-5">
        <h1 className="font-bold text-2xl text-center mb-6">Product Detail</h1>
        <div className="flex">
          {renderProductImage(product)}
          <div className="w-1/2 px-4">
            <h2 className="text-xl font-bold">Product Name: {product.name}</h2>
            <p>Description</p>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-lg font-bold mt-4">Price: ${product.price}</p>
            <div className="flex flex-col mt-4">
              <label htmlFor="quantity" className="block text-lg font-bold">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-full max-w-xs block"
                min={1}
                value={quantity}
                onChange={(e) => {
                  e.target.value < 1
                    ? setQuantity(1)
                    : setQuantity(e.target.value);
                }}
              />
              <button
                className=" bg-accent text-white py-2 rounded-md mt-3 w-2/5 disabled:bg-gray-600"
                onClick={onAddToCart}
                disabled={isAddingToCart ? "disabled" : ""}
              >
                {isAddingToCart ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
