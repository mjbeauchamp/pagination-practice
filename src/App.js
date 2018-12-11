import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LazyLoad from 'react-lazyload'
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state = {
      showGreeting: true,
      greetWithName: false,
      showImage: false,
      data: [],
      currentPage: 2,
      totalPages: null,
      toggleList: false
    }
  }

  componentDidMount(){
    let currentPage = this.state.currentPage;
    this.getItems(currentPage)
  }

  getItems = (pageNumber) => {
    axios.get(`/showpage/${pageNumber}`)
      .then(response => {
        this.setState({
          data: response.data.itemList,
          totalPages: response.data.totalPages,
          toggleList: false
        })
      })
  }

  decreaseCurrentPage = (currentPage) => {
    this.setState({
      currentPage: currentPage - 1
    })
  }

  increaseCurrentPage = (currentPage) => {
    this.setState({
      currentPage: currentPage + 1
    })
  }


  clicked = (e) => {
    // this.setState({
    //   showImage: true
    // })
    let loaded = document.getElementById(e.target.id);
    loaded.classList.add("visible")
  }

  createTiles = () => {
    let tiles = this.state.data.map((val, i) => {
      return (
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id={`${i += 1}`}
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
          <h2>{val.name}</h2>
          <h2>{val.id}</h2>
        </LazyLoad>
      )
    })

    return tiles
  }

  createPaginationDropdown = () => {
    let pageArray = [];
    for(let i = 1; i < this.state.totalPages + 1; i++){
      pageArray.push(i)
    }
    console.log(pageArray)
    let pageList = pageArray.map((val, i) => {
      return (
        <li
          onClick={async () => {
            await this.setState({data: []})
            await this.getItems(val)
            this.setState({
              currentPage: val,
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
      <ul>{pageList}</ul>
    )
  }



  render() {
    console.log(this.state.totalPages)
    // let visible = this.state.showImage ? "visible" : ""

    //Setting up variables to determine if "Next" and "Previous" navigation should show
    let displayPrevious = this.state.currentPage === 1 ? "hide" : ""
    let displayNext = this.state.currentPage === this.state.totalPages ? "hide" : ""

    //toggle whether page list shows up
    let showHidePaginationList = this.state.toggleList ? "" : " hide";

    return (
      <div className="App" >
        {this.state.showGreeting && (
          <h1>Hello, world!</h1>
        )}
        {this.state.greetWithName && (
          <h1>Hello, Monica!</h1>
        )}

        {this.state.data[0] ? this.createTiles() : null}

        <hr />

        {/* Page Navigation */}
        <div 
          className="pagination-section"
        >
          <div className={`pagination-popup${showHidePaginationList}`}>
            {this.createPaginationDropdown()}
          </div>

          <h3 
            onClick={async () => {
              await this.setState({data: []})
              this.getItems(this.state.currentPage - 1)
              this.decreaseCurrentPage(this.state.currentPage)
            }}
            className={displayPrevious}
          >Previous</h3>

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

          <h3 
            onClick={async () => {
              await this.setState({data: []})
              this.getItems(this.state.currentPage + 1)
              this.increaseCurrentPage(this.state.currentPage)
            }}
            className={displayNext}
          >Next</h3>

        </div>
        

        {/* <button onClick={this.clicked}>Show Image</button>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="1"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="2"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="3"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="4"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="5"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="6"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="7"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="8"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="9"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad>
        <LazyLoad height={300} offset={-200} onclick={this.clicked}>
          <img 
          id="10"
          onLoad={(e) => this.clicked(e)}
          className={`my-image`}
          src="https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx" />
        </LazyLoad> */}
      </div>
    );
  }
}

export default App;
