import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import EditPost from "../../components/EditPost/EditPost";
import "./PostEdit.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostEdit() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          PUBLIC_FOLDER + `/api/users?username=${username}`
        );
        setUser(response.data);
        console.log("Success fetching user data!", user);
      } catch (error) {
        console.log("Error fetching user data.", error);
      }
    };
    fetchUser();
  }, [username, PUBLIC_FOLDER]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <EditPost username={username} />
        </div>
      </div>
    </>
  );
}

export default PostEdit;
