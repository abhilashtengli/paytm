/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Base_URL } from "./utils/Constants";
import axios from "axios";
import { addUser } from "./utils/UserSlice";
import { useEffect } from "react";

const Body = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    if (user) return;
    try {
      const res = await axios.get(Base_URL + "/user", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/signin");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className=" min-h-screen w-full ">
      <div className="flex justify-center items-center bg-gray-200 ">
        <Link to="/dashboard">
          <h1 className="text-lg w-28 ml-10 font-bold  border-black">
            Paytm App
          </h1>
        </Link>
        <h1 className=" font-medium text-center w-full text-2xl py-2  border-black">
          Hello Welcome to the Paytm site
        </h1>
      </div>

      <Outlet />
    </div>
  );
};

export default Body;
