import React, { useEffect } from "react";
import { products } from "../data/products";
import { useBuyNowHandler } from "../hooks/useBuyNowHandler";
import ProductCard from "../components/ProductCard";
import SubscriptionOptions from "../components/SubscriptionCard";

interface Product {
  id: number | string;
  title: string;
  price: number;
  description?: string;
  image?: string;
}

const HomePage: React.FC = () => {
  const { form, BuyNowHandler, subscription } = useBuyNowHandler();

  const handleBuyNowClick = (product: Product) => {
    BuyNowHandler({
      amount: product.price,
      productinfo: product.title,
      firstname: "Arash",
      email: `ara6i.sn@gmail.com`,
      phone: `9876543210`,
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
            <SubscriptionOptions subscriptionHandler={subscription} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
