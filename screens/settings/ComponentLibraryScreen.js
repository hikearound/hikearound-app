import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@utils/Themes';
import storyChangeEmitter from '@utils/StorybookEmitter';
import StorybookUIRoot from '../../storybook';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

function ComponentLibraryScreen({ theme, navigation }) {
    const updateTitle = useCallback(
        ({ kind, story }) => {
            if (!kind && !story) {
                navigation.setOptions({ headerTitle: '' });
                return;
            }

            const storyTitle = story ? `${kind} - ${story}` : kind;
            navigation.setOptions({ headerTitle: storyTitle });
        },
        [navigation],
    );

    useEffect(() => {
        navigation.setOptions({ headerTitle: '' });
        storyChangeEmitter.on('storyChange', updateTitle);

        return () => {
            storyChangeEmitter.removeListener('storyChange', updateTitle);
        };
    }, [navigation, updateTitle]);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.rootBackground },
            ]}
        >
            <StorybookUIRoot />
        </View>
    );
}

export default withTranslation()(withTheme(ComponentLibraryScreen));
