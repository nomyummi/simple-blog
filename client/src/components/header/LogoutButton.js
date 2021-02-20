import React,{useContext} from 'react';
import UserAuthContext from '../authentication/UserAuthContext.js';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

function LogoutButton(props){
  let authState = useContext(UserAuthContext);
  let history = useHistory();

  const onClick = async ()=>{
    const response = await fetch(`/api/logout`,{method:'GET'});
    if (response.ok){
      authState.setAuthState(false);
      history.push('/');
    }
  };
  
  return (
    <div>
    {authState.isUserAuth 
    ? 
    (<Button onClick={onClick} variant="contained" color="secondary">
      Logout
    </Button>) 
    : 
    null}
    </div>
  );

}

export default LogoutButton;