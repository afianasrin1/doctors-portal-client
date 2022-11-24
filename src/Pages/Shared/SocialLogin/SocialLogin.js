import React, { useState } from "react";
import { useContext } from "react";
import useToken from "../../../hooks/useToken";

import { AuthContext } from "../../../contexts/AuthProvider";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const [googleUserEmail, setGoogleUserEmail] = useState("");
  const [token] = useToken(googleUserEmail);
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setGoogleUserEmail(user?.email);
      })

      .catch((error) => console.error(error));
  };
  return (
    <div>
      <p className="text-center">
        <small>Social Login</small>
      </p>
      <p className="text-center">
        <button onClick={handleGoogleSignIn} className="btn btn-ghost">
          continueWithGoogle
        </button>
      </p>
    </div>
  );
};
export default SocialLogin;
