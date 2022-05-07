import VideoPanel from "./VideoPanel";
import VideoLogin from "./VideoLogin";
import VideoFooter from "./VideoFooter";
import {
  useHMSStore,
  selectIsConnectedToRoom,
  useHMSActions,
} from "@100mslive/react-sdk";
import { useEffect } from "react";

export default function Home() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  

  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);

  return (
    <>
      {isConnected ? (
        <>
          <VideoPanel />
          <VideoFooter />
        </>
      ) : (
        <VideoLogin />
      )}
    </>
  );
}
