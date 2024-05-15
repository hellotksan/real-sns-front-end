import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import EditProfile from "../../components/Setting/Setting";
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
          {/* ユーザのプロフィール */}
          <EditProfile username={user.username} desc={user.desc} />
        </div>
      </div>
    </>
  );
}
