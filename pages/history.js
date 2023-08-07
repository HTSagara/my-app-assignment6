/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Henrique Toshio Sagara Student ID: 170954218 Date: 2023-08-06
*
********************************************************************************/ 
import React from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { searchHistoryAtom } from '@/store';
import styles from '@/styles/History.module.css'; // Import the CSS module

const History = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const parsedHistory = searchHistory.map((h) => {
    const params = new URLSearchParams(h);
    const entries = params.entries();
    return Object.fromEntries(entries);
  });

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory((current) => {
      const updatedHistory = [...current];
      updatedHistory.splice(index, 1);
      return updatedHistory;
    });
  };

  return (
    <Card>
      <Card.Body>
        {parsedHistory.length === 0 ? (
          <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
        ) : (
          <ListGroup>
            {parsedHistory.map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                onClick={(e) => historyClicked(e, index)}
                className={styles.historyListItem} // Add the className value
              >
                {Object.keys(historyItem).map((key) => (
                  <React.Fragment key={key}>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </React.Fragment>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default History;
