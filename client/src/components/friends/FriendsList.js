import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFriends } from "../../store/friends/friendsSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const FriendsList = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friends);
  const { user } = useSelector((state) => state.auth);

  // Fetch friends when the component mounts or user updates
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFriends(user.id)); // Call API to fetch friends based on user ID
    }
  }, [user, dispatch]); // Depend on 'user' and 'dispatch' to refetch when necessary

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Your Friends</h3>
      {friends && friends.length > 0 ? (
        <ul className="list-group">
          {friends.map((friend) => (
            <li key={friend.id} className="list-group-item">
              {friend.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="container mt-5">
          <div className="alert alert-warning text-center">
            <h4 className="alert-heading">It looks like you're flying solo!</h4>
            <p>
              You haven’t added any friends yet. Explore and connect with other
              users to build your network and make new connections.
            </p>
            <p className="mb-0">
              Start by searching for users or checking out friend
              recommendations.
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link className="btn btn-primary btn-lg" to="/home">
              Find and Connect with Friends
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsList;
