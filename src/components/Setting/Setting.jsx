import React from "react";

const EditProfile = ({ username, desc }) => {
  return (
    <div className="profileRightTop">
      <div>
        <h4>{username}</h4>
        <span>{desc}</span>
        <button>編集</button>
        <button>ユーザの削除</button>
      </div>
    </div>
  );
};

export default EditProfile;
