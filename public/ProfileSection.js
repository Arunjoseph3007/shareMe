import Feed from "./Feed";
import PersonalInfo from "./PersonalInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const defaultProfilePic =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";
const defaultCoverPic =
  "https://images.unsplash.com/photo-1520531158340-44015069e78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMGNpdHl8ZW58MHx8MHx8&w=1000&q=80";

const ProflieSection = ({ user }) => {
  const [thisUser, setThisUser] = useState();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user._id}/follow`,
        {
          method: "PUT",
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setThisUser(data);
    setIsFollowing(data.following.includes(user._id));
  }, []);

  return (
    <div className="w-full">
      <div className="relative mb-[90px]">
        <img
          alt="coverPic"
          className="object-cover w-full h-[250px]"
          src={user.coverPicture || defaultCoverPic}
        />
        <img
          alt="profilePic"
          className="object-cover border-4 border-white rounded-full w-[150px] h-[150px] translate-x-1/2 translate-y-1/2 absolute bottom-0 right-1/2"
          src={user.profilePicture || defaultProfilePic}
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="font-bold capitalize text-2xl">{user.username}</h2>
        <p className="text-gray-400">{user.desc || "Hey there, I am awesome"}</p>
        <button
          onClick={handleFollow}
          className="px-8 py-1 my-3 rounded-full tracking-wide border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold text-xl"
        >
          {isFollowing ? "Unfollow" : "Follow"}{" "}
          {isFollowing ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </div>
      <div className="flex">
        <Feed userId={user._id} />
        <PersonalInfo />
      </div>
    </div>
  );
};

export default ProflieSection;
