/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Henrique Toshio Sagara Student ID: 170954218 Date: 2023-08-06
*
********************************************************************************/ 
import { useAtom } from 'jotai';
import useSWR from 'swr';
import { favouritesAtom } from '@/store';
import { Col, Row, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import ArtworkCard from '@/components/ArtworkCard';
import { addToFavourites } from '../lib/userData';

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);
  const { data: fetchedFavourites, error: favouritesError } = useSWR('/favourites', addToFavourites);

  if (favouritesError) {
    return <p>Error fetching favourites</p>;
  }

  if (!fetchedFavourites && !favouritesList) {
    return null;
  }

  if (fetchedFavourites && fetchedFavourites.length > 0) {
    return (
      <Row>
        {fetchedFavourites.map((favourite, index) => (
          <Col key={index}>
            <ArtworkCard objectID={favourite} />
          </Col>
        ))}
      </Row>
    );
  } else {
    return (
      <Card className="card text-white bg-primary mb-3">
        <Card.Body>
          <Card.Title>Nothing Here</Card.Title>
          <Card.Text>Try adding some new artwork to the list.</Card.Text>
          <Link href="/search" passHref>
            <Button variant="secondary">Search</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
};

export default Favourites;
