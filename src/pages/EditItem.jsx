import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Items from "./Items";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImageUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`https://vica.website/api/items/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setName(res.data.name);
        setPrice(res.data.price);
        setPreviewImage(res.data.image_url);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      if (image) {
        formData.append("image", image_url);
      }

      console.log(
        "forndata befor sending",
        Object.fromEntries(formData.entries())
      );

      const response = await axios.put(
        `https://vica.website/api/items/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error updating item:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="edit-product-container">
      <h1 className="edit-title">Edit Product</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="product-form">
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
            Update
          </button>
        </form>

        <div className="upload-section">
          <label className="upload-box">
            <input type="file" onChange={handleImageChange} hidden />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Selected"
                className="product-image"
              />
            ) : (
              <img src={Items.image} className="upload-icon" />
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
