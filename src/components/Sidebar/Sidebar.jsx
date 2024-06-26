import {
  // Bookmark,
  Home,
  // Notifications,
  // MessageRounded,
  Person,
  // Search,
  Settings,
} from "@mui/icons-material";
import "./Sidebar.css";
import React, { useContext } from "react";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

function Sidebar() {
  const { user, isFetching, error } = useContext(AuthContext);

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
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Home className="sidebarIcon" />
              <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">検索</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">通知</span>
          </li>
          <li className="sidebarListItem">
            <MessageRounded className="sidebarIcon" />
            <span className="sidebarListItemText">メッセージ</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">ブックマーク</span>
          </li> */}
          <li className="sidebarListItem">
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Person className="sidebarIcon" />
              <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link
              to={`/settings/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Settings className="sidebarIcon" />
              <span className="sidebarListItemText">設定</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link
              to={`/users`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Person className="sidebarIcon" />
              <span className="sidebarListItemText">全ユーザー</span>
            </Link>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <CloseFriend users={user} />
      </div>
    </div>
  );
}

export default Sidebar;
