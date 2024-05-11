import React, { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        {/*-- 左側のロゴとタイトル --*/}
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        {/*-- 右側のログインフォーム --*/}
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">ログインはこちら</p>
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button
              className="loginRegisterButton"
              onClick={handleRegisterRedirect}
            >
              アカウント作成
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
