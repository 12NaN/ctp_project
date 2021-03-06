import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Profile from './Profile.js';
import Loading from './Loading.js';

//creates icon used for marker/pin image
const myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});


export default class MapComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 40.760610,
      longitude: -74.935242,
      haveUsersLocation: false,
      zoom: 2,
      users: [],
      usersLoaded: false,
      draggable: false,
      loading: true,
    }
  }

    findUserLocation(position) {
      const location = position;
      this.props.getUserLocation(location);
    }


    //grabs list of users
    displayUsers() {

      fetch('/api/users/')
        .then(res => res.json())
        .then(users => 
        this.setState({
          users: users,
          usersLoaded: true
        }/*, () => console.log('Users fetched...', users)*/));
     }

     openPopup (marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      })
    }
  }

    //Asks for users location when map renders, then places a pin based on the position
    //coordinates
    componentDidMount() {


        //makes api call to grab users

        this.displayUsers();
 
    
      //browser method grabs user location coordinates with permission
      navigator.geolocation.getCurrentPosition((position) => {
  
      //if user hits accept, we receive a position object, if so,
      //we make an api call to receive user location (provides more accurate pin)
      if (position) {

        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {

            this.setState({
                loading: false,
                latitude: location.latitude,
                longitude: location.longitude,
                haveUsersLocation: true,
                zoom: 13,
            });
          });
         }
         this.findUserLocation(position);

      }, 

      () => {

        this.setState({
          loading: false
        })
  
      });
    }


  render() {
    //finds whether displayUsers() has grabbed users
    const haveUsersList = this.state.usersLoaded;

    //grabs current users position, and passes lat, long info into marker
    const position = [this.state.latitude, this.state.longitude];

    if(this.state.loading) {
      return <Loading />
    }
        


    return (
      <div className="map">

        <Map className="map" 
        ref={x=>window.map = x}
        center={position} 
        zoom={this.state.zoom} 
        scrollWheelZoom={false}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


        {/* ternary operator ? If we have users location we render a marker and it on the map : If not
        they'll see our default map position/state */}
        {this.state.haveUsersLocation ? 
  
           <Marker ref={this.openPopup}
           position={position} 
           icon={myIcon}
           draggable={true}>
            <Popup className="popup-style">
            <Profile
              header="Join and meet fellow travelers."
              lastname="User"
              message="Active traveler looking to meet those who enjoy museums and local food spots."
              recommendation="Pack light, and don't forget your toiletries."
              traveledto="Barcelona, Berlin, Rome."
              wishlistcities="I want to see London, Paris, and Tokyo!"/> 
            </Popup>
          </Marker> : null
        }
      
        {/*this grabs all users and their locations (lats and long) if haveUsersList = true in state*/}
        
        {/*if userstatus (passed down from App.js is true, meaning they've logged in
      and are an authenticate user) is true, we render all users*/}
        {this.props.userstatus && haveUsersList ? this.state.users.map( user => (
          <Marker key={user.id}
          position={[user.latitude, user.longitude]} 
          icon={myIcon}>
            <Popup className="popup-style">
            <Profile 
            firstname={user.firstName} 
            lastname={user.lastName}
            email={user.email}
            message={user.message}
            recommendation={user.recommendation}
            traveledto={user.traveledTo}
            wishlistcities={user.wishListCities}/>
              
            </Popup>
          </Marker> 
        )) : ''
      }

        </Map>
      </div>
    );
 }
}