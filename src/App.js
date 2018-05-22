/*
Techdegree| Project 10
=====================================================================================
by Humberto Ventura
=====================================================================================
*/

// react import
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';


import Key from './components/config.js';
import NotFound from './components/NotFound';
import Structure from './components/Structure';
 
import './App.css';



class App extends Component {
	// Constructor
  constructor(props) {
    super(props);
	 // object literal initial state
    this.state = {
		// photos array
      photos: [],
	   //currentPage will hold an empty string in which will be attached page title
      currentPage: ""
	 }
  }
  
  // Methods

// this function will display title and photos related with main titles or search, otherwise will return latest fotos by default
getPhotosPerPage(currentPage, title, Key) {
    // reload when current page is different from the last page visited
    if((currentPage !== title) && title !== "Search") {
      if(title === "Home") {
        this.getLatestPhotos(Key);
      } else {
        this.getSearchResults(title,Key);
      }
    }
  }// end get photos
  
  
  // get photos critery

// recent photos, when a search is not preformed
  getLatestPhotos(Key) {
axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&format=json&nojsoncallback=1`)
    .then(result => {
	  // populate fotos array from Flickr, acess data from Flickr
      this.setState({photos: result.data.photos.photo});
      console.log(this.state.photos);
    })// state
	// error
    .catch(error => {
      console.log("Error occured while retrieving data from Flickr:");
    });
  } // end latest fotos


// search is preformed
  getSearchResults(term, Key) {
	  	// adding search term to url string
 axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&text=${term}&format=json&nojsoncallback=1`)
      .then(result => {
        // console.log(result);
        this.setState({photos: result.data.photos.photo});
        console.log(this.state.photos);
      })
      .catch(error => {
        console.log("Error occured while retrieving data from Flickr: ");
      });
  } // end search

  changePageTitle(currentPage) {
      this.setState({currentPage});
  }

  render() {
    return (
	
	<BrowserRouter basename="/react-flickr-gallery">
	   <div className='App'>
        <Switch>
          <Route exact path='/' render={ () => <Structure title="Home" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this.getSearchResults(term, Key)} />} />
          <Route path='/cats' render={() => <Structure title="Cats" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this.getSearchResults(term, Key)} />} />
          <Route path='/dogs' render={() => <Structure title="Dogs" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this.getSearchResults(term, Key)} />} />
          <Route path='/coffee' render={() => <Structure title="Coffee" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this.getSearchResults(term, Key)} />} />
          <Route path='/search' render={() => <Structure title="Search" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this.getSearchResults(term, Key)} />} />
          <Route component={NotFound} />
        </Switch>
		</div>
      </BrowserRouter>
    );
  }
}

export default App;
