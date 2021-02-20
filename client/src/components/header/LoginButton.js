import React,{useContext} from 'react';
import {useRouteMatch,useHistory} from 'react-router-dom';
import UserAuthContext from '../authentication/UserAuthContext.js';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)({
  marginRight: "1rem",
});

function LoginButton(props){
  let match = useRouteMatch();
  let history = useHistory();
  let authState = useContext(UserAuthContext);

  const redirectToLogin = ()=>{
    history.push(`${match.url}login`);
  }

  return (
    <div>
      {!authState.isUserAuth
      ?
      <StyledButton onClick={()=>redirectToLogin()} variant="contained" color="secondary">
        Login
      </StyledButton>
      : 
      null
      }
    </div>
  )
}

export default LoginButton;