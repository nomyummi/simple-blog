import React from 'react';
import {useHistory} from 'react-router-dom';
import logo from '../../images/simple-blog-logo3.png';
import { styled } from '@material-ui/core/styles';

const StyledLogo = styled('img')((props)=>({
  cursor: "pointer",
  height: 56,
  [`${props.theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
    height: 48,
  },
  [props.theme.breakpoints.up("sm")]: {
    height: 64
  },
}));

function HomeLogo(props){
  let history = useHistory();

  const redirectToHome = ()=>{
    history.push(`/`);
  }
  
  return (
    <StyledLogo src={logo} onClick={redirectToHome} alt="Logo"/>
  );
}

export default HomeLogo;