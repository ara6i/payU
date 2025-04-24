import React, { useEffect } from "react";
import { Product } from "../types";
import { products } from "../data/products";
import { useBuyNowHandler } from "../hooks/useBuyNowHandler";
import ProductCard from "../components/ProductCard";
import SubscriptionCard from "../components/SubscriptionCard";

const HomePage: React.FC = () => {
  const { form, BuyNowHandler } = useBuyNowHandler();

  const handleBuyNowClick = (product: Product) => {
    BuyNowHandler({
      amount: product.price,
      productInfo: product.title,
      firstName: "Arash",
      lastName: "User",
      email: `ara6i.sn@gmail.com`,
      phone: `11111111`,
    });
  };

  useEffect(() => {
    const formData = document.getElementById("payment_post") as HTMLFormElement;
    if (formData) {
      formData.submit();
    }
  }, [form]);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: form }}
        className="mt-5 border border-gray-300 p-2.5"
      />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onBuyNow={handleBuyNowClick}
              />
            ))}
            <SubscriptionCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
