import React,{useEffect, useState} from 'react';
import PostTeaser from './PostTeaser.js';

//TODO: Future feature - look into pagination (page 1, page 2, page 3)
function PostList(props){
  const [posts,setPosts] = useState([]);
  
  useEffect(()=>{
    async function fetchData(){
      const response = await fetch(`/api`,{
        method:'GET'
      });
      const postList = await response.json();
      setPosts(postList);
    }
    fetchData();
  }
  //eslint-disable-next-line
  ,[]);
  
  return (
    <div className="post-list">
        {posts.map((post)=>(
        <PostTeaser 
          postNumber={post.postNumber} 
          title={post.title} 
          date={post.date}
          text={post.text}
          key={post._id}>
        </PostTeaser>
      ))}
    </div>
  )
}

export default PostList;