import { useVideo } from "@100mslive/react-sdk";

const VideoPeer = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div
      className={`rounded-md flex-1 basis-80 p-2 m-2 border-4 relative  ${
        peer.isLocal && "border-blue-400"
      }`}
    >
      <video
        ref={videoRef}
        className={`rounded-md ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div className="absolute inset-x-0 font-extrabold bottom-3 text-center text-white [text-shadow:0_0_10px_black]">
        {peer.name}{" "}
        {peer.isLocal && (
          <span className="text-sm text-gray-500">{"(you)"}</span>
        )}
      </div>
    </div>
  );
};

export default VideoPeer;
