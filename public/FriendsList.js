import FriendCard from "./FriendCard"
import { useEffect, useState } from "react";

const FriendsList = ({ feed = false, userId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/explore/${userId}`
      );
      const data = await res.json();
      if (res.status === 200) setFriends(data);
    };
    fetchUsers();
  }, [userId]);

  return (
    <div className="w-full p-3">
      {friends &&
        friends.map((elm) => <FriendCard key={elm._id} friendId={elm._id} friend={elm} />)}
    </div>
  );
};

//6226209f06d7e22ff41d9107

export default FriendsList;
