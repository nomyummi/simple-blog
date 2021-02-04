import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CommentSection from '../comments/CommentSection.js';
import styled from 'styled-components';
import he from 'he';
const StyledText = styled.p`
  white-space: pre-wrap;
`
function PostPage(props){
  const [post,setPost] = useState({});
  const {postNumber} = useParams();
  
  useEffect(()=>{
    async function fetchData(){
      const response = await fetch(`/api/post/${postNumber}`);
      setPost(await response.json());
    }
    fetchData();
  }
  // eslint-disable-next-line
  ,[]);

  const commentSection = (()=>{
    if ('comments' in post) {
      return (
        <CommentSection comments={post.comments} postNumber={postNumber}></CommentSection>
      );
     } else {
      return null;
    } 
  })();

  return (
    <div className="post-page">
      <h1>{he.decode(String(post.title))}</h1>
      <p>{(new Date(post.date)).toUTCString()}</p>
      <StyledText>{he.decode(String(post.text))}</StyledText>
      {commentSection}
    </div>
  )
}

export default PostPage;