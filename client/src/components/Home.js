import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriends,
  searchUsers,
  fetchRecommendedUsers,
  sendFriendRequest,
} from "../store/friends/friendsSlice";
import { fetchUserDetails } from "../store/auth/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const dispatch = useDispatch();
  const { searchResults, recommendedUsers } = useSelector(
    (state) => state.friends
  );
  const { user } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.friends);
  const [searchQuery, setSearchQuery] = useState("");
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setLoading(true);

        // Fetch user details and process sentFriendRequests
        const result = await dispatch(fetchUserDetails(user.id));
        if (fetchUserDetails.fulfilled.match(result)) {
          setSentFriendRequests(
            result.payload.sentFriendRequests.map((req) => req._id)
          );
        }

        // Fetch friends and recommended users
        dispatch(fetchFriends(user.id));
        dispatch(fetchRecommendedUsers(user.id));

        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && user?.id) {
      dispatch(searchUsers({ query: searchQuery, userId: user.id }));
    }
  };

  const handleSendRequest = async (friendId) => {
    try {
      await dispatch(sendFriendRequest({ userId: user.id, friendId }));

      // Refresh sentFriendRequests and lists
      const result = await dispatch(fetchUserDetails(user.id));
      if (fetchUserDetails.fulfilled.match(result)) {
        setSentFriendRequests(
          result.payload.sentFriendRequests.map((req) => req._id)
        );
      }
      // Refresh friends and recommended users
      dispatch(fetchFriends(user.id));
      dispatch(fetchRecommendedUsers(user.id));
    } catch (error) {
      console.error("Failed to send friend request:", error);
    }
  };

  const hasSentRequest = (friendId) => {
    return sentFriendRequests.includes(friendId);
  };

  const isFriend = (userId) => {
    return friends.friends.some((friend) => friend._id === userId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  {searchResults.map((resultUser, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={resultUser.id || index}
                    >
                      <span>
                        {resultUser.userName} ({resultUser.email})
                      </span>
                      <button
                        className={`btn btn-sm ${
                          hasSentRequest(resultUser._id) ||
                          isFriend(resultUser._id)
                            ? "btn-secondary"
                            : "btn-success"
                        }`}
                        disabled={
                          hasSentRequest(resultUser._id) ||
                          isFriend(resultUser._id)
                        }
                        onClick={() => handleSendRequest(resultUser._id)}
                      >
                        {hasSentRequest(resultUser._id) ||
                        isFriend(resultUser._id)
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
                    {recommendedUsers.map((recommendedUser, index) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={recommendedUser.id || index}
                      >
                        <span>
                          {recommendedUser.userName} ({recommendedUser.email})
                        </span>
                        <button
                          className={`btn btn-sm ${
                            hasSentRequest(recommendedUser._id) ||
                            isFriend(recommendedUser._id)
                              ? "btn-secondary"
                              : "btn-success"
                          }`}
                          disabled={
                            hasSentRequest(recommendedUser._id) ||
                            isFriend(recommendedUser._id)
                          }
                          onClick={() => handleSendRequest(recommendedUser._id)}
                        >
                          {hasSentRequest(recommendedUser._id) ||
                          isFriend(recommendedUser._id)
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
