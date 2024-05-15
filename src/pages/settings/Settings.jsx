import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
// import Timeline from "../../components/Timeline/Timeline";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Settings.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Setting() {
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
            <div>
              <h4>{user.username}</h4>
              <span>{user.desc}</span>
              <button>編集</button>
              <button>ユーザの削除</button>
            </div>
          </div>
          {/* その他プロフィール ------------------------------------------------------------------------------------------------*/}
          <div className="profileRightBottom">
            {/* <Timeline username={username} /> */}
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
