import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import VideoPeer from "./VideoPeer";

const VideoPanel = () => {
  const peers = useHMSStore(selectPeers);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl border-b py-2 px-5 font-bold text-center">
          Conference
        </h1>
        <div className="flex items-center justify-center flex-wrap">
          {peers?.map((peer) => (
            <VideoPeer key={peer.id} peer={peer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;
