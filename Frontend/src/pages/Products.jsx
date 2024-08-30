import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../authContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", price: "", description: "", category: "" });
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", description: "", image: "", category: "" });
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:7000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product._id);
    setEditForm({ title: product.title, price: product.price, description: product.description, category: product.category });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:7000/products/${editProduct}`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.map((product) => (product._id === editProduct ? response.data : product)));
      setEditProduct(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/products/addProducts", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([...products, response.data]);
      setShowAddModal(false);
      setNewProduct({ title: "", price: "", description: "", image: "", category: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-2">
      <Button className="mb-3" onClick={handleAddClick}>
        Add Product
      </Button>

      <table className="table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button className="btn btn-primary m-2" onClick={() => handleEditClick(product)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={editForm.title} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="formPrice" className="mt-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={editForm.price} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={editForm.description} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="formCategory" className="mt-2">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={editForm.category} onChange={handleEditChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group controlId="formAddTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={newProduct.title} onChange={handleAddChange} />
            </Form.Group>
            <Form.Group controlId="formAddPrice" className="mt-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={newProduct.price} onChange={handleAddChange} />
            </Form.Group>
            <Form.Group controlId="formAddDescription" className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={newProduct.description} onChange={handleAddChange} />
            </Form.Group>
            <Form.Group controlId="formAddImage" className="mt-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="image" value={newProduct.image} onChange={handleAddChange} />
            </Form.Group>
            <Form.Group controlId="formAddCategory" className="mt-2">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={newProduct.category} onChange={handleAddChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
