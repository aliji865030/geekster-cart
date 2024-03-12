import { data } from "./../component/data";
import { useState } from "react";

function LandingScreen() {
  const [totalItem, setTotalItem] = useState();
  const [totalData, setTotalData] = useState([...data]);
  const [totalPrice, setTotalPrice] = useState();
  const [quantity, setQuantity] = useState(1);

  window.onload = function () {
    let tempData = [...totalData];
    let price = 0;
    for (let ele of tempData) {
      let currentQuantity = Number(ele.quantity);
      let currentPrice = Number(ele.price);
      price += currentPrice * currentQuantity;
    }
    setTotalPrice(price.toFixed(2));
    setTotalItem(tempData.length);
  };

  function updateValue(tempData) {
    let price = 0;
    let quantity = 0;
    for (let ele of tempData) {
      let currentQuantity = Number(ele.quantity);
      let currentPrice = Number(ele.price);
      price += currentPrice * currentQuantity;
      quantity += currentQuantity;
    }
    setTotalPrice(price.toFixed(2));
    setTotalItem(quantity);
  }

  function addOne(index) {
    let tempData = [...totalData];
    let value = Number(tempData[index].quantity);
    tempData[index].quantity = value + 1;
    setTotalData([...tempData]);
    updateValue(tempData);
  }
  function subOne(index) {
    let tempData = [...totalData];
    if (Number(totalData[index].quantity) > 1) {
      let value = Number(tempData[index].quantity);
      tempData[index].quantity = value - 1;
      setTotalData([...tempData]);
    } else {
      tempData.splice(index, 1);
      setTotalData([...tempData]);
      setTotalItem(tempData.length);
    }

    updateValue(tempData);
  }

  function removeEle(index) {
    let tempData = [...totalData];
    tempData.splice(index, 1);
    setTotalData([...tempData]);
    setTotalItem(tempData.length);

    updateValue(tempData);
  }
  function clearCart() {
    setTotalData([]);
    setTotalPrice(0);
    setTotalItem(0);
  }

  return (
    <div className=" bg-slate-400">
      <div className="py-5 bg-blue-600 flex text-white justify-around items-center">
        <div>
          <h1 className="text-5xl font-bold">Your Cart</h1>
        </div>
        <div className="relative h-14">
          <i className="fa-solid fa-cart-plus text-5xl"></i>
          <p className="w-10 h-10 border rounded-full flex justify-center items-center text-2xl absolute bottom-8 left-8 bg-gray-400 ">
            {totalItem}
          </p>
        </div>
      </div>
      <div className="text-center text-5xl font-bold py-14">YOUR BAG</div>
      <div className="flex justify-center items-center flex-col">
        {totalData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center gap-60 py-5 bg-white w-6/12 rounded-xl my-3"
            >
              <div className="flex">
                <div>
                  <img src={item.src} alt="" className="h-40 w-40" />
                </div>
                <div>
                  <p className="text-2xl">{item.name}</p>
                  <p>${item.price}</p>
                  <button
                    className="border-2 px-3 py-1 rounded-xl bg-red-400 hover:bg-red-500 text-white"
                    onClick={() => {
                      removeEle(index);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-2xl flex flex-col justify-center items-center">
                <p
                  onClick={() => {
                    addOne(index);
                  }}
                  className="cursor-pointer"
                >
                  <i class="fa-solid fa-chevron-up"></i>
                </p>
                <p>{item.quantity}</p>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    subOne(index);
                  }}
                >
                  <i class="fa-solid fa-chevron-down"></i>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-1 bg-slate-500 mt-12"></div>
      <div className="py-10">
        <div className="flex justify-around">
          <span className="text-2xl">Total</span>
          <span className="border bg-blue-400 px-3 py-1 rounded-xl text-2xl text-white">
            $ {totalPrice}
          </span>
        </div>
        <div className="text-center">
          <button
            className="border px-3 py-1 rounded-xl bg-slate-500 hover:bg-slate-600 text-white"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingScreen;
