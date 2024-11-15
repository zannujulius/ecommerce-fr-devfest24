import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { Button, Modal, Input } from "antd";
import Cards from "../components/Cards";
import axios from "axios";
import toast from "react-hot-toast";

const ProductPage = () => {
  const [products, setproducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setprice] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [refresh, setrefresh] = useState(true);
  const [loading, setloading] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      let res = await axios.post(
        import.meta.env.VITE_PRODUCT_API + "api/product",
        {
          price,
          name,
          description,
          imageUrl: image,
          userId: 1,
        }
      );

      setrefresh((prev) => !prev);
      toast.success(res.data.message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(
          import.meta.env.VITE_PRODUCT_API + "api/product"
        );
        setproducts(res.data.data);
        setloading(false);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [refresh]);

  return (
    <>
      <div className="">
        <TopNav />

        <div className="w-[80%] mt-[100px] mx-auto">
          <div className="">
            <div className="flex mt-4 items-start justify-end">
              <Button onClick={showModal} type="primary" className="bg-black">
                Add product
              </Button>
            </div>
            {products.length == 0 && (
              <div className="w-full flex mt-10 flex-col items-center justify-center">
                <h1 className="font-semibold text-[20px]">
                  Home page is empty
                </h1>
                <p className="font-light">Click on Add products</p>
              </div>
            )}

            {products.length > 0 && (
              <div className="grid grid-cols-4 gap-6 mt-4">
                {products.map((i, index) => (
                  <Cards key={index} data={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Add product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="">
          <div className="mt-4">
            <Input
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              size="large"
              placeholder="product name"
              className=" mt-4"
            />
            <Input
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
              size="large"
              placeholder="product price"
              className=" mt-4"
            />
            <Input.TextArea
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              size="large"
              placeholder="product description"
              className=" mt-4"
            />
            <Input
              value={image}
              onChange={(e) => {
                setimage(e.target.value);
              }}
              size="large"
              placeholder="product image url"
              className=" mt-4"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProductPage;
