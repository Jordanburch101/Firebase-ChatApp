import React, {useRef, useState} from 'react';
import './App.css';

// firebase import
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// firebase hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyB73FTXWR8ETIJNduacO0HocbciY8HhRO0",
  authDomain: "fir-chatapp-e7907.firebaseapp.com",
  projectId: "fir-chatapp-e7907",
  storageBucket: "fir-chatapp-e7907.appspot.com",
  messagingSenderId: "718778641845",
  appId: "1:718778641845:web:ebd9c12db0020f2d3bbdfc",
  measurementId: "G-HD2P61HGMF"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {


  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );

}

// Sign in = with google
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick = {signInWithGoogle}>Sign in with Google</button>
  )
}

// Sign out
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign</button>
  )
}

// Chat Room logic
function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' }); // Listen to data in realtime

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, 
      photoURL
    });

    setFormValue('');
  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div> 

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Message</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const {text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  ) 
}

export default App;
