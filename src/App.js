import React from 'react';
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
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
