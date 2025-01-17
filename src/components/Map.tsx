import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const containerStyle = {
  width: '100%',
  height: '400px',
  maxWidth: '800px', 
  margin: '0 auto',
};

const defaultCenter = {
  lat: 26.1445, // Default (Guwahati)
  lng: 91.7362, // Default (Guwahati)
};

export default function MapWithSearch() {
  const apiKey = 'AIzaSyBwmhmDjNgxhkyOWhBMzREOCAbR5RqXAG8'; 
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
      <div style={{ textAlign: 'center', padding: '0 10px' }}> 
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates}
          zoom={12}
        >
          <Marker position={coordinates} />
        </GoogleMap>

        <div style={{ marginTop: '20px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
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
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  }}
                />
                <div
                  className="autocomplete-dropdown-container"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginTop: '5px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                >
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? '#f1f1f1' : '#ffffff',
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
      </div>
    </LoadScript>
  );
}
