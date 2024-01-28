import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const api = {
    key: 'c15ebb6710229bf75bff460c98354332',
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api.baseUrl}weather?q=${input}&units=metric&appid=${api.key}`,
      );
      setData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Unauthorized', 'Invalid API key or authentication issue.');
      } else if (error.response && error.response.status === 404) {
        Alert.alert('City Not Found', 'Please enter a valid city name.');
      } else {
        console.error('Error fetching data:', error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [api.key, api.baseUrl, input]);

  return (
    <ImageBackground
      source={require('./assects/bg.jpg')}
      resizeMode="cover"
      style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.appTitle}>Weather App</Text>
        <TextInput
          placeholder="Enter City"
          onChangeText={text => setInput(text)}
          value={input}
          placeholderTextColor="#fff"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={fetchDataHandler}
          disabled={loading}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        )}
        {data && (
          <View style={styles.weatherInfo}>
            <Text style={styles.cityText}>{`${data.name}, ${
              data.sys?.country || ''
            }`}</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString()}
            </Text>
            <Text style={styles.temperature}>{`${
              data.main?.temp || ''
            } °C `}</Text>
            <Text style={styles.temperatureRange}>{`Min: ${
              data.main?.temp_min || ''
            } °C | Max: ${data.main?.temp_max || ''} °C`}</Text>
            {data.weather && data.weather[0] && data.weather[0].icon && (
              <Image
                source={{
                  uri: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                }}
                style={styles.weatherIcon}
              />
            )}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 20,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  weatherInfo: {
    alignItems: 'center',
  },
  cityText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperatureRange: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
});

export default App;
