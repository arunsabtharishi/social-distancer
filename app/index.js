import React from 'react'
import ReactDOM from 'react-dom'
import Location from './components/Location'
import './index.css'
import { geolocated } from "react-geolocated"

import Geoloc from './components/Geoloc'

class App extends React.Component {
    render() {
        return(
			<div>
                <p>{this.props.coords && this.props.coords.latitude}</p>
                <Geoloc {...this.props} />
			</div>            
        )
    }
}


const MainWithGeoloc = geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(App);
  
  ReactDOM.render(<MainWithGeoloc />, document.getElementById('root'));
