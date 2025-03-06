import { Outlet } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  return (
    <div className="container">
      <div className="auth">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
