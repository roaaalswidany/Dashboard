import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./Items.css";
import Modal from "../Components/Modal/Modal";

const Items = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("https://vica.website/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application / json",
        },
      });

      if (Array.isArray(res.data)) {
        setItems([...res.data]);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const confirmDeleteItem = async () => {
    if (!itemToDelete) return;
    try {
      await axios.delete(`https://vica.website/api/items/${itemToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setItems((prev) => prev.filter((item) => item.id !== itemToDelete));
      setModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="items-container">
      <div className="sec">
        <h1>Manage Products</h1>
        <Link to="/dashboard/item/create" className="add-button">
          <FaPlus /> Add Product
        </Link>
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>${parseFloat(item.price).toFixed(2)}</td>
                <td>
                  {item.image_url ? (
                    <img
                      src={`${item.image_url}`}
                      alt={item.name}
                      className="product-image"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <div className="desgin">
                    <Link
                      to={`/dashboard/item/edit/${item.id}`}
                      className="edit-btn "
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="delete-btn "
                      onClick={() => {
                        setItemToDelete(item.id);
                        setModalOpen(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-items">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDeleteItem}
        message="Are You Sure You Want To Delete The Product?"
      />
    </div>
  );
};

export default Items;
