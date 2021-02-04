import React from 'react';
import styled from 'styled-components';
import he from 'he';

const StyledComment = styled.div`
`
function Comment(props){
  const {comment} = props;
  return (
    <StyledComment>
      <h4>{he.decode(('author' in comment) ? String(comment.author) : 'Anonymous')}</h4>
      <p>{(new Date(comment.date)).toUTCString()}</p>
      <p>{he.decode(String(comment.text))}</p>
    </StyledComment>
  )
}

export default Comment;