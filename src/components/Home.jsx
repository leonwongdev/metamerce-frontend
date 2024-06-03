import ProductCarousel from "./ProductCarousel";
export default function Home() {
  return (
    <>
      <div className="rounded-box bg-base-200 px-8 mx-36 py-8 my-5">
        <h1 className="font-bold text-2xl text-center">Naruto Collection</h1>
        <ProductCarousel />
      </div>
      <div className="rounded-box bg-base-200 px-8 mx-36 py-8 my-5">
        <h1 className="font-bold text-2xl text-center">Naruto Collection</h1>
        <ProductCarousel />
      </div>
      <div className="rounded-box bg-base-200 px-8 mx-36 py-8 my-5">
        <h1 className="font-bold text-2xl text-center">Naruto Collection</h1>
        <ProductCarousel />
      </div>
    </>
  );
}
