import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = ({ username }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const navigate = useNavigate();
  const { postId } = useParams();

  const [user, setUser] = useState({});
  const [desc, setDesc] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [post, setPost] = useState({});
  const [postDesc, setPostDesc] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${username}`
        );
        setUser(response.data);
        setDesc(response.data.desc);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/posts/${postId}`
        );
        setPost(response.data);
        setPostDesc(response.data.desc);
        console.log(post);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPost();
  }, []);

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `${PUBLIC_FOLDER}/api/users/${user._id}`,
        {
          userId: user._id,
          desc: desc,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${PUBLIC_FOLDER}/api/users/${user._id}`,
        {
          data: {
            userId: user._id,
          },
        }
      );
      console.log(response.data);
      alert("ユーザが削除されました。");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    alert("ユーザ削除がキャンセルされました。");
  };

  return (
    <div className="profileRightTop">
      <h2>投稿設定</h2>
      <div>
        <div>ユーザ名：{user.username}</div>
        <div>投稿番号：{post._id}</div>
        <div>投稿時間：{post.updatedAt}</div>
        <div>いいね数：{post.likes.length}</div>
        <span>内容：</span>
        <input
          type="text"
          value={postDesc}
          onChange={(e) => setPostDesc(e.target.value)}
        />
        <div>
          <button onClick={handleEdit}>編集</button>
        </div>
        <div>
          <button onClick={handleDelete}>投稿削除</button>
        </div>
        {isConfirmOpen && (
          <div>
            <p>ユーザを削除してもよろしいですか？</p>
            <button onClick={confirmDelete}>削除</button>
            <button onClick={cancelDelete}>キャンセル</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
