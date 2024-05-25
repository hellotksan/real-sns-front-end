import React from "react";
import "./Rightbar.css";
import AllFriend from "../allFriend/AllFriend";
import Online from "../online/Online";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Rightbar({ user }) {
  // ホームページ用の右サイドバー
  const HomeRightbar = () => {
    return (
      <>
        {/* イベント情報に関するコンテナ */}
        <div className="eventContainer">
          <span className="eventText">
            <b>フォロワー限定</b>イベント開催中！
          </span>
        </div>

        {/* 全ユーザの表示 */}
        <AllFriend />
      </>
    );
  };

  // プロフィールページ用の右サイドバー
  const ProfileRightbar = () => {
    return (
      <>
        {/* ユーザに関する情報を表示する */}
        <h4 className="rightbarTitle">ユーザ情報</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">出身:</span>
            <span className="rightbarInfoKey">未設定</span>
          </div>
          <h4 className="rightbarTitle">あなたの友達</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <CloseFriend />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
