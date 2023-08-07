/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Henrique Toshio Sagara Student ID: 170954218 Date: 2023-07-05
*
********************************************************************************/ 
// pages/search.js

import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '../lib/userData'; // Import the addToHistory function from userData.js

const AdvancedSearch = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { searchHistory, setSearchHistory } = useAtom(searchHistoryAtom); // Get the setSearchHistory function from the atom

  // Make the submitForm function asynchronous
  const submitForm = async (data) => {
    let queryString = 'searchBy=true';

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;

    try {
      // Use the addToHistory function to update the history list in the database
      await addToHistory(queryString);
    } catch (error) {
      console.error('Error adding to history:', error);
    }

    setSearchHistory((current) => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
    <Form.Group controlId="searchBy">
      <Form.Check {...register('searchBy')} label="Search by" type="checkbox" />
    </Form.Group>
    <Form.Group controlId="geoLocation">
      <Form.Label>Geo Location</Form.Label>
      <Form.Control {...register('geoLocation')} type="text" />
    </Form.Group>
    <Form.Group controlId="medium">
      <Form.Label>Medium</Form.Label>
      <Form.Control {...register('medium')} type="text" />
    </Form.Group>
    <Form.Group controlId="isOnView">
      <Form.Check {...register('isOnView')} label="Is on view" type="checkbox" />
    </Form.Group>
    <Form.Group controlId="isHighlight">
      <Form.Check {...register('isHighlight')} label="Is highlight" type="checkbox" />
    </Form.Group>
    <Form.Group controlId="q">
      <Form.Label>Search Query</Form.Label>
      <Form.Control {...register('q', { required: true })} type="text" className={errors.q ? 'is-invalid' : ''} />
      {errors.q && <Form.Text className="invalid-feedback">This field is required.</Form.Text>}
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>
  );
};

export default AdvancedSearch;
