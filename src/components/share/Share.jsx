import React, { useContext, useRef } from "react";
import "./Share.css";
import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

function Share({ toHome = false, username }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user, isFetching, error } = useContext(AuthContext);
  const desc = useRef();
  // const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // if (file) {
    //   const data = new FormData();
    //   const fileName = Date.now() + file.name;
    //   data.append("name", fileName);
    //   data.append("file", file);
    //   newPost.img = fileName;

    //   try {
    //     // 画像APIをたたく
    //     await axios.post("/upload", data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    try {
      await axios.post(PUBLIC_FOLDER + "/api/posts/", newPost);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  if (!toHome && username !== user.username) {
    return <div>You only post with your account.</div>;
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          {user.profilePicture ? (
            <img
              src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
              alt=""
              className="shareProfileImg"
            />
          ) : (
            <PersonIcon className="shareProfileImg" />
          )}
          <textarea
            className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-vertical"
            placeholder="今何してるの？"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
              {/* <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              /> */}
            </label>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
