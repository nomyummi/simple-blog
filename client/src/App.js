import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PostList from './components/posts/PostList.js';
import PostPage from './components/posts/PostPage.js';
import PostForm from './components/posts/PostForm.js';
// Use React Router to route to components/posts/PostPage.js ('/post/:postNumber') and components/posts/PostList.js ('/')
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/post/create' exact component={PostForm}/>
        <Route path='/post/:postNumber' exact component={PostPage} />
        <Route path='/' exact component={PostList} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
