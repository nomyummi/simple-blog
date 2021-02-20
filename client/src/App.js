import React, {useState,useEffect} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PostList from './components/posts/PostList.js';
import PostPage from './components/posts/PostPage.js';
import PostForm from './components/posts/PostForm.js';
import LoginForm from './components/authentication/LoginForm.js';
import SignUpForm from './components/authentication/SignUpForm.js';
import UserAuthContext from './components/authentication/UserAuthContext.js';
import Header from './components/header/Header.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#53c4f7',
      main: blue[100],
    },
    secondary: {
      // main: '#ff1744',
      main: deepOrange[400],
    },
  },
});
//TODO -
// When logged in, have the ability to look at own created posts - allow for update and deletion of own posts
// Save draft of post (Changes will not be saved popup - Quill deltas)
// Search bar (algolia for post searches), filter by users
// Pagination
function App() {
  const [isUserAuth,setIsUserAuth] = useState(false);
  useEffect(()=>{
    async function authenticate(){
      const response = await fetch(`/api/session`,{
        method:'GET',
        credentials: 'include',
      });
      if (!response.ok){
        setIsUserAuth(false);
      }
      else {
        setIsUserAuth(true);
      }
    }
    authenticate();
  }
  // eslint-disable-next-line
  ,[]);

  const setAuthState = (authState)=>{
    setIsUserAuth(authState);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <UserAuthContext.Provider value={{isUserAuth,setAuthState}}>
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <Route path='/login' exact component={LoginForm}/>
            <Route path='/signup' exact component={SignUpForm}/>
            <Route path='/post/create' exact component={PostForm}/>
            <Route path='/post/:postNumber' exact component={PostPage} />
            <Route path='/' exact component={PostList} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </UserAuthContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
