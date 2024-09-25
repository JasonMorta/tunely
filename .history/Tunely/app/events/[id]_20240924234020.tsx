const openMaps = async () => {
  const { latitude, longitude } = event.location;
  const label = encodeURIComponent(event.title);
  let url = '';

  if (Platform.OS === 'ios') {
    // Attempt to open Google Maps
    const googleMapsURL = `comgooglemaps://?q=${latitude},${longitude}`;
    const appleMapsURL = `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`;

    // Check if Google Maps is installed
    const supported = await Linking.canOpenURL(googleMapsURL);
    if (supported) {
      url = googleMapsURL;
    } else {
      // Fallback to Apple Maps
      url = appleMapsURL;
    }
  } else {
    // For Android, attempt to open Google Maps
    const googleMapsURL = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;
    const browserURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    // Check if Google Maps is installed
    const supported = await Linking.canOpenURL(googleMapsURL);
    if (supported) {
      url = googleMapsURL;
    } else {
      // Fallback to browser-based Google Maps
      url = browserURL;
    }
  }

  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error('An error occurred while trying to open maps:', error);
    Alert.alert(
      'Error',
      'Unable to open the maps application. Please try again later.'
    );
  }
};
