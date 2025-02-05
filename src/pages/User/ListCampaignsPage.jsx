import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext.jsx';
import UpdateCampaignPage from './UpdateCampaignPage.jsx';
import { fetchUserBalance } from '../../utils/fetchUserBalance.js';

const ListCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showUpdateCampaign, setShowUpdateCampaign] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const campaignsPerPage = 6;
  const { token, user, setUser } = useUser();

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/campaigns', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched Campaigns:', data);

      setCampaigns(Array.isArray(data) ? data : [data]);
      setTotalPages(Math.ceil(data.length / campaignsPerPage));
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [token]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (campaignId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/campaigns?campaignId=${campaignId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCampaigns((prevCampaigns) => prevCampaigns.filter((campaign) => campaign.id !== campaignId));
        await fetchUserBalance(setUser, user, token);
      } else {
        console.error('Failed to delete campaign:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const handleUpdate = (campaign) => {
    setSelectedCampaign(campaign);
    setShowUpdateCampaign(true);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateCampaign(false);
    fetchCampaigns();
  };

  const startIndex = (currentPage - 1) * campaignsPerPage;
  const endIndex = startIndex + campaignsPerPage;
  const currentCampaigns = campaigns.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-center mt-10 justify-start min-h-screen pt-6">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
        <tr>
          <th className="py-3 px-4 text-left text-gray-600 font-semibold">Campaign Name</th>
          <th className="py-3 px-4 text-left text-gray-600 font-semibold">Keywords</th>
          <th className="py-3 px-4 text-left text-gray-600 font-semibold">Bid Amount</th>
          <th className="py-3 px-4 text-left text-gray-600 font-semibold">Campaign Fund</th>
          <th className="py-3 px-4 text-left text-gray-600 font-semibold">Status</th>
          <th className="py-3 px-4 text-left text-gray-600 font-semibold">Town</th>
          <th className="py-3 px-4 text-left text-gray-600 font-semibold">Radius</th>
          <th className="py-3 px-4 text-center text-gray-600 font-semibold">Actions</th>
        </tr>
        </thead>
        <tbody>
        {currentCampaigns.length > 0 ? (
          currentCampaigns.map((campaign) => (
            <tr key={campaign.id} className={`border-t border-gray-200 ${campaign.status ? 'bg-green-100' : ''}`}>
              <td className="py-3 px-4">{campaign?.campaignName || 'N/A'}</td>
              <td className="py-3 px-4">
                {campaign?.keywords?.map((keyword) => keyword?.cvalue).join(', ') || 'No Keywords'}
              </td>
              <td className="py-3 px-4">${campaign?.bidAmount?.toFixed(2) || '0.00'}</td>
              <td className="py-3 px-4">${campaign?.campaignFund?.toFixed(2) || '0.00'}</td>
              <td className="py-3 px-4">{campaign?.status ? 'Active' : 'Inactive'}</td>
              <td className="py-3 px-4">{campaign?.townCname || 'N/A'}</td>
              <td className="py-3 px-4">{campaign?.radius ? `${campaign.radius} km` : 'N/A'}</td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => handleUpdate(campaign)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(campaign.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center py-4 text-gray-500">
              No campaigns found.
            </td>
          </tr>
        )}
        </tbody>
      </table>

      <div className="pagination mt-4">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-3 py-1 border rounded mx-1 ${
              currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
      {showUpdateCampaign && (
        <UpdateCampaignPage
          campaign={selectedCampaign}
          onClose={() => setShowUpdateCampaign(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ListCampaignsPage;