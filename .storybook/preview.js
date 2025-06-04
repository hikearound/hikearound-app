import React from 'react';
import storyChangeEmitter from '@utils/StorybookEmitter';
import { theme } from './ondevice-theme';
import { View, StyleSheet } from 'react-native';
import { defaultTheme } from '@constants/Themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultTheme.colors.rootBackground,
    },
});

export const decorators = [
    (Story) => {
        return (
            <View style={styles.container}>
                <Story />
            </View>
        );
    },
];

export const parameters = {
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    theme,
    notes: {
        enabled: true,
        markdown: true,
        clearOnStoryChange: true,
    },
};
