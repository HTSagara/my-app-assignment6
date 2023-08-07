import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import { favouritesAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToFavourites, removeFromFavourites } from '../lib/userData';

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data;
  const imageUrl = primaryImage || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  const favouritesClicked = async () => {
    if (showAdded) {
      try {
        await removeFromFavourites(objectID);
        setFavouritesList(current => current.filter(fav => fav !== objectID));
        setShowAdded(false);
      } catch (error) {
        console.error('Error removing from favourites:', error);
      }
    } else {
      try {
        await addToFavourites(objectID);
        setFavouritesList(current => [...current, objectID]);
        setShowAdded(true);
      } catch (error) {
        console.error('Error adding to favourites:', error);
      }
    }
  };

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || 'N/A'}
          <br />
          <strong>Classification:</strong> {classification || 'N/A'}
          <br />
          <strong>Medium:</strong> {medium || 'N/A'}
          <br />
          <br />
          <strong>Artist:</strong> {artistDisplayName || 'N/A'}
          <br />
          <strong>Credit Line:</strong> {creditLine || 'N/A'}
          <br />
          <strong>Dimensions:</strong> {dimensions || 'N/A'}
          <br />
          {artistDisplayName && (
            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
              wiki
            </a>
          )}
        </Card.Text>
        <Button
          variant={showAdded ? 'primary' : 'outline-primary'}
          onClick={favouritesClicked}
        >
          {showAdded ? '+ Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
