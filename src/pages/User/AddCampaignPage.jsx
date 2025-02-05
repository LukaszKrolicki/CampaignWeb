import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext.jsx';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {fetchUserBalance} from "../../utils/fetchUserBalance.js";

const AddCampaignPage = ({ productId, onClose }) => {
  const [campaignName, setCampaignName] = useState('');
  const [keywordIds, setKeywordIds] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [campaignFund, setCampaignFund] = useState('');
  const [radius, setRadius] = useState('');
  const [townCname, setTownCname] = useState('');
  const [status] = useState(true);
  const [keywords, setKeywords] = useState([]);
  const [towns, setTowns] = useState([]);
  const [error, setError] = useState('');
  const { token, user, setUser } = useUser();

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/util/keywords', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setKeywords(data.map(keyword => ({ value: keyword.id, label: keyword.cvalue })));
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    };

    const fetchTowns = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/util/towns', {
          headers: {

            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTowns(data);
      } catch (error) {
        console.error('Error fetching towns:', error);
      }
    };

    fetchKeywords();
    fetchTowns();
  }, [token]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const campaignData = {
      campaignName,
      keywordIds: keywordIds.map(keyword => keyword.value),
      bidAmount: parseFloat(bidAmount),
      campaignFund: parseFloat(campaignFund),
      radius: parseInt(radius, 10),
      townCname,
      productId,
      status,
    };

    try {
      const response = await fetch('http://localhost:8080/api/user/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(campaignData),
      });

      if (response.ok) {
        await fetchUserBalance(setUser, user, token);
        onClose();
      } else {
        const errorMessage = await response.text();
        setError(`Failed to create campaign: ${errorMessage}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Add Campaign</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="campaignName">Campaign Name</label>
            <input
              type="text"
              id="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="keywords">Keywords</label>
            <Select
              id="keywords"
              isMulti
              value={keywordIds}
              onChange={setKeywordIds}
              options={keywords}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="bidAmount">Bid Amount</label>
            <input
              type="number"
              id="bidAmount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="campaignFund">Campaign Fund</label>
            <input
              type="number"
              id="campaignFund"
              value={campaignFund}
              onChange={(e) => setCampaignFund(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="radius">Radius</label>
            <input
              type="number"
              id="radius"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="townCname">Town</label>
            <input
              type="text"
              id="townCname"
              value={townCname}
              onChange={(e) => setTownCname(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              list="towns"
              required
            />
            <datalist id="towns">
              {towns.map(town => (
                <option key={town.id} value={town.name} />
              ))}
            </datalist>
          </div>
          <div className="col-span-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Campaign</button>
          </div>
        </form>
        <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full">Cancel</button>
      </div>
    </div>
  );
};

AddCampaignPage.propTypes = {
  productId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddCampaignPage;