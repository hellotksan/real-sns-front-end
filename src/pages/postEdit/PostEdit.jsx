import React, { useContext, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import EditPost from "../../components/EditPost/EditPost";
import "./PostEdit.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

function PostEdit() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user, isFetching, error } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get(`${PUBLIC_FOLDER}/api/users?username=${user.username}`);
      } catch (error) {
        console.log(error);
      }
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
          <EditPost />
        </div>
      </div>
    </>
  );
}

export default PostEdit;
