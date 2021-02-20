import React,{useState} from 'react';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';
import Box from '@material-ui/core/Box';
import '../editor/comment-text-editor.css';
import { makeStyles} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(1,4,0.5,4),
    borderColor: grey[300],
  },
}));

function CommentSection(props){
  const classes = useStyles();
  const [newComments,setNewComments] = useState([]);
  const onSubmit = async (data)=>{
    data.postNumber = props.postNumber;
    const response = await fetch(`/api/post/${props.postNumber}`,{
      method:'post',
      headers: {'Content-Type': 'application/json'},
      mode:'cors',
      body: JSON.stringify(data)
    });
    const newComment = await response.json();
    if (!('errors' in newComment)){
      setNewComments([...newComments,newComment]);
    } else {
      alert(newComment.errors);
    }
  }

  return (
    <div className="comment-section">
      {props.comments.map(comment=>(
        <Comment comment={comment} key={comment._id}></Comment>
      ))}
      {newComments.map(comment=>{
        return <Comment comment={comment} key={comment._id}></Comment>
      })}
      <Box className={classes.box} borderRadius={5} border={1} boxShadow={2}>
        <CommentForm onSubmit={onSubmit}></CommentForm>
      </Box>
      
    </div>
  );
}

export default CommentSection;