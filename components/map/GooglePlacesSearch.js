import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { withTheme } from '@utils/Themes';
import { getMapSearchStyle } from '@styles/Map';

const GooglePlacesSearch = ({ theme, onPress, placeholder }) => {
    const [searchText, setSearchText] = useState('');
    const [predictions, setPredictions] = useState([]);
    const styles = getMapSearchStyle(theme);
    const inputRef = useRef(null);

    const clearSearch = () => {
        setSearchText('');
        setPredictions([]);
        inputRef.current?.focus();
    };

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

    const handleSelectPlace = useCallback(
        (placeId, description) => {

            // Update UI state immediately and synchronously
            setPredictions([]);
            setSearchText(description);

            // Dismiss keyboard after state update
            setTimeout(() => {
                Keyboard.dismiss();
                inputRef.current?.blur();
            }, 50);

            // Perform async place details fetch
            fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry&key=${Constants.manifest.extra.googlePlaces.apiKey}`,
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.result) {
                        onPress(null, data.result);
                    }
                })
                .catch((error) => {
                });
        },
        [onPress],
    );

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TextInput
                    ref={inputRef}
                    style={[
                        styles.textInput,
                        searchText ? styles.textInputWithClear : null,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.inputPlaceholderText}
                    value={searchText}
                    onChangeText={searchPlaces}
                />
                {searchText ? (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={clearSearch}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons
                            name='close-circle'
                            size={20}
                            color='#CCCCCC'
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
            {predictions.length > 0 && (
                <FlatList
                    style={styles.listView}
                    data={predictions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() =>
                                handleSelectPlace(
                                    item.place_id,
                                    item.description,
                                )
                            }
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
