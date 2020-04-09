import React from 'react';
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
import { v1 as uuidv1 } from 'uuid'
import {pingDeviceLocation} from '../utils/apis'

class Geoloc extends React.Component {  
constructor(props) {
  super(props)

  this.state = {
    id : null,
    isClose: 'false',
    isLoaded: 'false',
    isTopicConnected: 'false'
  }

  this.getInitialState = this.getInitialState.bind(this)
  this.setId = this.setId.bind(this)
}

  render() {
    if(this.state.isClose === 'true') {
      return (
        <div>
          
          <audio autoPlay preload='auto'> 
            <source src='https://media.vocaroo.com/mp3/l0HAKXK1ilz' type="audio/mp3"></source>
          </audio>
          <h1 className='blink_text'>Maintain social distancing</h1>
        </div>
      )
    }
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ?
          <div>
          <h1>
              Good job! Thanks for maintaining social distance!
          </h1> 
          <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
              <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
            </tbody>
          </table>
          </div>
          : <div>Getting the location data&hellip; </div>;
    
  }

  getInitialState() {
    return localStorage.getItem('id');
  }

  setId (id) {
      var id1 = localStorage.setItem( 'id', id );   
      this.setState( { id: id1 } );  
  }

  componentDidUpdate() {
    if(this.props.coords && this.state.isLoaded === 'false' && this.state.isTopicConnected === 'true') {
      this.getInitialState() ? this.getInitialState() : this.setId(uuidv1())
      const obj = {      
          id: this.getInitialState(),
          latitude: this.props.coords.latitude,
          longitude: this.props.coords.longitude,
          altitude: this.props.coords.altitude       
      }
      pingDeviceLocation(obj)
          .then((data)=>{
              this.setState(({results})=>({
                isLoaded: 'true'           
              }))              
          })
       }
  }

  componentDidMount() {
    let socket = new SockJS('https://ec2-18-191-180-167.us-east-2.compute.amazonaws.com:8080/websocket', {secure: true, rejectUnauthorized: false});
    let stompClient = Stomp.over(socket);
    var that = this;
    stompClient.connect({}, function(frame) {
      console.log('Connected!')
      that.setState({
        isTopicConnected: 'true'
      })  
     
        stompClient.subscribe('/topic/pushNotification', function (notification) {
          const obj = JSON.parse(notification.body)
          if(obj.id1 === that.getInitialState() || obj.id2 === that.getInitialState()) {
            that.setState({
              isClose: "true",
            })
          }
        });        
    });
  }  
}
 
export default Geoloc;
