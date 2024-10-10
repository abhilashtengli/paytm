import { Link, Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="bg-zinc-400 min-h-screen w-full ">
      <div className="flex justify-center items-center bg-gray-200 ">
        <Link to="/dashboard">
          <h1 className="text-lg px-10 font-bold ">Home</h1>
        </Link>
        <h1 className=" font-medium text-center w-full text-2xl py-2 ">
          Hello Welcome to the Paytm site
        </h1>
      </div>

      <Outlet />
    </div>
  );
};

export default Body;
