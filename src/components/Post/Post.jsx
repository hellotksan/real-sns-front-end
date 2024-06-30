import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser, isFetching, error } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          PUBLIC_FOLDER + `/api/users?userId=${post.userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [post.userId, PUBLIC_FOLDER]);

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

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="post">
      <div className="postWrapper">
        {/* 投稿したユーザーのプロフィールを表示 */}
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {user.profilePicture ? (
                <img
                  src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                  alt=""
                  className="postProfileImg"
                />
              ) : (
                <PersonIcon className="postProfileImg" />
              )}
              <span className="postUsername">{user.username}</span>
            </Link>
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
            <FavoriteIcon
              className="likeIcon"
              style={{ color: "red" }}
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

export default Post;
