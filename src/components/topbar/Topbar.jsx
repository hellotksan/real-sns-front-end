import { Chat, Notifications, Search } from "@mui/icons-material";
import React, { useContext } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export default function Topbar() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");
    if (confirmLogout) {
      // ローカルストレージから"user"キーのデータを削除する
      localStorage.removeItem("user");
      window.location.reload();
    }
  };

  return (
    <div className="topbarContainer">
      {/* 左側にはロゴを表示する ------------------------------------------------------------------------------------------------------------*/}
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Real SNS</span>
        </Link>
      </div>
      {/* 真ん中には検索バーを表示する -------------------------------------------------------------------------------------------------------*/}
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchbar" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物は何ですか？"
          />
        </div>
      </div>
      {/* 右側にはチャット、通知のアイコンと、プロフィール画像を表示する ------------------------------------------------------------------------*/}
      <div className="topbarRight">
        <div className="topbarIconItems">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : PUBLIC_FOLDER + "/person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
          <button className="topbarLogout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
