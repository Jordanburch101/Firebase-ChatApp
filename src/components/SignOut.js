import React from 'react';



function SignOut(props) {
    return props.auth.currentUser && (
      <button onClick={() => props.auth.signOut()}>Sign Out</button>
    )
}

export default SignOut;