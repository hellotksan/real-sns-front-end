import {
  Bookmark,
  Home,
  Notifications,
  MessageRounded,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import "./Sidebar.css";
import React, { useContext, useEffect, useState } from "react";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export default function Sidebar() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // ローカルで保存されたデータからusernameを取得
  const savedUser = localStorage.getItem("user");
  // JSON文字列をJavaScriptオブジェクトに変換
  const parsedUser = JSON.parse(savedUser);
  const savedUsername = parsedUser && parsedUser.username;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!savedUsername) {
        return;
      }

      try {
        const response = await axios.get(
          PUBLIC_FOLDER + `/api/users?username=${savedUsername}`
        );
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [savedUsername]);

  console.log(user);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          <li className="sidebarListItem">
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
          </li>
          <li className="sidebarListItem">
            <Person className="sidebarIcon" />
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Settings className="sidebarIcon" />
            <Link
              to={`/settings/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">設定</span>
            </Link>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <CloseFriend users={user} />
      </div>
    </div>
  );
}
