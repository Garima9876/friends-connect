import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../store/friends/friendsSlice";

const FriendsList = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friends);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchFriends(user.id));
    }
  }, [user, dispatch]);

  return (
    <div>
      <h3>Friends List</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
