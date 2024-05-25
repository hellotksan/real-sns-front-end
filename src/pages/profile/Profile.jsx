import React, { useContext, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ShowProfile from "../../components/Profile/Profile";
import Timeline from "../../components/Timeline/Timeline";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Profile.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user, isFetching, error } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(PUBLIC_FOLDER + `/api/users?username=${user.username}`);
    };
    fetchUser();
  }, [user.username, PUBLIC_FOLDER]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          {/* ユーザのプロフィール */}
          <ShowProfile />
          {/* ユーザの投稿とその他プロフィール */}
          <div className="profileRightBottom">
            <Timeline username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
