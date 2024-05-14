import React from "react";
import "./Rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // ホームページ用の右サイドバー
  const HomeRightbar = () => {
    return (
      <>
        {/* イベント情報に関するコンテナ */}
        <div className="eventContainer">
          {/* <img src="assets/star.png" alt="" className="starImg" /> */}
          <span className="eventText">
            <b> フォロワー限定</b>イベント開催中！
          </span>
        </div>
        {/* <img src="assets/event.jpeg" alt="" className="eventImg" /> */}
        {/* オンライン中のユーザの表示 */}
        <h4 className="rightbarTitle">オンラインの友達</h4>
        {/* <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online user={user} key={user.id} />
          ))}
        </ul> */}
        {/* プロモーション広告の表示 */}
        <p className="promotionTitle">プロモーション広告</p>
        {/* <img
          src="assets/promotion/promotion1.jpeg"
          alt=""
          className="rightbarPromotionImg"
        /> */}
        <p className="promotionName">ショッピング</p>
        {/* <img
          src="assets/promotion/promotion2.jpeg"
          alt=""
          className="rightbarPromotionImg"
        /> */}
        <p className="promotionName">カーショッピング</p>
        {/* <img
          src="assets/promotion/promotion3.jpeg"
          alt=""
          className="rightbarPromotionImg"
        /> */}
        <p className="promotionName">ビジネス</p>
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
              {/* <img
                src={PUBLIC_FOLDER + "/images/person/1.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              /> */}
              <span className="rightbarFollowingName">John Doe</span>
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
