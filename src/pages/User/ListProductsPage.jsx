import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext.jsx';
import AddCampaignPage from './AddCampaignPage.jsx';
import {fetchUserBalance} from "../../utils/fetchUserBalance.js";

const ListProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const productsPerPage = 6;
  const { token, user, setUser } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        console.error("No token available. User might not be logged in.");
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/user/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const fetchedProducts = await response.json();
          setProducts(fetchedProducts);
        } else {
          console.error('Failed to fetch products:', await response.text());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleDeleteProduct = async (id) => {
    if (!token) {
      console.error("No token available. User might not be logged in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/user/products?productId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });


      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
        await fetchUserBalance(setUser, user, token);
      }
      else {
        console.error('Failed to delete product:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddCampaign = (id) => {
    setSelectedProductId(id);
    setShowAddCampaign(true);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center mt-6 justify-start min-h-screen pt-6">
      <h2 className="text-2xl font-bold mb-6">List of Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">{product.name}</h3>
            <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-4 py-2 mr-3 rounded mb-2">Delete</button>
            <button onClick={() => handleAddCampaign(product.id)} className="bg-green-500 text-white px-4 py-2 rounded">Add Campaign</button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {showAddCampaign && (
        <AddCampaignPage
          productId={selectedProductId}
          onClose={() => setShowAddCampaign(false)}
        />
      )}
    </div>
  );
};

export default ListProductsPage;