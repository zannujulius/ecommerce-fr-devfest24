import { GoDownload } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { Avatar, Button, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center fixed top-0 !z-50 justify-center drop-shadow-md mx-auto bg-white">
      <div className="w-[80%] borde p-2 h-full  flex items-center justify-between">
        <div className="">
          <Input
            placeholder="Search anything here..."
            variant="borderless"
            prefix={<CiSearch size={20} className="text-gray-600" />}
          />
        </div>
        <div className="font-bold text-[18px]">
          Welcome to the Ecommerce App
        </div>
        <div className="flex items-center justify-center h-full border-gray-500">
          <div className="flex align-center">
            <div className="flex items-center justify-center">
              <div className="px-2 mx-1 cursor-pointer">
                <GoDownload size={20} className="text-gray-500" />
              </div>
              <div className="px-2 mx-1 cursor-pointer">
                <IoSettingsOutline size={20} className="text-gray-500" />
              </div>
              <div className="px-2 mx-1 cursor-pointer">
                <HiOutlineRocketLaunch size={20} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="border-l-[1px] p-2 flex items-center justify-center border-gray-200 h-full">
            <Avatar
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
              size={"default"}
              className=" cursor-pointer"
            >
              JK
            </Avatar>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="bg-black text-white ml-4"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
