import React from 'react';
import he from 'he';
import '../posts/rendered-quill.css';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0,0,1.5,0),
    borderColor: grey[300],
  },
  author: {
    fontWeight: "bold",
  },
  date: {
    color: grey[500],
  },
}));

function Comment(props){
  const classes = useStyles();
  const {comment} = props;

  return (
    <Box className={classes.box}>
      <Typography variant="subtitle1" className={classes.author}>{he.decode(('author' in comment) ? String(comment.author.username) : 'Anonymous')} &nbsp;
        <Typography variant="caption" className={classes.date}>{(new Date(comment.date)).toLocaleString([],{year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: 'true'})}</Typography>
      </Typography>
      
      <Typography variant="body1" className="rendered-quill" dangerouslySetInnerHTML={{__html: he.decode(String(comment.text))}} />
    </Box>
  )
}

export default Comment;