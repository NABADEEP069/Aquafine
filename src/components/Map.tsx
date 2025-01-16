import { SetStateAction, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 26.1445, // Default  (Guwahati)
  lng: 91.7362, // Default  (Guwahati)
};

export default function MapWithSearch() {
  const apiKey = 'AIzaSyBwmhmDjNgxhkyOWhBMzREOCAbR5RqXAG8'; //  API key
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(defaultCenter);


  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates({ lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
      <div style={{ marginBottom: '10px' }}>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search any location...',
                  className: 'location-search-input',
                })}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  marginBottom: '10px',
                }}
              />
              <div
                className="autocomplete-dropdown-container"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#fafafa' : '#ffffff',
                    cursor: 'pointer',
                    padding: '10px',
                  };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={suggestion.placeId}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={12}
      >
        {/* Marker at the selected location */}
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
}



 









