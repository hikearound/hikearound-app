import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { withTranslation } from 'react-i18next';
import storyChangeEmitter from '@utils/StorybookEmitter';
import StorybookUIRoot from '../../storybook';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

function ComponentLibraryScreen({ navigation }) {
    const updateTitle = useCallback(
        ({ kind, story }) => {
            if (!kind && !story) {
                navigation.setOptions({ headerTitle: 'Component Library' });
                return;
            }

            const storyTitle = story ? `${kind} - ${story}` : kind;
            navigation.setOptions({ headerTitle: storyTitle });
        },
        [navigation],
    );

    useEffect(() => {
        storyChangeEmitter.on('storyChange', updateTitle);

        return () => {
            storyChangeEmitter.removeListener('storyChange', updateTitle);
        };
    }, [navigation, updateTitle]);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
        return () => {
            StatusBar.setBarStyle('light-content');
        };
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <StorybookUIRoot standalone={false} />
        </View>
    );
}

export default withTranslation()(ComponentLibraryScreen);
