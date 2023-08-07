/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Henrique Toshio Sagara Student ID: 170954218 Date: 2023-08-06
*
********************************************************************************/ 
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { searchHistoryAtom } from '@/store';
import Link from 'next/link';
import { addToHistory } from '../lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';
import { useForm } from 'react-hook-form';

const MainNav = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  if (!Array.isArray(searchHistory)) {
    setSearchHistory([]); // Initialize as an empty array if not an array
  }
  const { register, handleSubmit } = useForm();

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchHistory([...searchHistory, `title=true&q=${value}`]);

    try {
      await addToHistory(`title=true&q=${value}`);
    } catch (error) {
      console.error('Error adding to history:', error);
    }

    router.push(`/artwork?title=true&q=${value}`);
    setIsExpanded(false);
  };

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavLinkClick = () => {
    setIsExpanded(false);
  };

  let token = readToken();

  const submitForm = async (data) => {
    setIsExpanded(false);
    console.log(`form submitted - searchField : ${data.searchField}`);
    const searchField = data.searchField;
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
  };

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary navbar navbar-expand-lg navbar-light">
        <Navbar.Brand>Henrique Sagara</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" active={router.pathname === '/'} onClick={handleNavLinkClick}>
            Home
          </Nav.Link>
          {token && (
            <Nav.Link href="/search" active={router.pathname === '/search'} onClick={handleNavLinkClick}>
              Advanced Search
            </Nav.Link>
          )}
        </Nav>
        <Form onSubmit={handleSearch} className="d-flex ml-auto">
          <FormControl
            type="text"
            name="search"
            placeholder="Search"
            className="mr-2 form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleIsExpanded} />
        <Navbar.Collapse id="basic-navbar-nav" className={`collapse ${isExpanded ? 'show' : ''}`}>
          <Nav>
            {token ? (
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item onClick={handleNavLinkClick}>
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item onClick={handleNavLinkClick}>
                    History
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === '/register'} onClick={handleNavLinkClick}>
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === '/login'} onClick={handleNavLinkClick}>
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
