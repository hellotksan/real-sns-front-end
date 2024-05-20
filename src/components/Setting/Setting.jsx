import axios from "axios";
import React, { useEffect, useState } from "react";

const EditProfile = ({ username, desc }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${username}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [username]);

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `${PUBLIC_FOLDER}/api/users/${user.id}`,
        {
          /* 編集するユーザーのデータ */
        }
      );
      console.log(response.data); // 成功時のメッセージなどをログに出力
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${PUBLIC_FOLDER}/api/users/${user.id}`,
        {
          data: {
            userId: user.id, // ユーザーIDをリクエストボディに含める
            isAdmin: true, // 管理者権限を持っている場合はtrueにする（必要に応じて）
          },
        }
      );
      console.log(response.data); // 成功時のメッセージなどをログに出力
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="profileRightTop">
      <h2>ユーザ設定</h2>
      <div>
        <h4>{username}</h4>
        <span>{desc}</span>
        <button onClick={handleEdit}>編集</button>
        <button onClick={handleDelete}>ユーザの削除</button>
      </div>
    </div>
  );
};

export default EditProfile;
