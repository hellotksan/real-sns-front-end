import React, { useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ShowProfile from "../../components/Profile/Profile";
import Timeline from "../../components/Timeline/Timeline";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Profile.css";
import { AuthContext } from "../../state/AuthContext";
import { useParams } from "react-router-dom";

function Profile() {
  const { username: showingUsername } = useParams();
  const { user, isFetching, error } = useContext(AuthContext);

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
            <Timeline username={showingUsername} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
