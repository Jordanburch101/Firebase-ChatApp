import React from 'react';
import './css/app.scss';

// Firebase import
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase hooks
import { useAuthState } from 'react-firebase-hooks/auth';

// Component imports 
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ChatRoom from './components/ChatRoom';

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
      <p>Chat App</p>
       <SignOut auth={auth} />
      </header>

      <section className="appBody">
        {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} />}
      </section>
    </div>


  );
}

console.log(auth.name)
export default App;
