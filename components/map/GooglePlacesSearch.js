import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    Keyboard,
} from 'react-native';
import Constants from 'expo-constants';
import { withTheme } from '@utils/Themes';
import { getMapSearchStyle } from '@styles/Map';

const GooglePlacesSearch = ({ theme, onPress, placeholder }) => {
    const [searchText, setSearchText] = useState('');
    const [predictions, setPredictions] = useState([]);
    const styles = getMapSearchStyle(theme);
    const inputRef = useRef(null);

    const searchPlaces = async (text) => {
        setSearchText(text);
        if (text.length < 2) {
            setPredictions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                    text,
                )}&types=(cities)&components=country:us&key=${
                    Constants.manifest.extra.googlePlaces.apiKey
                }`,
            );
            const data = await response.json();
            setPredictions(data.predictions || []);
        } catch (error) {
            setPredictions([]);
        }
    };

    const handleSelectPlace = async (placeId) => {
        // Clear results immediately and blur input
        setPredictions([]);
        setSearchText('');
        Keyboard.dismiss();
        inputRef.current?.blur();

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry&key=${Constants.manifest.extra.googlePlaces.apiKey}`,
            );
            const data = await response.json();
            if (data.result) {
                onPress(null, data.result);
            }
        } catch (error) {
            // Error handling without console logging
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TextInput
                    ref={inputRef}
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.inputPlaceholderText}
                    value={searchText}
                    onChangeText={searchPlaces}
                />
            </View>
            {predictions.length > 0 && (
                <FlatList
                    style={styles.listView}
                    data={predictions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => handleSelectPlace(item.place_id)}
                            activeOpacity={0.7}
                            hitSlop={{
                                top: 10,
                                bottom: 10,
                                left: 10,
                                right: 10,
                            }}
                            delayPressIn={0}
                        >
                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                />
            )}
        </View>
    );
};

GooglePlacesSearch.propTypes = {
    theme: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default withTheme(GooglePlacesSearch);
