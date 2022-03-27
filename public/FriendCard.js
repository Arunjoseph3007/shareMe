import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";

const FriendCard = ({ friendId, friend }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setIsFollowing(data.following.includes(friend._id));
  }, []);

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${friendId._id}/follow`,
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

  const handleMessage = async ()=>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/conversations/`,{
          method: "POST",
          body: JSON.stringify({
            senderId: localStorage.getItem('userId'),
            receiverId: friendId,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
        const data = await response.json();
        router.push({
          pathname: '/messages',
          query: { q: friendId },
        })
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className="w-full shadow-sm border flex justify-between items-center rounded-md my-3 p-3">
      <div className="mx-3 pb-3 flex items-center h-full">
        <img
          className="rounded-full w-[120px] h-[120px] object-cover mr-4 border-2 border-black"
          alt="profile-pic"
          src={friend.profilePicture}
        />
        <div className="border-l h-full pl-3">
          <h3 className="w-full text-2xl py-2 bold capitalize">
            <Link href={`/profile/${friend._id}`}>
              <a>{friend.username}</a>
            </Link>
          </h3>
          <h2 className="text-sm text-gray-400" >{friend.desc}</h2>
        </div>

      </div>
      <div className="flex flex-col">
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
        <button onClick={handleMessage} className="px-8 py-1 my-3 rounded-full tracking-wide border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold text-xl">
          Message
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
