import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { text, number, object, select } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RecentReviewListItem from '@components/feed/review/RecentReviewListItem';
import CenteredContainer from '../styles/Story';
import withNavigation from '../utils/StoryDecorators';
import { getTheme } from '../utils/ThemeUtils';

const mockStore = createStore(() => ({
    user: {
        uid: 'user123',
        name: 'John Doe',
        location: 'San Francisco, CA',
        photoURL:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    reviewReducer: {
        reviewData: {
            review1: {
                id: 'review1',
                hid: 'hike1',
                rating: 4,
                review: 'This was an amazing hike!',
                savedOn: new Date(),
                userLikes: [],
                user: {
                    uid: 'user1',
                    name: 'John Doe',
                    location: 'San Francisco, CA',
                    photoURL:
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                },
                hike: {
                    name: 'Mount Tamalpais',
                    city: 'Mill Valley',
                    state: 'CA',
                },
            },
        },
    },
    modalReducer: {
        closeAction: () => {},
        openAction: () => {},
        isVisible: false,
        modalType: null,
    },
}));

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

const ReviewItemScreen = ({ isLiked = false }) => {
    const props = getKnobs(isLiked);

    return (
        <CenteredContainer>
            <RecentReviewListItem
                rid={isLiked ? 'review456' : 'review123'}
                hid={isLiked ? 'hike456' : 'hike123'}
                hasRightMargin={false}
                {...props}
            />
        </CenteredContainer>
    );
};

ReviewItemScreen.propTypes = {
    isLiked: PropTypes.bool,
};

ReviewItemScreen.defaultProps = {
    isLiked: false,
};

const stories = storiesOf('RecentReviewListItem', module);

stories.addDecorator((Story) => {
    const content = <Story />;
    const theme = getTheme(
        select('Theme', { light: 'light', dark: 'dark' }, 'light'),
    );

    return withNavigation(() => content, {
        headerTitle: 'RecentReviewListItem',
        theme,
        additionalProviders: [
            (props) => <Provider store={mockStore} {...props} />,
        ],
    });
});

stories.add('Default', () => <ReviewItemScreen />);
stories.add('With Likes', () => <ReviewItemScreen isLiked />);
