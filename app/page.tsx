import Banner from "@/components/Home/Banner";
import FeaturedCategories from "@/components/Home/FeaturedCategories/FeaturedCategories";
import FeaturedProducts from "@/components/Home/FeaturedProducts/FeaturedProdicts";
import React from "react";

const page = () => {
  return (
    <div>
      <Banner />
      <FeaturedCategories/>
      <FeaturedProducts/>
    </div>
  );
};

export default page;
