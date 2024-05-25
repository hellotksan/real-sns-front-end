import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
import "./Setting.css";

const EditProfile = ({ username }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user, isFetching, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${username}`
        );
        setDesc(response.data.desc);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [username, PUBLIC_FOLDER]);

  const handleEdit = async () => {
    try {
      if (user.username === username) {
        if (window.confirm("本当に変更してもよろしいですか？")) {
          await axios.put(`${PUBLIC_FOLDER}/api/users/${user._id}`, {
            userId: user._id,
            desc: desc,
          });
          alert("ユーザ情報を更新しました");
        } else {
          alert("変更をキャンセルしました。");
        }
      } else {
        alert("編集権限がありません");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (user.username === username) {
        if (window.confirm("本当に削除してもよろしいですか？")) {
          await axios.delete(`${PUBLIC_FOLDER}/api/users/${user._id}`, {
            data: {
              userId: user._id,
            },
          });
          alert("ユーザを削除しました。");
          localStorage.clear();
          navigate("/login");
          window.location.reload();
        } else {
          alert("ユーザ削除をキャンセルしました");
        }
      } else {
        alert("削除権限がありません。");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="profileRightTop">
      <h2>ユーザ設定</h2>
      <div>
        <h4>ユーザ名：{user.username}</h4>
        <span>ユーザ情報：</span>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div>
          <button onClick={handleEdit}>編集</button>
        </div>
        <div>
          <button onClick={handleDelete}>ユーザ削除</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
