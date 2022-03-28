import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGifts,
  faArrowAltCircleRight,
  faArrowRight,
  faClose
} from "@fortawesome/free-solid-svg-icons";
import todayMood from "./assets/mood-today.jpg";
import Image from "next/image";
import ConversationCard from './ConversationCard'

const ChatSelector = ({
  isOpen, 
  setIsOpen,
  conversations,
  selectedConversation,
  setSelectedConversation
}) => {

  return (
    <div className={`w-full max-w-[400px] pt-[65px] ${isOpen ? "block" : 'hidden'} lg:relative absolute right-0 bg-white border-2 border-black shadow-xl h-[90vh]`}>
      <div className="px-2 h-[65px] bg-gray-300 flex z-[999] items-center space-x-2 inset-x-0 top-0 absolute">
        <h1 className="font-bold flex-1 text-xl">Conversations</h1>
        <FontAwesomeIcon icon={faClose} onClick={()=>setIsOpen(!isOpen)} className="p-2 lg:hidden" />
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
