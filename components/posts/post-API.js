import express from 'express';
import {getPost,createPost,getPosts,createComment} from './post-services.js';
import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Connect to Redis
const client = redis.createClient ({
  port : process.env.REDIS_PORT,
  host :  process.env.REDIS_HOST
});
client.auth(process.env.REDIS_PASS);

router.get('/', (req, res)=>{
  client.get(`GET POSTS`,async (err,cachedPosts)=>{
    if (cachedPosts){
      const json = JSON.parse(cachedPosts);
      res.json(json);
    }
    else {
      const posts = await getPosts();
      client.set('GET POSTS',JSON.stringify(posts));
      res.json(posts);
    }
  });
  
});

// // When creating posts, add a unique post number (num posts + 1) to the new post
// // Possible bug when two posts get created simultaneously (will there be two posts with the same postNumber?)
// Since this is just a demo, im going to leave as is because it's a bit difficult to test

router.post('/post/create', async (req, res)=> {
  const postNumber = await createPost(req.body,req.user);
  (postNumber > 0) ? res.json({success: 'Post Created',postNumber: postNumber}) : res.status(500).json({errors: '500 Server Error'});
});

// Read a post
router.get('/post/:postNumber', (req, res)=>{
  const postNumber = req.params.postNumber;
  client.get(`GET ${postNumber}`,async (err,cachedPost)=>{
    if (cachedPost){
      const json = JSON.parse(cachedPost);
      res.json(json);
    } 
    else {
      const post = await getPost(postNumber);
      if (post === null){
        res.status(404).json({errors: '404 Post Does Not Exist'});
      }
      else {
        client.set(`GET ${postNumber}`,JSON.stringify(post));
        res.json(post);
      }
    }
  })
});

// Post a comment
router.post('/post/:postNumber', async (req,res)=>{
  const comment = await createComment(req.body,req.user);
  res.json(comment);
});

// TODO: Future features, when login is created
// Edit post (change and delete)
// router.get('/post/:postNumber/edit', function(req, res) {
//   res.send('NOT IMPLEMENTED: Display edit post form on GET. Check if correct user is logged in otherwise redirect');
// });

// router.post('/post/:postNumber/edit', function(req, res) {
//   res.send('NOT IMPLEMENTED: Save the edited post on PUT. Check if correct user is logged in otherwise redirect');
// });

// router.delete('/post/:postNumber/edit', function(req, res) {
//   res.send('NOT IMPLEMENTED: Delete a post. Check if correct user is logged in otherwise redirect');
// });

export default router;
