/*
Techdegree| Project 10
=====================================================================================
by Humberto Ventura
=====================================================================================
*/

import React from 'react';
import { withRouter } from 'react-router-dom';

/*page components come together*/
import List from './List';
import Nav from './Nav';
import Form from './Form';

/*constant that gather all elements*/
const Structure = ({title, currentPage, getPhotos, changePageName, history, photos, fetchPhotos}) => {


  if((title !== currentPage) && title !== "Search") {
    getPhotos(currentPage, title);
    changePageName(title);
  }

  return(
    <div className="container">
      <Form history={history} onSearch={term => fetchPhotos(term)}/>
      <Nav/>
      <div className="photo-container">
        { title !== "Search" && <h2>{title}</h2>}
        <List photos={photos} />
      </div>
    </div>
  );
}

export default withRouter(Structure);
