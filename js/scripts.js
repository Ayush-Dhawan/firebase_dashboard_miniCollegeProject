import React, { useEffect, useState } from 'react';
import { getRewardsList } from '../../api/RewardsApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RewardsCard from './RewardsCard';
import SearchBar from '../common/SearchBar';
import { Button } from 'reactstrap';

const RewardsSelectionPage = () => {
  const [rewardItems, setRewardItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId } = useParams();

  const [allData, setAllData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [isAll, setIsAll] = useState(true);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const updateCount = (num) => {
    setCount(count + num);
  };

  useEffect(() => {
    setIsLoading(true);
    getRewardsList(categoryId).then((response) => {
      setRewardItems(response);
      setIsLoading(false);
      setAllData(response);
    });
  }, [categoryId]);

  useEffect(() => {
    let filteredItems = allData;

    if (!isAll) {
      filteredItems = filteredItems.filter((x) => {
        return (
          (x.status === 'Active' && isActive) ||
          (x.status === 'Inactive' && isInactive) ||
          (x.status === 'sale' && isSale)
        );
      });
    }

    if (searchQuery) {
      filteredItems = filteredItems.filter((item) =>
        item.itemName && item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setRewardItems(filteredItems);
  }, [isActive, isInactive, isSale, isAll, searchQuery, allData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main>
      <nav aria-label="breadcrumb" role="navigation">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/category">Reward Categories</Link>
          </li>
        </ol>


        {categoryId === '2' && (
          <div>
            <Button onClick={() => navigate("selectDates")}>
              Search for Travel between specified dates
            </Button>
          </div>
        )}

        <div style={{ width: "100%", paddingBottom: "10px" }}>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div
          style={{
            paddingTop: '10px',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <button
              className={`px-4 py-2 ${isAll ? 'bg-black text-white' : ''}`}
              onClick={() => setIsAll(!isAll)}
            >
              Show All Items
            </button>
          </div>

          <div>
            <button
              className={`px-4 py-2 ${isActive ? 'bg-black text-white' : ''}`}
              onClick={() => {
                setIsAll(false);
                setIsActive(!isActive);
              }}
            >
              Show Active
            </button>
          </div>
          <div>
            <button
              className={`px-4 py-2 ${isInactive ? 'bg-black text-white' : ''}`}
              onClick={() => {
                setIsAll(false);
                setIsInactive(!isInactive);
              }}
            >
              Show Inactive
            </button>
          </div>
          <div>
            <button
              className={`px-4 py-2 ${isSale ? 'bg-black text-white' : ''}`}
              onClick={() => {
                setIsAll(false);
                setIsSale(!isSale);
              }}
            >
              Show Sale
            </button>

          </div>
          <div style={{margin: "20px 0", textAlign: "center"}}>
            <label htmlFor="sort">Sort By:</label>
            <select
              id="sort"

              style={{padding: "5px", borderRadius: "5px"}}
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="Most Expensive">Most Expensive</option>
              <option value="Least Expensive">Least Expensive</option>
              <option value="Most Redeemed">Most Redeemed</option>
              <option value="Least Redeemed">Least Redeemed</option>

            </select>
          </div>
        </div>
      </nav>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {rewardItems.length > 0 ? (
            <>
              <p>Overall count: {count}</p>
              <div className="cards">
                {rewardItems.map((item) => (
                  <div className="cards-item" key={item.id}>
                    <RewardsCard
                      isUpdatable={true}
                      reward={item}
                      updateCount={updateCount}
                      showPin="true"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex justify-content-center align-items-center"
            >
              <div style={{ padding: "50px" }}>
                <p className="fw-bolder">No matching reward items found.</p>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default RewardsSelectionPage;



make the sort feature work for A-Z, Z-A, most expensive, least expensive

rewardItem: 
id
: 
1
imgSrc
: 
"giftcard1"
itemCost
: 
50
itemDescription
: 
"Use your points to shop at Amazon"
itemName
: 
"Amazon"
rewardCatalogId
: 
1
rewardsMessage
: 
undefined
status
: 
"Inactive"
