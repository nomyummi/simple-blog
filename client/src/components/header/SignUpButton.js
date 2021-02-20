import React,{useContext} from 'react';
import {useRouteMatch,useHistory} from 'react-router-dom';
import UserAuthContext from '../authentication/UserAuthContext'
import Button from '@material-ui/core/Button';

function SignUpButton(props){
  let match = useRouteMatch();
  let authState = useContext(UserAuthContext);
  let history = useHistory();

  const redirectToSignUp = ()=>{
    history.push(`${match.url}signup`);
  }

  return (
    <div>
    { !authState.isUserAuth 
    ? 
    <Button onClick={()=>redirectToSignUp()} variant="contained" color="secondary">
      Sign Up
    </Button>
    : 
      null
    }
    </div>

  )
}

export default SignUpButton;