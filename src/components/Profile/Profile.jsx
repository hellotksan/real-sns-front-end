import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../state/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";

function ShowProfile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { username } = useParams();
  const { user, isFetching, error } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showingUser, setShowingUser] = useState({});

  useEffect(() => {
    const fetchShowingUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${username}`
        );
        setShowingUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShowingUser();
  }, [username, PUBLIC_FOLDER]);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (user && user.followings) {
        try {
          for (const id of user.followings) {
            const response = await axios.get(
              `${PUBLIC_FOLDER}/api/users/${id}`
            );
            const data = await response.data;

            if (data.username === username) {
              setIsFollowing(true);
              break;
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    checkFollowingStatus();
  }, [user, username, PUBLIC_FOLDER]);

  const handleFollow = async () => {
    try {
      await axios.put(PUBLIC_FOLDER + `/api/users/${showingUser._id}/follow`, {
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    try {
      await axios.put(
        `${PUBLIC_FOLDER}/api/users/${showingUser._id}/unfollow`,
        {
          userId: user._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setIsFollowing(false);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="profileRightTop">
      <div className="profileCover">
        {/* <img
          src={
            user.coverPicture
              ? PUBLIC_FOLDER + "/images" + user.coverPicture
              : PUBLIC_FOLDER + "/images/post/3.jpeg"
          }
          alt=""
          className="profileCoverImg"
        /> */}
        {showingUser.profilePicture ? (
          <img
            src={`${PUBLIC_FOLDER}/images/${showingUser.profilePicture}`}
            alt=""
            className="profileUserImg"
          />
        ) : (
          <PersonIcon className="profileUserImg" />
        )}
      </div>
      <div className="profileInfo">
        <h4 className="profileInfoName">{showingUser.username}</h4>
        <span className="profileInfoDesc">{showingUser.desc}</span>
        {username !== user.username &&
          (isFollowing ? (
            <button className="followButton unfollow" onClick={handleUnfollow}>
              Unfollow
            </button>
          ) : (
            <button className="followButton follow" onClick={handleFollow}>
              Follow
            </button>
          ))}
      </div>
    </div>
  );
}

export default ShowProfile;
