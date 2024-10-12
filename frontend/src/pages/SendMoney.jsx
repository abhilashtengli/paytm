import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Base_URL } from "../utils/Constants";
import { useState } from "react";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [enterTheAmount, setEnterTheAmount] = useState(false);
  const [success, setSuccess] = useState(false);

  const transferMoney = async (amount, to) => {
    try {
      await axios.post(
        Base_URL + "/account/transfer",
        {
          amount,
          to,
        },
        { withCredentials: true }
      );
      setSuccess(true);
      setAmount(0);

      setTimeout(() => {
        setSuccess(false);
      }, 7000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const enterAmount = () => {
    setEnterTheAmount(true);
    setTimeout(() => {
      setEnterTheAmount(false);
    }, 3000);
  };

  return (
    <>
      <div className="grid place-content-center w-full h-screen bg-gray-200">
        <section className="border w-96 p-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center">Send Money</h1>
          <div className="flex items-center justify-center w-fit mt-8">
            <h1 className="border  w-14 h-14 text-white rounded-full grid place-content-center font-bold bg-green-500">
              {name?.charAt(0)}
            </h1>
            <h1 className="text-lg font-semibold w-fit ml-5">{name}</h1>
          </div>
          <h1 className="w-full text-lg mt-5">Amount (in rs)</h1>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full mt-5"
          />
          {enterTheAmount && (
            <p className=" mt-4 text-red-500 font-medium text-center">
              Please enter the Amount
            </p>
          )}
          {success && (
            <p className=" mt-4 text-green-500 font-medium text-center">
              Transaction successfull!
            </p>
          )}
          <button
            className="w-full border py-2 bg-green-500 mt-5 text-white rounded-lg hover:bg-green-400"
            onClick={() =>
              amount === 0 ? enterAmount() : transferMoney(amount, id)
            }
          >
            Initate transfer
          </button>
        </section>
      </div>
    </>
  );
};

export default SendMoney;
