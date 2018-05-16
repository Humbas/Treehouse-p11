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

/*components*/
import Form from './components/Form';
import Nav from './components/Nav';
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

// this function will display title and photos related with main titles, otherwise will return latest fotos by default
getPhotosPerPage(currentPage, title) {
    // reload when current page is different from the last page visited
    if((currentPage !== title) && title !== "Search") {
      if(title === "Home") {
        this.getLatestPhotos();
      } else {
        this.getSearchResults(title);
      }
    }
  }// end get photos
  
  
  // get photos critery

// recent photos, when a search is not preformed
  getLatestPhotos() {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=748c099de145d35660505013da5a508a&format=json&nojsoncallback=1')
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
  getSearchResults(term) {
	  	// adding search term to url string
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=748c099de145d35660505013da5a508a&text=${term}&format=json&nojsoncallback=1`)
      .then(result => {
        // console.log(result);
        this.setState({photos: result.data.photos.photo});
        console.log(this.state.photos);
      })
      .catch(error => {
        console.log("Error occured while fetching data from Flickr: ");
      });
  } // end search

  changePageTitle(currentPage) {
      this.setState({currentPage});
  }

  render() {
    return (
      <BrowserRouter basename="/react-flickr-gallery">
        <Switch>
          <Route exact path='/' render={ () => <Structure title="Home" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this. getSearchResults(term)} />} />
          <Route path='/cats' render={() => <Structure title="Cats" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this. getSearchResults(term)} />} />
          <Route path='/dogs' render={() => <Structure title="Dogs" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this. getSearchResults(term)} />} />
          <Route path='/coffee' render={() => <Structure title="Coffee" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this. getSearchResults(term)} />} />
          <Route path='/search' render={() => <Structure title="Search" {...this.state}  getPhotos={(page,title) => this.getPhotosPerPage(page,title)} changePageName={title => this.changePageTitle(title)} fetchPhotos={term => this. getSearchResults(term)} />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
