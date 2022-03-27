import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faVideo,
  faBookmark,
  faBook,
  faUser,
  faTools,
  faWifi,
  faEdit,
  faHatCowboy,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/dist/client/link";

const SideBar = () => {
  return (
    <div className="w-2/5 max-h-screen border-r-2 overflow-y-scroll">
      <ul>
        <Link href="/" passHref>
          <li className="p-3 text-xl border-b border-gray-100">
              <FontAwesomeIcon icon={faWifi} className="text-sm mr-4" />
              Feed  
          </li>
        </Link>
        <Link href="/messages" passHref>
          <li className="p-3 text-xl border-b border-gray-100">
              <FontAwesomeIcon icon={faMessage} className="text-sm mr-4" />
              Chat
          </li>
        </Link>
        <Link href="/profile" passHref>
          <li className="p-3 text-xl border-b border-gray-100">
              <FontAwesomeIcon icon={faUser} className="text-sm mr-4" />
              Profile
          </li>
        </Link>
        <Link href="/editprofile" passHref>
          <li className="p-3 text-xl border-b border-gray-100">
            <FontAwesomeIcon icon={faEdit} className="text-sm mr-4" />
            Edit Profile
          </li>
        </Link>
        <Link href="/" passHref>
          <li className="p-3 text-xl border-b border-gray-100">
            <FontAwesomeIcon icon={faTools} className="text-sm mr-4" />
            Jobs
          </li>
        </Link>
        <Link href="/" passHref>
          <li className="p-3 text-xl border-b border-gray-100">
            <FontAwesomeIcon icon={faHatCowboy} className="text-sm mr-4" />
            Events
          </li>
        </Link>
        <Link href="/" passHref>
          <li className="p-3 text-xl border-b border-gray-100">
            <FontAwesomeIcon icon={faBook} className="text-sm mr-4" />
            Courses
          </li>
        </Link>
      </ul>
      <button className="p-3 tracking-widest border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold w-full text-xl">
        SHOW MORE
      </button>
    </div>
  );
};

export default SideBar;
