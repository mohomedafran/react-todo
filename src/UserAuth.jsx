import React, { use, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const UserAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState("login");

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            navigate("/todo");
        }
    })
  })

  const handleAuth = (e) => {
    e.preventDefault();
    if (authType === "login") {
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/todo");
      })
      .catch((error) => {
        alert(error.message);
      })
    } else if (authType === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/todo");
      })
      .catch((error) => {
        alert(error.message);
      })
    } else {
      console.error("Unknown authentication type");
    }
  };

  return (
    <div className="w-[100%] h-[100vh] bg-bg py-[5rem] flex items-center justify-center">
      <div className="w-[85%] lg:w-[70%] max-w-[400px] h-max py-12 px-8 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-primary">
          {authType === "login" ? "Login" : "Sign Up"} for React Todo
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border-2 border-secondary rounded-lg py-2 px-4 text-lg text-primary focus:shadow-md focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border-2 border-secondary rounded-lg py-2 px-4 text-lg text-primary focus:shadow-md focus:outline-none focus:border-primary"
          />

          <button
            className="bg-primary w-[70%] text-white py-2 px-4 rounded-lg hover:bg-secondary transition duration-200 mx-auto mt-4 cursor-pointer"
            onClick={handleAuth}
          >
            {authType === "login" ? "Login" : "Sign Up"}
          </button>
          <p className="text-center">
            {authType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              onClick={() => {
                setAuthType(authType === "login" ? "signup" : "login");
              }}
              className="text-primary cursor-pointer"
            >
              {authType === "login" ? " Sign Up" : " Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
