import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@constants/Themes';

const withNavigation = (story, options = {}) => {
    const content = story();
    const { additionalProviders = [], theme = defaultTheme.colors } = options;

    const wrappedContent = additionalProviders.reduce(
        (acc, Provider) => <Provider>{acc}</Provider>,
        content,
    );

    return <ThemeProvider theme={theme}>{wrappedContent}</ThemeProvider>;
};

export default withNavigation;
