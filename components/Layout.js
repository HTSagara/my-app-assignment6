/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Henrique Toshio Sagara Student ID: 170954218 Date: 2023-07-05
*
********************************************************************************/ 
import MainNav from './MainNav';
import { Container } from 'react-bootstrap';

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container>
        {props.children}
      </Container>
      <br />
    </>
  );
}