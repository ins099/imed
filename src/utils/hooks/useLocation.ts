/* eslint-disable react-hooks/exhaustive-deps */
// useLocation.js

import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {extractPlaceDetails} from '../helpers';
const nullLocation = {
  accuracy: null,
  altitude: null,
  heading: null,
  latitude: null,
  longitude: null,
  speed: null,
};
const useLocation = () => {
  const [location, setLocation] = useState(nullLocation);
  const [currentLocationDetail, setCurrentLocationDetail] = useState({});
  const [errorLocation, setError] = useState(null);

  const permission =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
      : [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ];

  const checkLocationPermission = async () => {
    return await checkMultiple(permission);
  };

  const requestLocation = async () => {
    const result = await checkLocationPermission();
    const isAllowed = Object.values(result).includes(RESULTS.GRANTED);

    if (isAllowed) {
      getLocation();
    } else {
      const requestResult = await requestMultiple(permission);
      const requestAllowed = Object.values(requestResult).includes(
        RESULTS.GRANTED,
      );
      if (requestAllowed) {
        getLocation();
      } else {
        openSettingsAlert();
      }
    }
  };

  const fetchLocationInfo = async coords => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${coords.latitude},${coords.longitude}`,
            key: 'AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc',
          },
        },
      );
      if (response.data.results.length > 0) {
        return extractPlaceDetails(response.data.results[0]);
      } else {
        setError('No location information found');
        return null;
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async (position: any) => {
        setLocation(position.coords);
        const result = await fetchLocationInfo(position.coords);
        setCurrentLocationDetail(result);
        setError(null);
      },
      (error: any) => {
        setError(error.message);
        setLocation(nullLocation);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const openSettingsAlert = () => {
    Alert.alert(
      'Location Permission Required',
      'This app needs access to your location. Please enable it in settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            // Open app settings
            openSettings();
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return {
    location,
    error: errorLocation,
    requestLocation,
    fetchLocationInfo,
    currentLocationDetail,
  };
};

export default useLocation;
