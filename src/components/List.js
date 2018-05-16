/*
Techdegree| Project 10
=====================================================================================
by Humberto Ventura
=====================================================================================
*/
import React from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

const List = ({photos}) => {

  let photoItems = photos.map(photo => {
    const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
    return <Photo url={url} />;
  });

  return(
    <ul>
      {
		  // if photos lenght is bigger than 0, show photos, if not activate Not Found component
        (photos.length > 0) ? photoItems : <NotFound/> 
      }
    </ul>
  );
};


export default List;
