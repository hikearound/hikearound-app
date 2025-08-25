import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { object } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ThemeProvider } from 'styled-components';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import RecentReviewList from '@components/feed/review/RecentReviewList';
import { StoryContainer } from '../styles/Story';
import withNavigation from '../utils/StoryDecorators';
import { withThemeSelection } from '../utils/ThemeUtils';
import { RECENT_REVIEW_LIST_NOTES } from '../constants/Notes';
import { defaultReviews, mockStore } from '../constants/Reviews';

const RecentReviewListScreen = ({
    theme,
    reviews: propReviews,
    hasTransparentBackground,
}) => {
    const knobReviews = object('Reviews', defaultReviews);
    const reviews = propReviews || knobReviews;

    return (
        <StoryContainer backgroundColor={theme.background}>
            <ThemeProvider theme={theme}>
                <RecentReviewList
                    reviews={reviews}
                    isLoading={false}
                    hasTransparentBackground={hasTransparentBackground}
                    style={{ flex: 1 }}
                />
            </ThemeProvider>
        </StoryContainer>
    );
};

RecentReviewListScreen.propTypes = {
    theme: PropTypes.object.isRequired,
    reviews: PropTypes.array,
    hasTransparentBackground: PropTypes.bool,
};

RecentReviewListScreen.defaultProps = {
    reviews: null,
    hasTransparentBackground: false,
};

const stories = storiesOf('RecentReviewList', module);

stories.addDecorator(withBackgrounds);
stories.addDecorator((Story) =>
    withNavigation(() => <Story />, {
        headerTitle: 'RecentReviewList',
        additionalProviders: [
            (props) => (
                <Provider store={createStore(() => mockStore)} {...props} />
            ),
        ],
    }),
);

stories.add('Default', () => withThemeSelection(RecentReviewListScreen)(), {
    notes: RECENT_REVIEW_LIST_NOTES.DEFAULT,
});

stories.add(
    'With Transparent Background',
    () =>
        withThemeSelection(RecentReviewListScreen)({
            hasTransparentBackground: true,
        }),
    {
        notes: RECENT_REVIEW_LIST_NOTES.TRANSPARENT,
    },
);

stories.add(
    'Empty State',
    () => withThemeSelection(RecentReviewListScreen)({ reviews: [] }),
    {
        notes: RECENT_REVIEW_LIST_NOTES.EMPTY,
    },
);
