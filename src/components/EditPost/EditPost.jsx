import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

const EditPost = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user, isFetching, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const { username, postId } = useParams();
  const [post, setPost] = useState({});
  const [postDesc, setPostDesc] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/posts/${postId}`
        );
        setPost(response.data);
        setPostDesc(response.data.desc);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [postId, PUBLIC_FOLDER]);

  const handleEdit = async () => {
    try {
      if (user.username === username) {
        if (window.confirm("本当に更新してもよろしいですか？")) {
          await axios.put(`${PUBLIC_FOLDER}/api/posts/${post._id}`, {
            userId: user._id,
            desc: postDesc,
          });
          alert("更新しました。");
        } else {
          alert("更新をキャンセルしました。");
        }
      } else {
        alert("更新権限がありません。");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (user.username === username) {
        if (window.confirm("本当に削除してもよろしいですか？")) {
          await axios.delete(`${PUBLIC_FOLDER}/api/posts/${post._id}`, {
            data: {
              userId: user._id,
            },
          });
          alert("投稿が削除されました。");
          navigate("/");
          window.location.reload();
        } else {
          alert("削除をキャンセルしました。");
        }
      } else {
        alert("削除権限がありません。");
      }
    } catch (error) {
      console.error(error);
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
      </div>
    </div>
  );
};

export default EditPost;
