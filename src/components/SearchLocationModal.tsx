/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ms, scale, vs} from 'react-native-size-matters';
import LocationSVG from '../assets/images/locationPin.svg';
import FindMapSVG from '../assets/images/findMap.svg';
import {COLORS} from '../utils/theme';
import CustomIcon from './common/CustomIcon';
import {TextNormal, TextSmall} from './common/Texts';
import _ from 'lodash';
import CustomButton from './common/CustomButton';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import useLocation from '../utils/hooks/useLocation';

export type PlaceResultType = {
  id: any;
  placeName: string;
  city: string;
  country: string;
  description: string;
  cantFind?: boolean;
};

interface SearchLocationModalProps {
  isVisible: boolean;
  isRegister?: boolean;
  closeModal: () => void;
  setAddress: (arg: any) => void;
}

const SearchLocationModal: React.FC<SearchLocationModalProps> = props => {
  const country = 'pk';
  const {location, currentLocationDetail, fetchLocationInfo} = useLocation();

  const [initialLocation, setInitialLocation] = useState([
    {
      id: 'cantFind',
      placeName: 'Couldn’t find address?',
      city: 'Show address on map',
      country: '',
      description: '',
      cantFind: true,
      onSelectPlace: () => {
        closeModal();
        setTimeout(() => {
          setShowMap(true);
        }, 500);
      },
    },
  ]);

  const {isVisible, closeModal, setAddress, isRegister} = props;
  const {top} = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PlaceResultType[]>(initialLocation);
  const [coordinates, setCoordinates] = useState({
    latitude: 40.1431,
    longitude: 47.5769,
  });

  // useEffect(() => {
  //   if (currentLocationDetail != null) {
  //     console.log('CURENT', currentLocationDetail);
  //     setInitialLocation(p => [...p, currentLocationDetail]);
  //   }
  // }, [currentLocationDetail]);

  const extractPlaceDetails = (result: any[]) => {
    return result.map(place => {
      const terms = place.terms;
      const placeName = terms[0].value; // First term is the main place name
      const city = terms[terms.length - 2].value; // Second last term is the city
      const countryy = terms[terms.length - 1].value; // Last term is the country
      const place_id = place.place_id;

      return {
        id: place_id,
        placeName,
        city,
        country: countryy,
        description: place.description, // Include description if needed
      };
    });
  };

  const fetchPlaces = async (searchQuery: string) => {
    const apiKey = 'AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc'; // Replace with your Google Places API key
    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      searchQuery,
    )}&region=${country}&key=${apiKey}`;
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      // console.log(JSON.stringify(data.predictions, null, 1));
      return setResults([
        ...extractPlaceDetails(data.predictions),
        initialLocation,
      ]);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const debouncedFetchPlaces = _.debounce(fetchPlaces, 500);

  useEffect(() => {
    if (query.length > 0) {
      debouncedFetchPlaces(query);
    }
  }, [query]);

  const onSelectPlace = (arg: PlaceResultType) => {
    setAddress(arg);
    setQuery('');
    closeModal();
  };

  const handleSaveAddress = async () => {
    try {
      setLoading(true);
      let result = await fetchLocationInfo(coordinates);
      setAddress(result);
      setQuery('');
      setShowMap(false);
      // console.log('RESUL', JSON.stringify(result, null, 1));
    } catch (error) {
      console.log('ERORR', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ReactNativeModal
        onBackButtonPress={closeModal}
        isVisible={isVisible}
        style={[
          {margin: 0, paddingTop: top, justifyContent: 'flex-start'},
          !isRegister && {backgroundColor: COLORS.white},
        ]}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={closeModal}>
        <View style={[styles.modalContainer]}>
          <View style={styles.textInputContainer}>
            <CustomIcon
              name="arrow-left"
              type="material-community"
              onPress={closeModal}
              size={ms(20)}
              color={COLORS.gray}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Search location"
              placeholderTextColor={COLORS.gray}
              value={query}
              onChangeText={text => setQuery(text)}
            />
            <CustomIcon
              name="highlight-remove"
              type="material-icons"
              onPress={() => {
                setQuery('');
                setResults(initialLocation);
              }}
              size={ms(20)}
              color={COLORS.gray}
            />
          </View>

          {!!results.length && (
            <FlatList
              data={results}
              style={styles.resultContainer}
              keyExtractor={item => item?.id?.toString()}
              renderItem={({item}) => (
                <LocationItem
                  item={item}
                  onSelectPlace={onSelectPlace}
                  key={item.id}
                  {...item}
                />
              )}
            />
          )}
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={showMap}
        style={{flex: 1, margin: 0}}
        onBackButtonPress={() => setShowMap(false)}>
        <View style={{flex: 1, paddingTop: top, backgroundColor: COLORS.white}}>
          <View style={styles.headerContainer}>
            <CustomIcon
              name="arrow-left"
              type="material-community"
              onPress={() => setShowMap(false)}
              containerStyle={{flex: 1}}
            />
            <TextNormal center bold textStyle={{flex: 2}}>
              SHOW_ON_MAP
            </TextNormal>
            <View style={{flex: 1}} />
          </View>
          <View style={styles.mapContaienr}>
            <MapView
              provider={
                Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
              } // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: location.latitude || 40.1431,
                longitude: location.longitude || 47.5769,
                latitudeDelta: 0.5,
                longitudeDelta: 0.21,
              }}>
              <Marker
                draggable={true}
                onDragEnd={e => setCoordinates(e.nativeEvent.coordinate)}
                coordinate={{
                  latitude: (location.latitude as unknown as number) || 40.1431,
                  longitude:
                    (location.longitude as unknown as number) || 47.5769,
                }}
              />
            </MapView>

            <CustomButton
              title="SAVE_ADDRESS"
              containerStyle={styles.btnContainer}
              disabled={!coordinates.latitude}
              loading={loading}
              onPress={handleSaveAddress}
            />
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default SearchLocationModal;

type LocationItemType = {
  item: PlaceResultType;
  onSelectPlace: (arg: PlaceResultType) => void;
  cantFind?: boolean;
};

const LocationItem: React.FC<LocationItemType> = ({
  item,
  cantFind,
  onSelectPlace,
}) => (
  <TouchableOpacity
    key={item?.id?.toString()}
    style={styles.resultItem}
    onPress={() => onSelectPlace(item)}>
    <View
      style={{
        height: ms(37),
        width: ms(37),
        backgroundColor: '#F1F5F7',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {cantFind ? <FindMapSVG /> : <LocationSVG />}
    </View>
    <View style={styles.itemTextContainer}>
      <TextNormal bold numberOfLines={1}>
        {item.placeName != '' ? item.placeName : item.description}
      </TextNormal>
      <TextSmall color={COLORS.gray}>
        {item.city + ', ' + item.country}
      </TextSmall>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    backgroundColor: 'transparent',
    padding: scale(12),
  },

  textInput: {
    flex: 1,
    color: COLORS.black,
    height: '100%',
    fontSize: scale(16),
    padding: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  resultContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 0,
    marginTop: vs(10),
  },
  resultItem: {
    height: vs(52),
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: vs(4),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGrey,
    paddingHorizontal: 10,
    gap: 10,
  },
  itemTextContainer: {
    gap: 3,
    width: '100%',
  },

  textInputContainer: {
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: vs(47),
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  mapContaienr: {
    flex: 1,
  },
  btnContainer: {
    position: 'absolute',
    bottom: vs(25),
    width: '80%',
    alignSelf: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
