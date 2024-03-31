import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './organizationList.css';

const OrganizationList = ({ organizations, display }) => {
    const [following, setFollowing] = useState({});

    const [isFollowing, setIsFollowing] = useState(false);
    const [followingError, setFollowingError] = useState(false);

  const headers = {
    authorization: localStorage.getItem('token')
  };

  const initFollowing = async () => {
    const followingObj = {};
  
    for (const organization of organizations) {
      try {
        const response = await axios.post('/api/organizations/isFollowing', { idOrga: organization.idOrga }, { headers });
        followingObj[organization.idOrga] = response.data.isFollowing;
      } catch (error) {
        setFollowingError(true);
      }
    }
  
    setFollowing(followingObj);
  };
  

  const checkFollowing = async (idOrga) => {
    try {
      const response = await axios.post('/api/organizations/isFollowing', { idOrga }, { headers });
      setFollowing((prevFollowing) => ({
        ...prevFollowing,
        [idOrga]: response.data.isFollowing,
      }));
      setFollowingError(false);
    } catch (error) {
      setFollowingError(true);
    }
  };
  

  const unfollow = async (idOrga) => {
    try {
      await axios.post('/api/organizations/unfollow', { idOrga }, { headers });
      setFollowing((prevFollowing) => ({
        ...prevFollowing,
        [idOrga]: false,
      }));
    } catch (error) {
      console.error(error);
    }
  }
  
  const follow = async (idOrga) => {
    try {
      await axios.post('/api/organizations/follow', { idOrga }, { headers });
      setFollowing((prevFollowing) => ({
        ...prevFollowing,
        [idOrga]: true,
      }));
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    if (display === 1 && organizations.length > 0) {
      initFollowing();
    }
  }, [display, organizations]);
  
  return (
    <div className="organizationList">
      {organizations.map((organization) => (
        <div className="orga-preview" key={organization.idOrga}>
          <h2>{organization.title}</h2>
          <h3>{organization.description}</h3>
          <div className='button-preview'>
            <button onClick={() => window.location.href = ("/organization/view/" + organization.idOrga)} className="button">
              <span>View</span>
            </button>
            {display === 1 && (
              <>
                {followingError ? (
                    <button onClick={() => window.location.href = ("/follow/" + organization.idOrga)} className="button">
                        <span>Follow</span>
                    </button>
                    ) : following[organization.idOrga] === true ? (
                    <button onClick={(event) => unfollow(organization.idOrga)} className="button">
                        <span>Unfollow</span>
                    </button>
                    ) : (
                    <button onClick={(event) => follow(organization.idOrga)} className="button">
                        <span>Follow</span>
                    </button>
                )}

              </>
            )}
            {display === 2 && (
              <>
                <button onClick={() => window.location.href = ("/organization/edit/" + organization.idOrga)} className="button">
                  <span>Edit</span>
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationList;
