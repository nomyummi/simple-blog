import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CommentSection from '../comments/CommentSection.js';
import he from 'he';
import './rendered-quill.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3,4),
  },
  title: {
    fontWeight: "bold",
  },
  authorDate: {
    fontSize: "1em",
    color: grey[700],
  },
  content: {
    borderTop: `1px solid ${grey[300]}`,
    borderBottom: `1px solid ${grey[300]}`,
  },
  commentSectionTitle: {
    fontWeight: "bold",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
}));

function PostPage(props){
  const classes = useStyles();
  const [post,setPost] = useState({});
  const {postNumber} = useParams();
  const [postDataReceived,setPostDataReceived] = useState(false);

  useEffect(()=>{
    async function fetchData(){
      const response = await fetch(`/api/post/${postNumber}`);
      setPost(await response.json());
      setPostDataReceived(true);
    }
    fetchData();
  }
  // eslint-disable-next-line
  ,[]);
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const content = ()=>{
    return (
      <Container maxWidth="md">
        <div className={classes.paper}>
            <Typography variant="h4" className={classes.title}>{he.decode(String(post.title))}</Typography>
            <Typography variant="subtitle1" className={classes.authorDate}>{post.hasOwnProperty("user") ? capitalize(post.user.username) : 'Anonymous'} • {(new Date(post.date)).toLocaleString([],{year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: 'true'})}</Typography>
          <Box className={classes.content} marginTop={1} marginBottom={0.75} paddingTop={1.5} paddingBottom={1.5}>
            <Typography variant="body1" className="rendered-quill" dangerouslySetInnerHTML={{__html: he.decode(String(post.text))}}></Typography>
          </Box>
            <Typography className={classes.commentSectionTitle} variant="h5">Comments</Typography>
          <CommentSection comments={post.comments} postNumber={postNumber}></CommentSection>
        </div>
      </Container>
    )
  }
  return (
    <div>
      {postDataReceived ? content() : null}
    </div>
  )
}

export default PostPage;