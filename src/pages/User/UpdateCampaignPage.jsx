import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useUser } from '../../contexts/UserContext.jsx';
import Switch from 'react-switch';
import {fetchUserBalance} from "../../utils/fetchUserBalance.js";

const UpdateCampaignPage = ({ campaign, onClose, onUpdateSuccess }) => {
  const [campaignName, setCampaignName] = useState(campaign.campaignName || '');
  const [keywordIds, setKeywordIds] = useState(campaign.keywords.map(keyword => ({ value: keyword.id, label: keyword.cvalue })) || []);
  const [bidAmount, setBidAmount] = useState(campaign.bidAmount || '');
  const [campaignFund, setCampaignFund] = useState(campaign.campaignFund || '');
  const [radius, setRadius] = useState(campaign.radius || '');
  const [townCname, setTownCname] = useState(campaign.townCname || '');
  const [status, setStatus] = useState(campaign.status || false);
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
      id: campaign.id,
      campaignName,
      keywordIds: keywordIds.map(keyword => keyword.value),
      bidAmount: parseFloat(bidAmount),
      campaignFund: parseFloat(campaignFund),
      radius: parseInt(radius, 10),
      townCname,
      status,
      productId: campaign.productId
    };

    console.log(campaignData);

    try {
      const response = await fetch(`http://localhost:8080/api/user/campaigns`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(campaignData),
      });

      if (response.ok) {
        await fetchUserBalance(setUser, user, token);
        onUpdateSuccess();
      } else {
        const errorMessage = await response.text();
        setError(`Failed to update campaign: ${errorMessage}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Update Campaign</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
            <Switch
              id="status"
              checked={status}
              onChange={setStatus}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
            />
          </div>
          <div className="col-span-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Update Campaign</button>
          </div>
        </form>
        <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full">Cancel</button>
      </div>
    </div>
  );
};

UpdateCampaignPage.propTypes = {
  campaign: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
};

export default UpdateCampaignPage;