/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Henrique Toshio Sagara Student ID: 170954218 Date: 2023-08-06
*
********************************************************************************/ 
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { getHistory, getFavourites } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

const RouteGuard = (props) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavouritesList] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    updateAtoms()
    authCheck(router.pathname);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  async function updateAtoms() {
    const favourites = await getFavourites();
    const history = await getHistory();
    setFavouritesList(favourites);
    setSearchHistory(history);
  }

  return <>{authorized && props.children}</>
};

export default RouteGuard;
