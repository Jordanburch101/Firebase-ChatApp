import React, {useRef, useState, useEffect} from 'react';

// Firebase import
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase hooks
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Component imports
import ChatMessage from './ChatMessage';



function ChatRoom(props) {
    const dummy = useRef();
    const messagesRef = props.firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(25);
    
    const [messages] = useCollectionData(query, { idField: 'id' }); // Listen to data in realtime

    const [formValue, setFormValue] = useState('');
    const [count, setCount] = useState(0); 

    function handleScroll() {
      dummy.current.scrollIntoView({behavior: 'smooth'}); // Scrolls to bottom of chat room on load & new message.
    }

    
    // Scrolls to last message after 1s delay after component mounts
    useEffect(() => {
      console.log('Hello from useEffect!');
      handleScroll();
    }, [count]);

    if(count < 1) {
      setTimeout(() => {
        setCount(count + 1);
      }, 1000);
    }


    const sendMessage = async(e) => {
      e.preventDefault();
      const {uid, photoURL} = props.auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid, 
        photoURL,
        
      });
      handleScroll();
      setFormValue('');
    }
  
    return (
      <>
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}
          <span id="dummy" ref={dummy}></span>
        </main> 
  
        <form onSubmit={sendMessage}>
          <input placeholder="Aa" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
          <button className="sendBtn" type="submit" disabled={!formValue}>✉️</button>
        </form>
      </>
    )
}

export default ChatRoom;