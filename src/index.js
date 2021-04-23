import React from 'react';
import ReactDOM from 'react-dom';
import PhotoGallery from './PhotoGallery';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
  <React.Fragment>
    <PhotoGallery />
  </React.Fragment>,
  document.getElementById('app')
);
