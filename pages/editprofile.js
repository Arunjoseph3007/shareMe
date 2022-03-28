import Topbar from "../public/Topbar";
import SideBar from "../public/Sidebar";
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
  const [profilePic, setProfilePic] = useState();
  const [coverPic, setCoverPic] = useState();
  const [profileImageURL, setProfileImageURL] = useState()
  const [coverImageURL, setCoverImageURL] = useState()

  const usernameRef = useRef();
  const emailRef = useRef();
  const descRef = useRef();

  const router = useRouter();

  const [message, setMessage] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
    setProfileImageURL(data.profilePicture);
    setCoverImageURL(data.coverPicture);
  }, []);

  // useEffect(()=>{
  //   if(!profilePic) return;

  //   setProfileImageURL(URL.createObjectURL(profilePic))
  // },[profilePic])

  // useEffect(()=>{
  //   if(!coverPic) return;

  //   setCoverImageURL(URL.createObjectURL(coverPic))
  // },[coverPic])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Updating Profile...")

    try {
      if(profilePic){
        const profileFormData = new FormData();
        profileFormData.append("file", profilePic);
        profileFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const profileImgResponse = await fetch( process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
            method: "POST",
            body: profileFormData,
          });
        const profileImgData = await profileImgResponse.json();
        setProfileImageURL(profileImgData.url);
      }

      if(coverPic){
        const coverFormData = new FormData();
        coverFormData.append("file", coverPic);
        coverFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const coverImgResponse = await fetch( process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
            method: "POST",
            body: coverFormData,
          });
        const coverImgData = await coverImgResponse.json();
        setCoverImageURL(coverImgData.url);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            userId: user._id,
            username: usernameRef.current.value || user.username,
            email: emailRef.current.value || user.email,
            desc: descRef.current.value || user.desc,
            coverPicture: coverImageURL || user.coverPicture,
            profilePicture: profileImageURL || user.profilePicture,
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
      setMessage(err);
    }
  };

  return (
    <div className="w-full">
      <Topbar />
      <div className="w-full flex overflow-hidden">
        <SideBar />
        {user && (
          <div className="w-full p-1 rounded-md border flex space-x-2">
            <form onSubmit={handleSubmit} className="w-full p-3 rounded-md ">
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
                <h2 className="flex-1" >
                  Cover Photo
                </h2>
                <label htmlFor="coverpic" className="px-8 py-1 rounded-full tracking-wide border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold text-xl">
                  Upload
                </label>
                <input
                  onChange={(e) => setCoverPic(e.target.files[0])}
                  style={{display: "none"}}
                  type="file"
                  id="coverpic"
                />
              </div>
              <div className="w-full py-4 border-b  flex">
                <h2 className="flex-1">
                  Profile Photo
                </h2>
                <label htmlFor="profilepic" className="px-8 py-1 rounded-full tracking-wide border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold text-xl">
                  Upload
                </label>
                <input
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  style={{display: "none"}}
                  type="file"
                  id="profilepic"
                />
              </div>
              <button
                type="submit"
                className="p-3 mx-auto tracking-widest border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold w-1/2 text-xl"
              >
                Edit
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="p-3 mx-auto tracking-widest border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold w-1/2 text-xl"
              >
                Back
              </button>
            </form>
            {user && (
              <div className="w-1/3 m-3 rounded-md border hidden lg:block">
                <div className="relative mb-[90px]">
                  <img
                    alt="coverPic"
                    className="object-cover w-full h-[180px]"
                    src={coverImageURL || defaultCoverPic}
                  />
                  <img
                    alt="profilePic"
                    className="object-cover border-4 border-white rounded-full w-[100px] h-[100px] translate-x-1/2 translate-y-1/2 absolute bottom-0 right-1/2"
                    src={ profileImageURL || defaultProfilePic}
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
