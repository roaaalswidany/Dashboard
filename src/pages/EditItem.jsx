import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!id) {
      console.error("Error: ID is undefined");
      return;
    }

    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("token")?.replace("Bearer ", "");
        if (!token) throw new Error("Token is missing!");

        const response = await fetch(`https://vica.website/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setName(data.name);
        setPrice(data.price);
        setPreviewImage(data.image_url);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    formData.append("_methode", "PUT");

    console.log("FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const token = localStorage.getItem("token")?.replace("Bearer ", "");
      if (!token) throw new Error("Token is missing!");

      const response = await fetch(`https://vica.website/api/items/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },

        body: formData,
        _method: "PUT",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update item");
      }

      const responseData = await response.json();
      console.log("Update successful:", responseData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating item:", error);
      alert(error.message);
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
            Send
          </button>
        </form>

        <div className="upload-section">
          <label className="upload-box ">
            <input type="file" onChange={handleImageChange} hidden />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Selected"
                className="product-images"
              />
            ) : (
              <img
                src="/default-image.png"
                className="upload-icon"
                alt="Default"
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
