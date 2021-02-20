import React,{useContext,useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import UserAuthContext from '../authentication/UserAuthContext.js';
import TextEditor from '../editor/TextEditor.js';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import '../editor/post-text-editor.css';

const schema = yup.object().shape({
  title: yup.string().required('Title is a required field').max(1000,'A maximum of 1,000 characters is allowed'), // Max ~150 words 
  text: yup.string().required('Text is a required field').max(50000000,'A maximum of 50,000,000 characters is allowed'), // 50MB max
});

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(0,2),
  },
  title: {
    margin: theme.spacing(1.5,0,3,0),
  },
  submit: {
    margin: theme.spacing(3,0,3,0),
  },
  error: {
    '&::before': {
      content: '"⚠ "',
    },
    marginTop: theme.spacing(1),
    color: 'red',
  }
}));

function PostForm(props){
  const { handleSubmit, errors,control } = useForm({
    resolver: yupResolver(schema)
  });
  
  let authState = useContext(UserAuthContext);
  let history = useHistory();

  useEffect(()=>{
    if (!authState.isUserAuth){
      history.push('/');
    }
  }
  // eslint-disable-next-line
  ,[]);

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
  const classes = useStyles();
  const content = ()=>{
    return (
      <Container maxWidth="md">
        <div className={classes.paper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller as={TextField} control={control} defaultValue=""
              className={classes.title}
              label="Title"
              name="title" 
              margin="normal"
              fullWidth
              error={errors.hasOwnProperty('title')}
              helperText={errors.title?.message}
            />
            <Controller 
              defaultValue=""
              control={control}
              name="text"
              error={errors.hasOwnProperty('text')}
              render={({onChange,value})=>(
                <TextEditor value={value} onChange={onChange}></TextEditor>)
              }
            />
            {errors.text && <Typography className={classes.error}>{errors.text?.message}</Typography>}
            <Button className={classes.submit} variant="contained" type="submit" color="secondary" fullWidth>Submit</Button>
          </form>
        </div>
      </Container>
    )
  }
  return (
    <div>
      {authState.isUserAuth ? content() : null}
    </div>
  )
}

export default PostForm;