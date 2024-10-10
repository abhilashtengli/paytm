import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex justify-center mt-16 ">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center font-bold text-3xl">
              Sign In
            </h2>
            <h2 className="text-center text-zinc-500 font-medium">
              Enter the credentials to access your account
            </h2>
            <div>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text font-medium">Email </span>
                </div>
                <input
                  type="text"
                  placeholder="jhon@example.com"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text font-medium">Password</span>
                </div>
                <form>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </form>
              </label>
            </div>
            {/* <p className="text-lg text-red-600">{error}</p> */}
            <div className="card-actions justify-center mt-5">
              <button className="w-full border py-2 bg-black text-white rounded-lg hover:bg-gray-900">
                Sign In
              </button>
            </div>
            <p className="m-auto cursor-pointer my-5  font-medium">
              Dont have a account ?
              <Link to="/signup">
                {" "}
                <span className="ml-1 underline hover:text-zinc-500">
                  Sin Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
