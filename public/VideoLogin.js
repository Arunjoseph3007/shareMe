import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { v4 } from "uuid";

const VideoLogin = () => {
  const hmsActions = useHMSActions();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isJoin, setIsJoin] = useState(true);
  const [inputValues, setInputValues] = useState({
    name: "",
    token: "",
    room_name: "",
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const createRoom = async () => {
    setError("Creating room...");

    if (!inputValues.name) return setError("Please provide username");
    if (!inputValues.room_name) return setError("Please Enter Room name");

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tokens/management`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setError("Room created sucessfully");

      joinRoom("backstage", data.id);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const joinRoom = async (role = "stage", roomId = null) => {
    setError("Trying to join...");
    roomId = roomId || inputValues.token;

    if (!inputValues.name) return setError("Please provide username");
    if (isJoin && !inputValues.token) return setError("Please provide Room Id");

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tokens/app`,
        {
          method: "POST",
          body: JSON.stringify({
            type: "app",
            room_id: roomId,
            role: role,
            user_id: v4(),
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const { token } = await response.json();
      hmsActions.join({
        userName: inputValues.name,
        authToken: token,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(JSON.stringify(error));
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="border rounded-md shadow-sm p-3 py-5 flex flex-col gap-4 w-full max-w-sm">
        <p className="text-3xl font-bold tracking-wide line-height-3xl">
          Hey,
          <br /> Connect with <br /> your friends Now
        </p>
        <div className="[border-bottom:3px_dashed_black] w-full h-[2px] border-black"></div>
        {error && (
          <h1 className="text-center bg-gray-300 border border-gray-700 rounded-md w-full p-2">
            {error}
          </h1>
        )}
        <input
          onChange={handleInputChange}
          className="border p-2 rounded-md "
          type="text"
          name="name"
          placeholder="User Name"
        />
        <input
          onChange={handleInputChange}
          name={isJoin ? "token" : "room_name"}
          className="border p-2 rounded-md "
          type="text"
          placeholder={isJoin ? "Enter Room ID" : "Enter Room name"}
        />
        <button
          type="button"
          disabled={loading}
          onClick={isJoin ? () => joinRoom("stage") : createRoom}
          className="p-2 rounded-md bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold w-full text-xl"
        >
          {loading ? "..." : isJoin ? "Join Room" : "Create New Room"}
        </button>
        <p className="text-center text-gray-200">or</p>
        <button
          type="button"
          disabled={loading}
          onClick={() => setIsJoin((prev) => !prev)}
          className="p-2 rounded-md bg-gray-300 text-black hover:bg-black hover:text-white duration-300 transition ease-in-out  bold w-full text-xl"
        >
          {!isJoin ? "Join Room" : "Create New Room"}
        </button>
      </form>
    </div>
  );
};

export default VideoLogin;

//room_id-6270b354bd4f3b56b076fb84
