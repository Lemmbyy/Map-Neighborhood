import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  state = {
    venues : []
  }



  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBKR_udafNBt1Lw0od1nVQ5JfXz1y123c4&callback=initMap")
    window.initMap = this.initMap
  }


  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id : "RKZEX2QRD2YPDFT4G0HEK3NTXIPJVVS0XGVXYTAVPMB1RCAP",
      client_secret : "K0O1YYM0FPB2ZFSMIU5PHZ0HT5M3WUHMUWN4ZUHDICVCVKGR",
      query : "food",
      near : "Sydney",
      v : "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues : response.data.response.groups[0].items
        },this.renderMap())
        console.log()
      })
      .catch(error => {
        console.log("ERROR: " + error)
      })

  }


  initMap = () => {

    //Create a Map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });


     //Create an Info Window
     var infowindow = new window.google.maps.InfoWindow();


    //Display dynamic markers
    this.state.venues.map(myVenue => {

      var contentString = `${myVenue.venue.name}`

      // create a marker
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })

      //Click On A Marker!
      marker.addListener('click', function() {

        //Change the Content
        infowindow.setContent(contentString)


        //Open an Info Window
        infowindow.open(map, marker)
      })

      })
    }


    
    


  render() {
    return (
      <main>
        <div id="map">

        </div>
      </main>
      
    );
  }
}



function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentElement.insertBefore(script, index)
}

export default App;
