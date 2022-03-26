import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGifts,
  faArrowAltCircleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import todayMood from "./assets/mood-today.jpg";
import Image from "next/image";

const Rightbar = () => {
  return (
    <div className="w-2/5 p-2">
      <div className="flex space-x-2 text-sm border p-2 rounded-md">
        <FontAwesomeIcon className="text-2xl p-1" icon={faGifts} />
        <p>
          <strong>Pola Foster</strong> and <strong>3 others</strong> have a
          birthday today.
        </p>
      </div>
      <div className="relative my-2">
        <Image src={todayMood} alt="mood" className="rounded-xl" />
        <h2 className="absolute text-2xl font-serif text-white font-extrabold top-12 left-2">
          Live,
          <br />
          Love
          <br />& repeat.
        </h2>
        <p className="absolute bottom-4 right-4 font-bold text-white">
          explore more
          <FontAwesomeIcon className="ml-3" icon={faArrowRight} />
        </p>
      </div>
      <div>
        <h4 className="ml-2 underline my-3">Online Friends</h4>
        <ul>
          <li className="p-2 flex text-md border-b border-gray-100">
            <div className="relative mr-4">
              <img
                width="30"
                height="30"
                className="rounded-full border-2 border-black"
                alt="profile-pic"
                src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI="
              />
              <div className=" border-2 border-white bg-black h-[15px] w-[15px] absolute -top-1 -right-1 rounded-full"></div>
            </div>
            John Doe
          </li>
          <li className="p-2 flex text-md border-b border-gray-100">
            <div className="relative mr-4">
              <img
                width="30"
                height="30"
                className="rounded-full border-2 border-black"
                alt="profile-pic"
                src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI="
              />
              <div className=" border-2 border-white bg-black h-[15px] w-[15px] absolute -top-1 -right-1 rounded-full"></div>
            </div>
            John Doe
          </li>
          <li className="p-2 flex text-md border-b border-gray-100">
            <div className="relative mr-4">
              <img
                width="30"
                height="30"
                className="rounded-full border-2 border-black"
                alt="profile-pic"
                src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI="
              />
              <div className=" border-2 border-white bg-black h-[15px] w-[15px] absolute -top-1 -right-1 rounded-full"></div>
            </div>
            John Doe
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
