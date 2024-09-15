import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendFriendRequest,
  acceptFriendRequest,
} from "../../store/friends/friendsSlice";

const FriendRequests = () => {
  const dispatch = useDispatch();
  const { friendRequests } = useSelector((state) => state.friends);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch friend requests logic
  }, [dispatch]);

  const handleAccept = (friendId) => {
    dispatch(acceptFriendRequest({ userId: user.id, friendId }));
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map((req) => (
          <li key={req.id}>
            {req.userName}
            <button onClick={() => handleAccept(req.id)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
