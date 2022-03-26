import {useState, useEffect} from 'react'

const ConversationCard = ({val,conversation,selectedConversation,setSelectedConversation}) => {
	const [reciever, setReciever] = useState();

	useEffect(()=>{
		const recieverId = conversation.members.filter(member => member!==localStorage.getItem('userId'))[0]
		const getReciver = async ()=>{
			try{
				const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${recieverId}`)
				const data = await response.json()
				setReciever(data)
			}catch(error){
				console.error(error)
			}
		}
		getReciver()
	},[])

	return (
		<div 
			onClick={()=>setSelectedConversation(conversation)} 
			className={`flex w-full border-b p-2 space-x-4 items-center hover:bg-gray-200 ${conversation._id===selectedConversation?._id ? "bg-gray-200":""}`} >
			{reciever && 
				<>
					<img src={reciever.profilePicture} className="rounded-full object-cover w-[40px] h-[40px] "  />
					<h1>{reciever.username}</h1>
				</>
			}
		</div>
	)
}

export default ConversationCard