import { Button } from "antd";
import React from "react";

const Cards = ({ data }) => {
  return (
    <div className="h-[auto] bg-white overflow-hidden rounded-lg border">
      <div className="overflow-hidden w-full h-[150px]">
        <img src={`${data.imageUrl}`} className="object-cover" alt="" />
      </div>
      <div className="p-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="text-sm text-black capitalize text-[17px] ">
            {data.name}
          </div>
          <div className="font-semibold text-[17px]">${data.price}</div>
        </div>
        <p className="font-light text-[13px] text-gray-700">
          {data.description}
        </p>
        <div className="grid grid-cols-1 mt-2 gap-2">
          <Button
            type="black"
            className="w-full bg-black text-white  bg-primary-foreground hover:bg-primary"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
