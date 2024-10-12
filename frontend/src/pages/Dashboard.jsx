/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Base_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAllUsers } from "../utils/bulkUserSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const navigate = useNavigate();

  const getBalance = async () => {
    try {
      const res = await axios.get(Base_URL + "/account/balance", {
        withCredentials: true,
      });
      const formattedBalance = parseFloat(res.data.balance).toFixed(2);
      setBalance(formattedBalance);
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  const getUsers = async () => {
    const res = await axios.get(Base_URL + "/bulk?filter=" + filter, {
      withCredentials: true,
    });
    dispatch(addAllUsers(res.data.user));
  };

  useEffect(() => {
    getBalance();
    getUsers();
  }, []);

  const filteredUsers = allUsers
    ? allUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
          user.lastName.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="pt-16 px-24 ">
        <h1 className="w-full text-2xl font-bold ">
          {"Your balance : " + balance}
        </h1>
        <div>
          <h1 className="w-full text-2xl font-bold mt-5">Users</h1>
          <input
            type="text"
            placeholder="Search users"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input input-bordered w-full mt-5"
          />
        </div>
        <div className="py-4">
          {filteredUsers &&
            filteredUsers.map((user) => (
              <section
                className="flex justify-between items-center my-4"
                key={user._id}
              >
                <div className="flex items-center justify-center w-fit">
                  <h1 className="border  w-14 h-14 rounded-full grid place-content-center font-bold bg-gray-300">
                    {user.firstName.charAt(0)}
                  </h1>
                  <h1 className="text-lg font-semibold w-fit ml-5">
                    {user.firstName + " " + user.lastName.toLowerCase()}
                  </h1>
                </div>
                <button
                  className="py-2 border px-5 bg-gray-800 text-white rounded-lg"
                  onClick={() => {
                    navigate(
                      "/send?id=" + user._id + "&name=" + user.firstName
                    );
                  }}
                >
                  Send Money
                </button>
              </section>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
