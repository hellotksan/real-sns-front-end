import React, { useRef } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // パスワードと確認用の確認用のパスワードがあっているかどうか確認
    if (password.current.value != passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        // registerAPIをたたく
        await axios.post(
          "https://real-sns-back-end.onrender.com/api/auth/register",
          user
        );
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert(
            "このメールアドレスは既に登録されています。別のメールアドレスをお試しください。"
          );
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">新規登録はこちら</p>
            <input
              type="text"
              className="loginInput"
              placeholder="ユーザ名"
              required
              ref={username}
            />
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
            <input
              type="password"
              className="loginInput"
              placeholder="確認用パスワード"
              required
              minLength="6"
              ref={passwordConfirmation}
            />
            <button className="loginButton" type="submit">
              サインアップ
            </button>
            <button
              className="loginRegisterButton"
              onClick={handleLoginRedirect}
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
