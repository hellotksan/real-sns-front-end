import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          PUBLIC_FOLDER + `/api/users?userId=${post.userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [post.userId]);

  // いいねボタンの処理
  const handleLike = async () => {
    try {
      await axios.put(PUBLIC_FOLDER + `/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        {/* 投稿したユーザーのプロフィールを表示 */}
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + "/images" + user.profilePicture
                    : PUBLIC_FOLDER + "/images/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <Link
              to={`/postedit/${user.username}/${post._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MoreVert />
            </Link>
          </div>
        </div>

        {/* 投稿した内容を表示する */}
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img
            src={PUBLIC_FOLDER + "/images/" + post.img}
            alt=""
            className="postImg"
          />
        </div>

        {/* 投稿記事のいいね数とコメント数を表示する */}
        <div className="postBottom">
          {/* いいね数の表示 */}
          <div className="postButtomLeft">
            <img
              src={PUBLIC_FOLDER + "/images/heart.png"}
              alt=""
              className="likeIcon"
              onClick={() => {
                handleLike();
              }}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました
            </span>
          </div>
          {/* コメント数の表示 */}
          <div className="postButtomRight">
            <span className="postCommentText">{post.comment}コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
}
