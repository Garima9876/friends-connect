import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriends,
  searchUsers,
  fetchRecommendedUsers,
  sendFriendRequest,
} from "../store/friends/friendsSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const dispatch = useDispatch();
  const { searchResults, recommendedUsers, friends, friendRequests } = useSelector(
    (state) => state.friends
  );
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(fetchFriends(user.id));
      dispatch(fetchRecommendedUsers(user.id)); // Fetch recommended users on component mount
    }
  }, [user, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchUsers(searchQuery));
    }
  };

  const handleSendRequest = (friendEmail) => {
    dispatch(sendFriendRequest(friendEmail));
  };

  const hasSentRequest = (email) => {
    return friendRequests.some(request => request.email === email);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {user?.userName}</h2>

      <div className="row">
        {/* Search Users Section */}
        <div className="col-md-6">
          <p className="lead mb-4">
            Discover new friends and enhance your network by connecting with
            people around you.
          </p>
          <div className="mb-4">
            <h4>Search New Friends</h4>
            <form onSubmit={handleSearch} className="form-inline">
              <div className="input-group w-75">
                <input
                  type="text"
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by username or email"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                </div>
              </div>
            </form>
            {searchResults.length > 0 && (
              <div className="mt-3">
                <h5>Search Results:</h5>
                <ul className="list-group">
                  {searchResults.map((user) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={user._id}
                    >
                      <span>
                        {user.userName} ({user.email})
                      </span>
                      <button
                        className={`btn btn-sm ${
                          hasSentRequest(user.email)
                            ? "btn-secondary"
                            : "btn-success"
                        }`}
                        disabled={hasSentRequest(user.email)}
                        onClick={() => handleSendRequest(user.email)}
                      >
                        {hasSentRequest(user.email)
                          ? "Already Sent"
                          : "Send Request"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Users Section */}
        <div className="col-md-6">
          <div className="mb-4">
            <h4>People you might know or like</h4>
            <div className="card">
              <div className="card-body">
                {recommendedUsers.length > 0 ? (
                  <ul className="list-group">
                    {recommendedUsers.map((user) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={user._id}
                      >
                        <span>
                          {user.userName} ({user.email})
                        </span>
                        <button
                          className={`btn btn-sm ${
                            hasSentRequest(user.email)
                              ? "btn-secondary"
                              : "btn-success"
                          }`}
                          disabled={hasSentRequest(user.email)}
                          onClick={() => handleSendRequest(user.email)}
                        >
                          {hasSentRequest(user.email)
                            ? "Already Sent"
                            : "Send Request"}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No recommendations available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
