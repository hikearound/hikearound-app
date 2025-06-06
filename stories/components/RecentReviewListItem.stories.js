import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { text, number, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { opacities } from '@constants/Index';
import RecentReviewListItem from '@components/feed/review/RecentReviewListItem';
import CenteredContainer from '../styles/Story';
import withNavigation from '../utils/StoryDecorators';
import { withThemeSelection } from '../utils/ThemeUtils';
import { RECENT_REVIEW_LIST_ITEM_NOTES } from '../constants/Notes';
import { mockStore } from '../constants/Reviews';

const getKnobs = (isLiked = false) => {
    const likeCount = number('Like Count', isLiked ? 5 : 0, {
        min: 0,
        max: 100,
    });
    const userLikes = Array.from(
        { length: likeCount },
        (_, i) => `user${i + 1}`,
    );
    const userName = isLiked ? 'Jane Smith' : 'John Doe';

    return {
        rating: number('Rating', 4),
        review: text(
            'Review',
            isLiked
                ? 'One of the best hikes I have ever done! The sunset views were incredible.'
                : 'This was an amazing hike! The views were breathtaking and the trail was well maintained.',
        ),
        savedOn: object('Reviewed On', new Date()),
        userLikes,
        user: object('User', {
            uid: 'user123',
            name: userName,
            location: isLiked ? 'Oakland, CA' : 'San Francisco, CA',
            photoURL:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        }),
        hike: object('Hike', {
            name: isLiked ? 'Mount Diablo' : 'Mount Tamalpais',
            city: isLiked ? 'Danville' : 'Mill Valley',
            state: 'CA',
        }),
    };
};

const ReviewItemScreen = ({ isLiked = false, theme }) => {
    const props = getKnobs(isLiked);

    return (
        <CenteredContainer backgroundColor={theme.background}>
            <ThemeProvider theme={theme}>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={action('card-pressed')}
                >
                    <RecentReviewListItem
                        rid={isLiked ? 'review456' : 'review123'}
                        hid={isLiked ? 'hike456' : 'hike123'}
                        hasRightMargin={false}
                        {...props}
                    />
                </TouchableOpacity>
            </ThemeProvider>
        </CenteredContainer>
    );
};

ReviewItemScreen.propTypes = {
    isLiked: PropTypes.bool,
    theme: PropTypes.object.isRequired,
};

ReviewItemScreen.defaultProps = {
    isLiked: false,
};

const stories = storiesOf('RecentReviewListItem', module);

stories.addDecorator(withBackgrounds);
stories.addDecorator((Story) => {
    const content = <Story />;
    return withNavigation(() => content, {
        headerTitle: 'RecentReviewListItem',
        additionalProviders: [
            (props) => (
                <Provider store={createStore(() => mockStore)} {...props} />
            ),
        ],
    });
});

stories.add('Default', () => withThemeSelection(ReviewItemScreen)(), {
    notes: RECENT_REVIEW_LIST_ITEM_NOTES.DEFAULT,
});

stories.add(
    'With Likes',
    () => withThemeSelection(ReviewItemScreen)({ isLiked: true }),
    {
        notes: RECENT_REVIEW_LIST_ITEM_NOTES.WITH_LIKES,
    },
);
