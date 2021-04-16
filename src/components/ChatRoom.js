import React, {useRef, useState} from 'react';

// Firebase import
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase hooks
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Component imports
import ChatMessage from './ChatMessage';



function ChatRoom(props) {
    const dummy = useRef()
  
    const messagesRef = props.firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');
    
    const [messages] = useCollectionData(query, { idField: 'id' }); // Listen to data in realtime
    const [formValue, setFormValue] = useState('');
    
    const sendMessage = async(e) => {
      e.preventDefault();
      const {uid, photoURL} = props.auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid, 
        photoURL
      });
  
      setFormValue('');
      dummy.current.scrollIntoView({behavior: 'smooth'});
    }
  
    return (
      <>
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}
          <div ref={dummy}></div>
        </main> 
  
        <form onSubmit={sendMessage}>
          <input placeholder="Aa" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
          <button className="sendBtn" type="submit">✉️</button>
        </form>
      </>
    )
}

export default ChatRoom;