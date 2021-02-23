# Simple Blog
A demo blog that connects a frontend app (React) to a backend API (NodeJS/Express + MongoDB). Core functionality has been implemented (see Current features). Additional features may be added in the future (see Future features).

Demo link: https://fast-refuge-07159.herokuapp.com/

Note: Due to how the Heroku free tier works, the demo may take some time to load.
## Current features:
- Get a list of all posts (/)
- Get a single post and associated comments. Add comment to the post. (/post/post_number)
- Create a post if logged in (/post/create)
- User authentication with cookies and sessions (login, signup, logout)
- Protected routes (/post/create)
- Rich text editor for post and comment submissions using Quill (colored text,fonts,font sizes,images,embedded videos,etc)
- Styling done with Material UI
  
## Future features:
- Users can update and delete their own posts
- Reset password functionality (passwords are hashed in the database, so if a password is forgotten, it can't be retrieved)
- Search bar for posts 
- Filter posts by user (click on user to see their posts)
- Rerouting for posts that don't exist
- Pagination
- Caching
- Save post drafts, so the user does not have to write everything all at once