import Post from './post-model.js';
import validator from 'validator';
import Comment from '../comments/comment-model.js'; //needed so that populate() knows what 'comments' are

async function getPosts(){
  const posts = await Post.find().lean().populate('comments').populate('user').sort({date: 'descending'});
  return posts;
}

async function getPost(postNumber){
  const post = await Post.findOne({postNumber: postNumber}).lean().populate('comments')
    .populate({path:'comments',populate: {path:'author',model:'User'}})
    .populate('user');
  return post;
}

async function createPost(content,user){
  let {title,text} = content;
  title = validator.trim(title);
  title = validator.escape(title);
  text = validator.trim(text);
  text = validator.escape(text);
  const isTitleValid = validator.isLength(title,{min: 1, max: 1000});
  const isTextValid = validator.isLength(text,{min:1, max: 50000000}); //50 MB max
  const postCount = await Post.countDocuments({},(err,count)=>{return count});
  const postNumber = postCount + 1;
  if (isTitleValid && isTextValid){
    const newPost = new Post({
      title: title,
      text: text,
      date: Date.now(),
      user: user._id,
      postNumber: postNumber
    })
    await newPost.save();
    return postNumber;
  }
  else {
    return -1;
  }
}

async function createComment(comment,user){
  let {text,postNumber} = comment;
  text = validator.trim(text);
  text = validator.escape(text);
  const isTextValid = validator.isLength(text,{min:1, max: 5000000}); // 5MB max
  if (isTextValid){
    let newComment;
    if (user){
      newComment = new Comment({
        author: user._id,
        text: text,
        date: Date.now()
      });
    } else {
      newComment = new Comment({
        text: text,
        date: Date.now()
      })
    }
    await newComment.save();
    const correspondingPost = await Post.findOne({postNumber: postNumber});
    correspondingPost.comments.push(newComment._id);
    correspondingPost.save();
    return await newComment.populate('author').execPopulate();
  }
  else {
    return {errors:'500 Server Error'};
  }
}
// TODO: Future feature: Look into whether exposing ObjectIds is okay (eg look into UUIDs/GUID)
// function cleanJSON(post){
//   delete post._id;
  //
  // if ('comments' in post){
  //   post.comments.forEach(comment=>delete comment._id);
  // }
  // if ('user' in post){
  //   delete post.user._id;
  // }
// }


export {getPosts,getPost,createPost,createComment};