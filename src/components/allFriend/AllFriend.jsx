import React, { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import "./AllFriends.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

const AllFriend = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [users, setUsers] = useState([]);
  const { user: currentUser, isFetching, error } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${PUBLIC_FOLDER}/api/users/all`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [PUBLIC_FOLDER]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h4 className="rightbarTitle">全ユーザー</h4>
      <div className="rightbarFriendList">
        {users.map((user) => (
          <Link
            to={`/profile/${user.username}`}
            key={user._id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="rightbarFriend" key={user._id}>
              {user.profilePicture ? (
                <img
                  src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                  alt=""
                  className="rightbarProfileImg"
                />
              ) : (
                <PersonIcon className="rightbarProfileImg" />
              )}
              <span className="rightbarUsername">{user.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllFriend;
