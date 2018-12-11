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
      currentPage: 1
    }
  }

  componentDidMount(){
    axios.get(`/showpage/${this.state.currentPage}`)
      .then(response => {
        this.setState({
          data: response.data.itemList
        })
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

  



  render() {
    console.log(this.state.data)
    // let visible = this.state.showImage ? "visible" : ""
    return (
      <div className="App" >
        {this.state.showGreeting && (
          <h1>Hello, world!</h1>
        )}
        {this.state.greetWithName && (
          <h1>Hello, Monica!</h1>
        )}

        {this.state.data[0] ? this.createTiles() : null}


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
