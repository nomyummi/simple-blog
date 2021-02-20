import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CommentTextEditor from '../editor/CommentTextEditor.js';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const schema = yup.object().shape({
  text: yup.string().required('Comment cannot be blank').max(5000000,'Comment must be less than 5 MB in size'), // 5MB max
});

const useStyles = makeStyles((theme) => ({
  commentLabel: {
    margin: theme.spacing(0.5,0,1,0),
    fontWeight: "bold",
  },
  submit: {
    margin: theme.spacing(1.5,0),
  },
  error: {
    '&::before': {
      content: '"⚠ "',
    },
    marginTop: theme.spacing(1),
    color: 'red',
  }
}));

function CommentForm(props){
  const { control, handleSubmit, errors,reset } = useForm({
    resolver: yupResolver(schema)
  });
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit((data)=>{ // onSubmit defined in CommentSection
      props.onSubmit(data);
      reset();
    })}>
      <Typography variant="h5" className={classes.commentLabel}>Leave a comment</Typography>
      <Controller 
        defaultValue=""
        control={control}
        name="text"
        error={errors.hasOwnProperty('text')}
        render={({onChange,value})=>(
          <CommentTextEditor value={value} onChange={onChange}></CommentTextEditor>)
        }
      />
      {errors.text && <Typography className={classes.error}>{errors.text?.message}</Typography>}
      <Button className={classes.submit} variant="contained" type="submit" color="secondary">Submit</Button>
    </form>
  )
}

export default CommentForm;