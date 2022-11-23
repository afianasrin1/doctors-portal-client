import React, { useContext } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const ErrorPage = () => {
  const error = useRouteError();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex items-center h-screen p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-12">
        <h1 className="text-red-900 text-xl font-bold mb-10">
          Sorry, an unexpected error has occurred.
        </h1>
        <p className="text-red-600 text-4xl mb-10">
          <i>{error.statusText || error.message}</i>
        </p>
        {/* <p>
          please <button onClick={handleLogOut}>Sign out</button>
        </p> */}
        <div className="max-w-md text-center mb-10">
          <Link
            to="/login"
            className="px-8 py-3 font-semibold rounded bg-white-200 text-gray-900"
          >
            <button
              onClick={handleLogOut}
              className="btn btn-error hover:btn-success text-3xl"
            >
              Sign out &
              <span className="font-normal text-sm lowercase">
                {" "}
                back to login page
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
