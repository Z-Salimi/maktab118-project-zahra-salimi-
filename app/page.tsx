import { FilterSideBar } from "@/components/filterSideBar";
import  ImageSlider  from "@/components/sliderImg";
import { Navbar } from "@/components/navbar";
import { Benefit } from "@/components/benefit";
import { ProductCategoryMain } from "@/components/ProductCategoryMain";
import { Footer } from "@/components/footer";


export default function Home() {
  return (
    <section className="w-full container max-w-[1600px] mx-auto bg-slate-100">
      <div className="sticky top-0 z-40 bg-gray-200">
      <Navbar />
      {/* <FilterSideBar /> */}
      </div>
        <ImageSlider />
        <Benefit />
        <ProductCategoryMain />
        <Footer />

    </section>
  );
}
