import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ShowProfile from "../../components/Profile/Profile";
import Timeline from "../../components/Timeline/Timeline";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
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
          <ShowProfile />
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

export default Profile;
