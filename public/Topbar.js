import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleArrows,
  faSearch,
  faVideo,
  faMessage,
  faUser,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

const Topbar = () => {
  const router = useRouter();
  const [modal, setModal] = useState();
  const [username, setUsername] = useState();
  const [profilePic, setProfilePic] = useState();
  const [query, setQuery] = useState();

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("user"))?.username);
    setProfilePic(JSON.parse(localStorage.getItem("user"))?.profilePicture);
  }, []);

  const handleSignOut = () => {
    window.localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="w-full h-[10vh] items-center flex shadow-md p-5 relative">
      <Link href="/" passHref>
        <h1 className="text-xl hidden lg:block cursor-pointer font-bold w-1/4 text-bold uppercase">
          s h a r e <span className="text-gray-500">M e</span>
        </h1>
      </Link>
      <Link href="/" passHref>
        <img
          src="https://1000logos.net/wp-content/uploads/2017/06/Font-Skype-Logo.jpg"
          alt="logo"
          className="lg:hidden w-[40px] mr-2"
        />
      </Link>
      <div className="flex w-full space-x-2 items-center">
        <Link href={{ pathname: "/search", query: { name: query } }} passHref>
          <div>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </Link>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className="p-2 w-5/6 rounded-xl text-xl outline-none"
        ></input>
      </div>
      <div className=" items-center hidden md:flex space-x-6 mr-4">
        <Link href="/explore" passHref>
          <div className="flex cursor-pointer">
            <FontAwesomeIcon className="text-xl mr-2" icon={faPeopleArrows} />
            <h3>Explore</h3>
          </div>
        </Link>
        <Link href="/messages" passHref>
          <div className="flex cursor-pointer">
            <FontAwesomeIcon className="text-xl mr-2" icon={faMessage} />
            <h3>Chat</h3>
          </div>
        </Link>
        <Link href="/" passHref>
          <h3 className="capitalize">{username}</h3>
        </Link>
      </div>
      <div>
        <img
          onClick={() => setModal(!modal)}
          width="60"
          height="60"
          className="rounded-full object-cover border-2 border-black cursor-pointer"
          alt="profile-pic"
          src={profilePic}
        />
        {modal && (
          <div className="absolute z-[999] shadow-2xl bg-white p-4 rounded-md w-full md:w-[300px] right-0 border-3 shadow top-[10vh]">
            <Link href="/messages">
              <a className="p-2 mb-2 border-b block">
                <FontAwesomeIcon icon={faMessage} /> Chat
              </a>
            </Link>
            <Link href="/explore">
              <a className="p-2 my-2 border-b block">
                <FontAwesomeIcon icon={faPeopleArrows} /> Explore
              </a>
            </Link>
            <Link href="/profile">
              <a className="p-2 my-2 border-b block">
                <FontAwesomeIcon icon={faUser} /> Profile
              </a>
            </Link>
            <Link href="/editprofile">
              <a className="p-2 my-2 border-b block">
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </a>
            </Link>
            <Link href="/videocalls">
              <a className="p-2 my-2 border-b block">
                <FontAwesomeIcon icon={faVideo} /> Video Calls
              </a>
            </Link>
            <button
              onClick={handleSignOut}
              className="px-8 py-1 rounded-full tracking-wide border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold text-xl"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
