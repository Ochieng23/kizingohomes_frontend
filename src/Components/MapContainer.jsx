import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const containerStyle = {
  position: "relative",
  width: "500px",
  height: "300px",
  margin: "30px",
};

class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onInfoWindowClose = () =>
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
    });

  render() {
    const { property } = this.props;
    const additionalMarkers = [
      { lat: -4.018770546019843, lng: 39.724627544177444, name: "Marker 1" },
      // Add more markers as needed
    ];

    return (
      <div className="flex">
        <div className="map-container mb-2" style={{ flex: 1 }}>
          <div className="map-wrapper">
            <Map
              google={this.props.google}
              zoom={14}
              containerStyle={containerStyle}
            >
              <Marker onClick={this.onMarkerClick} name={property.location} />

              {additionalMarkers.map((marker, index) => (
                <Marker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={this.onMarkerClick}
                  name={marker.name}
                />
              ))}

              <InfoWindow
                onClose={this.onInfoWindowClose}
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
        <div
          className="text-section txt-3xl"
          style={{ flex: 2, marginTop: "10%" }}
        >
          <h1 className="text-2xl font-bold ">
            Property Location: {property.location}
          </h1>
          {/* Display other property information */}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBhP1aL-1y9eVu7L9EgZ0_4-nY-ZK5n-74",
})(MapContainer);
