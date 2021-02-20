import React from 'react';
import {useRouteMatch,useHistory} from 'react-router-dom';
import he from 'he';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
  subtitle :{
    fontWeight: "normal",
    color: grey[800],
  },
  body : {
    padding: theme.spacing(1.5),
  },
  teaser : {
    '&:hover': {
      opacity: "0.7",
    },
    cursor: "pointer",
    borderRadius: 4,
  },
  teaserHeader : {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    borderRadius: "4px 4px 0px 0px",
  }
}));

function PostTeaser(props){
  const classes = useStyles();
  const {postNumber,title,date,text,username} = props;
  let readableDate = new Date(date);
  readableDate = readableDate.toLocaleString([],{year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: 'true'});
  const postTeaserLength = 1000;
  let match = useRouteMatch();
  let history = useHistory();

  const redirectToPost = (postNumber)=>{
    history.push(`${match.url}post/${postNumber}`);
  }
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const teaserText = he.decode(String(text.substring(0,Math.min(text.length,postTeaserLength)))).replace(/<\/?[^>]+(>|$)/g, " ");
  return (
      <Box className={classes.teaser} boxShadow={3} onClick={()=>redirectToPost(`${postNumber}`)}>
        <div className={classes.teaserHeader}>
          <Typography className={classes.title} variant="h5">{he.decode(String(title))}</Typography>
          <Typography className={classes.subtitle} variant="subtitle2"> {username ? capitalize(String(username)) : 'Anonymous'} • {readableDate}</Typography> 
        </div>
        <Typography className={classes.body} variant="body1">{he.decode(teaserText)}...</Typography>
    </Box>
  )
}

export default PostTeaser;