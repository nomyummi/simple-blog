import React,{useState} from 'react';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';

function CommentSection(props){
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
    <div>
      {props.comments.map(comment=>(
        <Comment comment={comment} key={comment._id}></Comment>
      ))}
      {newComments.map(comment=>{
        return <Comment comment={comment} key={comment._id}></Comment>
      })}
      <CommentForm onSubmit={onSubmit}></CommentForm>
    </div>
  );
}

export default CommentSection;