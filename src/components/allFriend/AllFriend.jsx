import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import "./AllFriends.css";
import { Link } from "react-router-dom";

const AllFriend = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${PUBLIC_FOLDER}/api/users/all`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [PUBLIC_FOLDER]);

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
