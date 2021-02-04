import React from 'react';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

const StyledLabel = styled.label`
  display: block;
`
const StyledInput = styled.input`
  &.error-input-field {
    background-color:#fff0f2;
    border-width: 1px;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-radius: 2px;
  }
  font-family: Arial;
  font-size: 0.85em;
  display: block;
`
const StyledTextArea = styled.textarea`
  &.error-input-field {
    background-color: #fff0f2;
    border-width: 1px;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-radius: 2px;
  }
  font-family: Arial;
  font-size: 0.85em;
  display: block;
`
const StyledError = styled.p`
  &::before{
    content: "⚠ ";
  }
  color: red;
  margin: 0;
`
const schema = yup.object().shape({
  title: yup.string().required().max(1000), // Max ~150 words 
  text: yup.string().required().max(250000), // Max ~40,000 words
});

function PostForm(props){
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  let history = useHistory();

  const redirectToPost = (postNumber)=>{
    history.push(`/post/${postNumber}`);
  }

  const onSubmit = async (data)=>{
    const response = await fetch(`/api/post/create`,{
      method:'post',
      headers: {'Content-Type': 'application/json'},
      mode:'cors',
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if ('postNumber' in json){
      redirectToPost(`${json.postNumber}`);
    } else {
      alert('Server error'); //TODO: change to proper error handling
    }
    
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel>Title</StyledLabel>
      <StyledInput type="text" name="title" ref={register({required: true})} className={errors.title ? "error-input-field" : ""}/>
      {errors.title && <StyledError>{errors.title?.message}</StyledError>}
      <StyledLabel>Text</StyledLabel>
      <StyledTextArea rows='12' cols='100' name="text" ref={register({required: true})} className={errors.text ? "error-input-field" : ""}></StyledTextArea>
      {errors.text && <StyledError>{errors.text?.message}</StyledError>}
      <input type="submit" />
    </form>
  )
}

export default PostForm;