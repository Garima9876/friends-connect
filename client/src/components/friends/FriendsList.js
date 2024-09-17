import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFriends, removeFriend } from "../../store/friends/friendsSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const FriendsList = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friends);
  const { user } = useSelector((state) => state.auth);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFriends(user.id));
    }
  }, [dispatch, user?.id]);

  const handleUnfriend = async () => {
    if (user?.id && selectedFriendId) {
      await dispatch(removeFriend({ userId: user.id, friendId: selectedFriendId }));
      dispatch(fetchFriends(user.id));
      setShowModal(false);
    }
  };

  const openModal = (friendId) => {
    setSelectedFriendId(friendId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Safe check for friends array
  const friendsList = friends?.friends || [];

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Your Friends</h3>
      {friendsList.length > 0 ? (
        <ul className="list-group">
          {friendsList.map((friend, index) => (
            <li key={friend._id || index} className="list-group-item">
              <span>
                {friend.userName} ({friend.email})
              </span>
              <button
                className="btn btn-danger btn-sm float-end"
                onClick={() => openModal(friend._id)}
              >
                Unfriend
              </button>
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

      {/* Bootstrap Modal for confirmation */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Unfriend</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="modal-body">
              Are you sure you want to unfriend this user?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleUnfriend}
              >
                Unfriend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
