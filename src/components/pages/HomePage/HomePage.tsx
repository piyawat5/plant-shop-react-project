/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import ProductCard from "../../features/ProductCard";

// type HomePageProps = {
//   //
// };

const HomePage: React.FC<any> = () => {
  return (
    <div>
      <img
        style={{ height: 700 }}
        src={`${process.env.PUBLIC_URL}/images/plant-home.png`}
      ></img>
      <ProductCard
        price={400}
        productName="จุ๊กกรู้"
        stock={200}
        image={`${process.env.PUBLIC_URL}/images/tree1.png`}
      ></ProductCard>
    </div>
  );
};

export default HomePage;
