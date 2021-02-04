import React from 'react';
import styled from 'styled-components';
import {useRouteMatch,useHistory} from 'react-router-dom';
import he from 'he';

const StyledPostTeaser = styled.div`
  &:hover {
    opacity: 0.7;
  }
  cursor:pointer;
`;

function PostTeaser(props){
  const {postNumber,title,date,text} = props;
  let readableDate = new Date(date);
  readableDate = readableDate.toUTCString();
  const postTeaserLength = 200;
  let match = useRouteMatch();
  let history = useHistory();

  const redirectToPost = (postNumber)=>{
    history.push(`${match.url}post/${postNumber}`);
  }

  return (
    <StyledPostTeaser onClick={()=>redirectToPost(`${postNumber}`)}>
      <h1>{he.decode(String(title))}</h1>
      <p>{readableDate}</p>
      <p>{he.decode(String(text.substring(0,Math.min(text.length,postTeaserLength))))}...</p>
    </StyledPostTeaser>
  )
}

export default PostTeaser;