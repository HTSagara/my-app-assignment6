/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Henrique Toshio Sagara Student ID: 170954218 Date: 2023-08-06
*
********************************************************************************/ 
import { getToken } from "./authenticate";


export async function addToFavourites(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        return []
      }
} 

export async function removeFromFavourites(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        return []
      }
} 

export async function getFavourites(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: 'GET',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        return []
      }
}

export async function addToHistory(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        return []
      }
}

export async function removeFromHistory(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        return []
      }
}

export async function getHistory(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        return []
      }
}