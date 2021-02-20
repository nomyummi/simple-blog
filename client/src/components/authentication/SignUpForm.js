import React,{ useState,useContext,useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import UserAuthContext from '../authentication/UserAuthContext.js';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import logo from '../../images/simple-blog-logo3.png';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50,'Last name is too long')
    .matches(/^[A-Za-z]+$/,'Only letters are allowed'),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(50,'Last name is too long')
    .matches(/^[A-Za-z]+$/,'Only letters are allowed'),
  username: yup
    .string()
    .required('Username is a required field')
    .min(5,'Username is too short')
    .max(30,'Username is too long'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(8,'Password is too short')
    .max(128,'Password is too long')
});
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: theme.spacing(15),
    width: theme.spacing(30),
    marginBottom: theme.spacing(1),
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

function SignUpForm(props){
  const classes = useStyles();
  const [visiblePass,setVisiblePass] = useState(false);
  const [signupFail,setSignupFail] = useState(false);
  const { handleSubmit, errors, control} = useForm({
    resolver: yupResolver(schema)
  });
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
    const response = await fetch(`/api/signup`,{
      method:'post',
      headers: {'Content-Type': 'application/json'},
      mode:'cors',
      body: JSON.stringify(data)
    });
    if (response.ok){
      history.push(`/login`);
    }
    else {
      setSignupFail(true);
    }
  };

  const content = ()=>{
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img src={logo} alt="Logo" className={classes.logo}/>
          <Typography component="h1" variant="h5">Sign Up</Typography>
          <form onSubmit={handleSubmit((data)=>{
            onSubmit(data);
          })}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller as={TextField} control={control} defaultValue=""
                  label="First Name"
                  variant="outlined" 
                  name="firstName" 
                  id="firstName"
                  margin="normal"
                  autoFocus
                  error={errors.hasOwnProperty('firstName')}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller as={TextField} control={control} defaultValue=""
                  label="Last Name"
                  variant="outlined" 
                  name="lastName" 
                  id="lastName"
                  margin="normal"
                  error={errors.hasOwnProperty('lastName')}
                  helperText={errors.lastName?.message}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Controller as={TextField} control={control} defaultValue=""
                  label="Username"
                  variant="outlined" 
                  name="username" 
                  id="username"
                  margin="normal"
                  fullWidth
                  error={errors.hasOwnProperty('username')}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller control={control}
                  defaultValue=""
                  id="password"
                  name="password" 
                  render={props=>(
                    <TextField
                    type={visiblePass ? "text" : "password"} 
                    margin="normal" 
                    variant="outlined" 
                    label="Password"
                    onChange={e=>props.onChange(e.target.value)}
                    fullWidth
                    error={errors.hasOwnProperty('password')}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: 
                        <IconButton onClick={()=>(setVisiblePass(!visiblePass))}>
                          {(visiblePass) ?
                          <VisibilityOffOutlined /> :
                          <VisibilityOutlined />}
                        </IconButton>
                    }}
                    >
                    </TextField>)
                  }
                />
            </Grid>
            {signupFail && <Typography className={classes.error}>Sign up failed - Username already exists</Typography>}
            <Button className={classes.submit} variant="contained" value="Sign Up" type="submit" color="secondary" fullWidth>Sign Up</Button>
          </Grid>

          </form>
        </div>
      </Container>
    )};
  //Display content if user is not logged in
  return (
    <div>
      {!authState.isUserAuth ? content() : null}
    </div>
  );
}

export default SignUpForm;