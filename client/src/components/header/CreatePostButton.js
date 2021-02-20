import React,{useContext} from 'react';
import {useRouteMatch,useHistory} from 'react-router-dom';
import UserAuthContext from '../authentication/UserAuthContext.js';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const StyledButton = styled(Button)({
  marginRight: "1rem",
});

function CreatePostButton(props){
  let match = useRouteMatch();
  let history = useHistory();
  let authState = useContext(UserAuthContext);

  const redirectToCreatePost = ()=>{
    history.push(`${match.url}post/create`);
  }
  
  return (
    <div>
    {authState.isUserAuth 
    ? 
    (<StyledButton onClick={redirectToCreatePost}  variant="contained" color="secondary" startIcon={<AddIcon />}>
      Create Post
    </StyledButton>) 
    : 
    null}
    </div>
  );

}

export default CreatePostButton;