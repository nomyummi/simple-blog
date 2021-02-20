import React,{useEffect, useState} from 'react';
import PostTeaser from './PostTeaser.js';
import Container from '@material-ui/core/Container';
import { makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2,3),
  },
}));

//TODO: Future feature - look into pagination (page 1, page 2, page 3)
function PostList(props){
  const classes = useStyles();
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
    <Container maxWidth="md">
      <div className={classes.paper}>
        {posts.map((post)=>(
        <PostTeaser 
          postNumber={post.postNumber}
          username={post.user?.username}
          title={post.title} 
          date={post.date}
          text={post.text}
          key={post._id}>
        </PostTeaser>
        ))}
      </div>
    </Container>
  )
}

export default PostList;