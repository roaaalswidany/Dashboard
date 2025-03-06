import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const sendData = async (event) => {
    event.preventDefault();

    if (!name || !price || !image) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image_url", image_url);

    try {
      const res = await axios.post("https://vica.website/api/items", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", res.data);

      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="title">Add Product</h1>
      <div className="form-container">
        <form onSubmit={sendData} className="product-form">
          <label className="input-label">Product Name</label>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
          <label className="input-label">Price</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="save-button">
            Save
          </button>
        </form>

        <div className="upload-section">
          <label className="upload-box">
            <input
              type="file"
              onChange={(e) => setImageUrl(e.target.files[0])}
              required
              hidden
            />
            <img
              src="/assets/img/Upload icon.svg"
              alt="Upload icon"
              className="upload-icon"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
