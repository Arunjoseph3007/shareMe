import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGifts,
  faArrowAltCircleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import todayMood from "./assets/mood-today.jpg";
import Image from "next/image";
import ConversationCard from './ConversationCard'

const ChatSelector = ({conversations,selectedConversation,setSelectedConversation}) => {
  return (
    <div className="w-2/5 pt-[65px] relative h-[88vh]">
      <div className="px-2 h-[65px] bg-gray-300 flex z-[999] items-center space-x-2 inset-x-0 top-0 absolute">
        <h1 className="font-bold text-xl">Conversations</h1>
      </div>
      <div className="overflow-scroll">
        {conversations.map((conversation,i) => 
          <ConversationCard 
            selectedConversation={selectedConversation} 
            setSelectedConversation={setSelectedConversation} 
            conversation={conversation} 
            key={conversation._id} />
        )}
      </div>
    </div>
  );
};

export default ChatSelector;
