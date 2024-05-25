import { Chat, Notifications, Search } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import React, { useContext, useEffect, useState } from "react";
import "./Topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export default function Topbar() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");
    if (confirmLogout) {
      try {
        // ローカルストレージから"user"キーのデータを削除する
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="topbarContainer">
      {/* 左側にはロゴを表示する */}
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Real SNS</span>
        </Link>
      </div>
      {/* 真ん中には検索バーを表示する */}
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
      {/* 右側にはチャット、通知のアイコンと、プロフィール画像を表示する */}
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
                user.profilePicture ? (
                  PUBLIC_FOLDER + "/images" + user.profilePicture
                ) : (
                  // : PUBLIC_FOLDER + "/images/person/noAvatar.png"
                  <PersonIcon />
                )
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
