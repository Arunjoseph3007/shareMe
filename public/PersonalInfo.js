import Image from "next/image";
import firstpost from "./assets/first-post.jpg";

const PersonalInfo = () => {
  return (
    <div className="w-2/5 p-3 pl-0">
      <div className=" my-3 rounded-md p-3 border">
        <h2 className="font-bold mb-3">User Information</h2>
        <p>
          <span>City:</span> France
        </p>
        <p>
          <span>From:</span> Madrid
        </p>
        <p>
          <span>Relationship:</span> Single
        </p>
      </div>
      <div className=" rounded-md p-2 border">
        <h2 className="font-bold mb-3 ">User Friends</h2>
        <div className="flex flex-wrap items-center justify-between ">
          <div className="w-1/2 p-1">
            <Image src={firstpost} alt="friend" />
            <p className="text-ssm">Sarah Ismail</p>
          </div>
          <div className="w-1/2 p-1">
            <Image src={firstpost} alt="friend" />
            <p className="text-ssm">Sarah Ismail</p>
          </div>
          <div className="w-1/2 p-1">
            <Image src={firstpost} alt="friend" />
            <p className="text-ssm">Sarah Ismail</p>
          </div>
          <div className="w-1/2 p-1">
            <Image src={firstpost} alt="friend" />
            <p className="text-ssm">Sarah Ismail</p>
          </div>
          <div className="w-1/2 p-1">
            <Image src={firstpost} alt="friend" />
            <p className="text-ssm">Sarah Ismail</p>
          </div>
          <div className="w-1/2 p-1">
            <Image src={firstpost} alt="friend" />
            <p className="text-ssm">Sarah Ismail</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
