import React, { FC, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Context } from "../..";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className="loginFormBox">
      <div className="emailBox">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="passwordBox">
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="buttonBox">
        <button className="" onClick={() => store.login(email, password)}>
          Login
        </button>
        <button
          className=""
          onClick={() => store.registration(email, password)}
        >
          Registration
        </button>
        <Button variant="danger" onClick={() => store.logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
