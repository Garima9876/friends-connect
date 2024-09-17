import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../../store/friends/friendsSlice";
import { fetchUserDetails } from "../../store/auth/authSlice";

const FriendRequests = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [requests, setRequests] = useState([]);

  const fetchFriendRequests = useCallback(async () => {
    if (user?.id) {
      const result = await dispatch(fetchUserDetails(user.id));
      if (fetchUserDetails.fulfilled.match(result)) {
        setRequests(result.payload.friendRequests);
      }
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    fetchFriendRequests();
  }, [fetchFriendRequests]);

  const handleAccept = async (friendId) => {
    await dispatch(acceptFriendRequest({ userId: user.id, friendId }));
    fetchFriendRequests();
  };

  const handleDecline = async (friendId) => {
    await dispatch(declineFriendRequest({ userId: user.id, friendId }));
    fetchFriendRequests();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Friend Requests</h2>
      {requests.length > 0 ? (
        <ul className="list-group">
          {requests.map((req) => (
            <li
              key={req._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{req.userName}</h5>
                <p className="mb-1">{req.email}</p>
              </div>
              <button
                className="btn btn-success btn-sm ml-auto"
                onClick={() => handleAccept(req._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-danger btn-sm ml-4"
                onClick={() => handleDecline(req._id)}
              >
                Decline
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info" role="alert">
          No friend requests at the moment.
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
