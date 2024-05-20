import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

const EditPost = ({}) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, isFetching, error } = useContext(AuthContext);

  const navigate = useNavigate();
  const { username, postId } = useParams();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [post, setPost] = useState({});
  const [postDesc, setPostDesc] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${username}`
        );
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
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPost();
  }, []);

  const handleEdit = async () => {
    try {
      if (user.username == username) {
        const response = await axios.put(
          `${PUBLIC_FOLDER}/api/posts/${post._id}`,
          {
            userId: user._id,
            desc: postDesc,
          }
        );
      } else {
        alert("編集権限がありません。");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (user.username == username) {
        const response = await axios.delete(
          `${PUBLIC_FOLDER}/api/posts/${post._id}`,
          {
            data: {
              userId: user._id,
            },
          }
        );
        alert("投稿が削除されました。");
        localStorage.clear();
        navigate("/");
      } else {
        alert("削除権限がありません。");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    alert("投稿削除がキャンセルされました。");
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="profileRightTop">
      <h2>投稿設定</h2>
      <div>
        <div>投稿者名：{user.username}</div>
        <div>投稿番号：{post._id}</div>
        <div>投稿時間：{post.updatedAt}</div>
        <div>いいね数：{post.likes ? post.likes.length : "N/A"}</div>
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
            <p>投稿を削除してもよろしいですか？</p>
            <button onClick={confirmDelete}>削除</button>
            <button onClick={cancelDelete}>キャンセル</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
