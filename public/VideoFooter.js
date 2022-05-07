import { useAVToggle, useHMSActions } from "@100mslive/react-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideoCamera,
  faVideoSlash,
  faPhoneSlash
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();

  const hmsActions = useHMSActions();

  return (
    <div className="fixed bottom-4 right-5 flex gap-6 text-3xl">
      <button className="btn-control" onClick={toggleAudio}>
        <FontAwesomeIcon
          icon={isLocalAudioEnabled ? faMicrophone : faMicrophoneSlash}
          className="bg-black text-white rounded-full p-3 mx-3 height-[30px] aspect-square"
        />
      </button>
      <button className="btn-control" onClick={toggleVideo}>
        <FontAwesomeIcon
          icon={isLocalVideoEnabled ? faVideoCamera : faVideoSlash}
          className="bg-black text-white rounded-full p-3 mx-3 height-[30px] aspect-square"
        />
      </button>
      <button className="btn-control" onClick={() => hmsActions.leave()}>
        <FontAwesomeIcon
          icon={faPhoneSlash}
          className="bg-gray-500 text-white rounded-full p-3 mx-3 height-[30px] aspect-square"
        />
      </button>
    </div>
  );
}

export default Footer;
