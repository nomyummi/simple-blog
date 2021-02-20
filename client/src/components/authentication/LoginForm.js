import React,{ useState,useContext,useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import UserAuthContext from '../authentication/UserAuthContext.js';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../../images/simple-blog-logo3.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  logo: {
    height: theme.spacing(15),
    width: theme.spacing(30),
  },
  submit: {
    margin: theme.spacing(1,0),
  },
  error: {
    '&::before': {
      content: '"⚠ "',
    },
    color: 'red',
    align: 'center',
  }
}));

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Please enter your username'),
  password: yup
    .string()
    .required('Please enter your password')
});

function LoginForm(props){
  const classes = useStyles();
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema)
  });
  const [loginFail,setLoginFail] = useState(false); // Used to set error message if login is incorrect

  let authState = useContext(UserAuthContext);
  let history = useHistory();

  useEffect(()=>{
    if (authState.isUserAuth){
      history.push('/');
    }
  }
  // eslint-disable-next-line
  ,[]);

  const onSubmit = async (data)=>{
    try {
      const response = await fetch(`/api/login`,{
        method:'post',
        headers: {'Content-Type': 'application/json'},
        mode:'cors',
        body: JSON.stringify(data)
      });
      if (response.ok){
        history.goBack();
        authState.setAuthState(true);
      }
      else {
        setLoginFail(true);
      }
    } catch (err){
      console.log(err);
    }
  }

  const content = ()=>{
    return (
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <img src={logo} alt="Logo" className={classes.logo}/>
          <Typography component="h1" variant="h5">Login</Typography>
          <form onSubmit={handleSubmit((data)=>{
            onSubmit(data);
          })}>
            <Controller as={TextField} control={control} defaultValue=""
              label="Username"
              variant="outlined" 
              name="username" 
              id="username"
              margin="normal"
              fullWidth
              autoFocus
              error={errors.hasOwnProperty('username')}
              helperText={errors.username?.message}
            />
            <Controller as={TextField} control={control} defaultValue=""
              label="Password"
              variant="outlined" 
              type="password" 
              id="password"
              name="password" 
              margin="normal" 
              fullWidth
              error={errors.hasOwnProperty('password')}
              helperText={errors.password?.message}
            />
            {loginFail && <Typography className={classes.error}>Incorrect username or password</Typography>}
            <Button className={classes.submit} variant="contained" value="Login" type="submit" color="secondary" fullWidth>Login</Button>
          </form>
        </div>
      </Container>
    )};

  return (
    <div>
      {!authState.isUserAuth ? content() : null}
    </div>
  )
}

export default LoginForm;