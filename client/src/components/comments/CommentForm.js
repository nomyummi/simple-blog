import React from 'react';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: bold;
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
  text: yup.string().required().max(10000), // Max ~1500 words
});

function CommentForm(props){
  const { register, handleSubmit, errors,reset } = useForm({
    resolver: yupResolver(schema)
  });
  
  return (
    <form onSubmit={handleSubmit((data)=>{
      props.onSubmit(data);
      reset();
    })}>
      <StyledLabel>Leave a Comment</StyledLabel>
      <StyledTextArea rows='10' cols='100' name="text" ref={register({required: true})} className={errors.text ? "error-input-field" : ""}></StyledTextArea>
      {errors.text && <StyledError>{errors.text?.message}</StyledError>}
      <input type="submit" />
    </form>
  )
}

export default CommentForm;