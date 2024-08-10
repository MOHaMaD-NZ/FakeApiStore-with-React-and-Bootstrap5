import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fitchData();
  }, []);
  async function fitchData() {
    const res = await axios.get("https://api.escuelajs.co/api/v1/products");
    setProduct(res.data);
  }

  async function handleDelete(index) {
    const res = await axios.delete(
      `https://api.escuelajs.co/api/v1/products/${index.id}`
    );
    const newProducts = product.filter((p) => p.id !== index.id);
    setProduct(newProducts);
  }

  async function handleUpdate(index) {
    index.price = "20 هزار تومان";
    const res = await axios.put(
      `https://api.escuelajs.co/api/v1/products/${index.id}`
    );
    const updatedProduct = [...product];
    const i = updatedProduct.indexOf(index);
    updatedProduct[i] = { ...index };
    setProduct(updatedProduct);
  }

  return (
    <div className="">
      <h1 className=" text-white mt-1 text-shadow  bg-info w-100  text-center position-fixed top-0 start-50 translate-middle-x z-3 py-3">
        Get Fake api Store
      </h1>
      <div style={{ marginTop: "120px" }} className="container">
        <div className="row">
          {product.map((index, i) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div
                  key={i}
                  id={index.id}
                  className="card text-center m-2 ml-auto mt-5  "
                >
                  <img
                    src={index.images}
                    alt=""
                    style={{ height: "250px" }}
                    className="card-img-top rounded p-1 "
                  />
                  <p className="card-text text-danger">{index.price}</p>
                  <p className="card-text text-black-50">{index.name}</p>
                  <p className="card-title text-black-50">{index.title}</p>
                  <button
                    onClick={() => {
                      handleDelete(index);
                    }}
                    className="btn btn-danger p-2"
                  >
                     نپسندیدم[پاک کن]
                  </button>
                  <button
                    onClick={() => {
                      handleUpdate(index);
                    }}
                    className="btn btn-info p-2"
                  >
                     قیمتش رو نشونم بده
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
