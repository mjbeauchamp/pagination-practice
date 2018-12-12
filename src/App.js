import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LazyLoad from 'react-lazyload'
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state = {
      //"data" will hold the correct, filtered data list of "page items" that gets sent from the backend, tailored for this specific current page
      data: [],
      //"currentPage" holds a record of which page of items the user wants to see. Default is page 1.
      currentPage: 1,
      //"totalPages" is how many pages of data there are. This is calculated on the back end, based on two factors: the total number of items in your raw data array and the number of items that you want to show per page.
      totalPages: null,
      //This variable allows us to show or hide the page navigation popup 
      toggleList: false
    }
  }

  componentDidMount(){
    //This hits the server endpoint, which will send forward just the items that should be shown for the current page
    this.getItems(this.state.currentPage)
  }

  getItems = (pageNumber) => {
    //This hits the server endpoint, passing whatever number is passed in as the parameter. 
    //This passed parameter will be the page number whose data is sent forward
    axios.get(`/showpage/${pageNumber}`)
      .then(response => { 
        this.setState({
          //This incorporates the data sent back from the server
          data: response.data.itemList,
          totalPages: response.data.totalPages,
          //This makes sure that any time a new page is visited, the page navigation popup is hidden
          toggleList: false
        })
      })
  }

  //This is triggered when the person hits the Previous button
  //It changes the current page to reflect the new value
  decreaseCurrentPage = (currentPage) => {
    this.setState({
      currentPage: currentPage - 1
    })
  }

  //This is triggered when the person hits the Next button
  //It changes the current page to reflect the new value
  increaseCurrentPage = (currentPage) => {
    this.setState({
      currentPage: currentPage + 1
    })
  }

  //This is triggered when an image is loaded by LazyLoad. It adds a class that makes the image visible gradually, rather than having it pop on the page all at once
  loaded = (e) => {
    let loaded = document.getElementById(e.target.id);
    loaded.classList.add("visible")
  }

  //This creates the JSX to display the actual list of items from the back end
  createTiles = () => {
    let tiles = this.state.data.map((val, i) => {
      return (
        <LazyLoad 
          key={val.id}
          height={300} 
          offset={-200} 
          onclick={this.clicked}
        >
          <img 
          id={`${i += 1}`}
          onLoad={(e) => this.loaded(e)}
          className={`my-image`}
          src={val.url} />
          <h2>{val.name}</h2>
          <h2>{val.id}</h2>
        </LazyLoad>
      )
    })

    return tiles
  }

  //This creates the popup that displays an unordered list of the page numbers you can visit
  createPaginationDropdown = () => {
    //This array will end up holding a simple list of the page numbers that should be available
    let pageArray = [];
    //Thiss fills the page array with numbers, based on the totalPages info that was calculated in the backend and sent to us when we did our GET request
    for(let i = 1; i < this.state.totalPages + 1; i++){
      pageArray.push(i)
    }
    console.log(pageArray)
    //This simply maps over the pageArray and creates a list of possible pages that the user could click on to navigate to that page
    let pageList = pageArray.map((val, i) => {
      return (
        <li
          key={i}
          onClick={async () => {
            //Here we're clearing out the current data so that the LazyLoad doesn't result in old data still being shown on the page when the new data is sent forward
            await this.setState({data: []})
            //Here we're hitting the server endpoint and getting a new list of items, based on the page number that the user clicked on
            await this.getItems(val)
            this.setState({
              //This resets the current page
              currentPage: val,
              //This will hide the popup list when one of the list items is clicked on
              toggleList: !this.state.toggleList
            })
          }}
        >
          <h2>
            Page {val}
          </h2>
        </li>
      )
    })

    return (
      //This returns the unordered list, which will pop up and contain the list of page numbers a user can click on
      <ul>{pageList}</ul>
    )
  }



  render() {
    console.log(this.state.totalPages)

    //Setting up variables to determine if "Next" and "Previous" navigation should show
    let displayPrevious = this.state.currentPage === 1 ? "hide" : ""
    let displayNext = this.state.currentPage === this.state.totalPages ? "hide" : ""

    //toggle whether page list shows up
    let showHidePaginationList = this.state.toggleList ? "" : " hide";

    return (
      <div className="App" >
        <h1>Cute Animals</h1>
        <h4>Pagination and LazyLoad Example</h4>

        <hr /> 

        {/* This makes it show IF we've received the item data from the server, the tiles will be displayed. */}
        {this.state.data[0] ? this.createTiles() : null}

        <hr />

        {/* Page Navigation */}
        <div 
          className="pagination-section"
        >
          {/* This is the pagination popup. It will only be shown if this.state.toggleList is true. */}
          <div className={`pagination-popup${showHidePaginationList}`}>
            {this.createPaginationDropdown()}
          </div>

          {/* Previous Button */}
          <h3 
            onClick={async () => {
              await this.setState({data: []})
              this.getItems(this.state.currentPage - 1)
              this.decreaseCurrentPage(this.state.currentPage)
            }}
            className={displayPrevious}
          >Previous</h3>
          
          {/* Page Info Seciton. If you click on this, it displays the page list popup */}
          <div 
            onClick={() => {
              this.setState({
                toggleList: !this.state.toggleList
              })
            }}
            className="show-page-section"
          >
            <h2>Page 
              <span className="current-page-number"> {this.state.currentPage} </span>  
              of {this.state.totalPages}
            </h2>
          </div>

          {/* Next button */}
          <h3 
            onClick={async () => {
              await this.setState({data: []})
              this.getItems(this.state.currentPage + 1)
              this.increaseCurrentPage(this.state.currentPage)
            }}
            className={displayNext}
          >Next</h3>

        </div>
      </div>
    );
  }
}

export default App;
