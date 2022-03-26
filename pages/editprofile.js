import Topbar from "../public/Topbar";
import SideBar from "../public/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/dist/client/router";

const defaultProfilePic =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";
const defaultCoverPic =
  "https://images.unsplash.com/photo-1520531158340-44015069e78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMGNpdHl8ZW58MHx8MHx8&w=1000&q=80";

const EditProfile = () => {
  const [user, setUser] = useState();
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [coverPic, setCoverPic] = useState(defaultCoverPic);

  const usernameRef = useRef();
  const emailRef = useRef();
  const descRef = useRef();
  const coverRef = useRef();
  const profileRef = useRef();

  const router = useRouter();

  const [message, setMessage] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
    setProfilePic(data.profilePicture);
    setCoverPic(data.coverPicture);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            userId: user._id,
            username: usernameRef.current.value || user.username,
            email: emailRef.current.value || user.email,
            desc: descRef.current.value || user.desc,
            coverPicture: coverRef.current.value || user.coverPicture,
            profilePicture: profileRef.current.value || user.profilePicture,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setMessage("Updated Succesfully");
      } else {
        setMessage(data);
      }
    } catch (err) {
      setMessage(data);
    }
  };

  return (
    <div className="w-full">
      <Topbar />
      <div className="w-full flex overflow-hidden">
        <SideBar />
        {user && (
          <div className="w-full m-3 p-3 rounded-md border flex space-x-2">
            <form onSubmit={handleSubmit} className="w-2/3 p-3 rounded-md ">
              {message && (
                <h3 className="text-center p-2 bg-gray-300 text-white">
                  {message}
                </h3>
              )}
              <div className="w-full py-4 border-b flex">
                <label className="flex-1" htmlFor="username">
                  Username
                </label>
                <input
                  ref={usernameRef}
                  defaultValue={user.username}
                  placeholder="Username"
                  className="border-2 rounded-md w-60 p-1 px-2"
                  type="text"
                  id="username"
                />
              </div>
              <div className="w-full py-4 border-b flex">
                <label className="flex-1" htmlFor="email">
                  Email
                </label>
                <input
                  ref={emailRef}
                  defaultValue={user.email}
                  placeholder="Email"
                  className="border-2 rounded-md w-60 p-1 px-2"
                  type="text"
                  id="email"
                />
              </div>
              <div className="w-full py-4 border-b flex">
                <label className="flex-1" htmlFor="desc">
                  Description
                </label>
                <textarea
                  ref={descRef}
                  defaultValue={user.desc}
                  placeholder="Description"
                  rows="5"
                  className="border-2 rounded-md w-60 p-1 px-2"
                  type="text"
                  id="desc"
                />
              </div>
              <div className="w-full py-4 border-b flex">
                <label className="flex-1" htmlFor="coverpic">
                  Cover Photo
                </label>
                <input
                  onChange={(e) => setCoverPic(e.target.value)}
                  ref={coverRef}
                  defaultValue={user.coverPicture}
                  placeholder="Paste the link here"
                  className="border-2 rounded-md w-60 p-1 px-2"
                  type="text"
                  id="coverpic"
                />
              </div>
              <div className="w-full py-4 border-b  flex">
                <label className="flex-1" htmlFor="profilepic">
                  Profile Photo
                </label>
                <input
                  onChange={(e) => setProfilePic(e.target.value)}
                  ref={profileRef}
                  defaultValue={user.profilePicture}
                  placeholder="Paste the link here"
                  className="border-2 rounded-md w-60 p-1 px-2"
                  type="text"
                  id="profilepic"
                />
              </div>
              <button
                type="submit"
                className="p-3 mx-auto tracking-widest border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold w-1/2 text-xl"
              >
                Edit Profile
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="p-3 mx-auto tracking-widest border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold w-1/2 text-xl"
              >
                Back to Profile
              </button>
            </form>
            {user && (
              <div className="w-1/3 m-3 rounded-md border">
                <div className="relative mb-[90px]">
                  <img
                    alt="coverPic"
                    className="object-cover w-full h-[180px]"
                    src={coverPic || defaultCoverPic}
                  />
                  <img
                    alt="profilePic"
                    className="object-cover border-4 border-white rounded-full w-[100px] h-[100px] translate-x-1/2 translate-y-1/2 absolute bottom-0 right-1/2"
                    src={profilePic || defaultProfilePic}
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <h1 className="text-xl mb-2 font-bold capitalize">
                    {user.username}
                  </h1>
                  <h1 className="text-md text-gray-400 lowercase">
                    {user.email}
                  </h1>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;

//jdubendj
