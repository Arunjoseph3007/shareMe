import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faVideo,
  faBookmark,
  faBook,
  faUserGroup,
  faTools,
  faWifi,
  faQuestion,
  faHatCowboy,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  return (
    <div className="w-2/5 max-h-screen border-r-2 overflow-y-scroll">
      <ul>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faWifi} className="text-sm mr-4" />
          Feed
        </li>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faMessage} className="text-sm mr-4" />
          Chat
        </li>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faVideo} className="text-sm mr-4" />
          Video
        </li>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faUserGroup} className="text-sm mr-4" />
          Groups
        </li>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faBookmark} className="text-sm mr-4" />
          BookMarks
        </li>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faQuestion} className="text-sm mr-4" />
          Questions
        </li>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faTools} className="text-sm mr-4" />
          Jobs
        </li>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faHatCowboy} className="text-sm mr-4" />
          Events
        </li>
        <li className="p-3 text-xl border-b border-gray-100">
          <FontAwesomeIcon icon={faBook} className="text-sm mr-4" />
          Courses
        </li>
      </ul>
      <button className="p-3 tracking-widest border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold w-full text-xl">
        SHOW MORE
      </button>
    </div>
  );
};

export default SideBar;
