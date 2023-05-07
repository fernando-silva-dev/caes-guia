import React from 'react';
import { Spinner } from 'react-bootstrap';
import './styles.css';

export default function Loader() {
  return (
    <div className="loader">
      <Spinner animation="border" size={'lg' as 'sm'} className="mx-auto" />
    </div>
  );
}
