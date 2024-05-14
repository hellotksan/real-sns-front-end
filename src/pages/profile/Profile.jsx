import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Timeline from "../../components/Timeline/Timeline";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        PUBLIC_FOLDER + `/api/users?username=${username}`
      );
      setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          {/* ユーザのプロフィール -----------------------------------------------------------------------------------------------------------*/}
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PUBLIC_FOLDER + user.coverPicture
                    : PUBLIC_FOLDER + "/images/post/3.jpeg"
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/images/person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          {/* ユーザの投稿とその他プロフィール ------------------------------------------------------------------------------------------------*/}
          <div className="profileRightBottom">
            <Timeline username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
