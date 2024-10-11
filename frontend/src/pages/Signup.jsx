/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        Base_URL + "/signup",
        {
          firstName,
          lastName,
          password,
          userName,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-5 ">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center font-bold text-3xl">
              Sign Up
            </h2>
            <h2 className="text-center text-zinc-500 font-medium">
              Enter your information to create an account
            </h2>
            <div>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text font-medium">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Jhon"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text font-medium">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Ban"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>{" "}
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text font-medium">Email Id</span>
                </div>
                <input
                  type="text"
                  placeholder="jhon@example.com"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
              <button
                className="w-full border py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                onClick={() => handleSignup()}
              >
                Sign Up
              </button>
            </div>
            <p className="m-auto cursor-pointer my-5  font-medium">
              Already have a account ?
              <Link to="/signin">
                {" "}
                <span className="ml-1 underline hover:text-zinc-500">
                  Sign In
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
