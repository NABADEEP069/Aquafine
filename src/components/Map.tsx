import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 38.7749, 
  lng: -122.4194, 
};

export default function Mapp() {
  const apiKey = 'AIzaSyBwmhmDjNgxhkyOWhBMzREOCAbR5RqXAG8'; 

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
       
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}