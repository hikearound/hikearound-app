import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { select, object, withKnobs, boolean } from '@storybook/addon-knobs';
import { withTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { defaultTheme, darkTheme } from '@constants/Themes';
import RecentReviewList from '@components/feed/review/RecentReviewList';
import CenteredContainer from '../styles/Story';
import { getUniqueAvatarUrl, resetUsedPhotos } from '../utils/avatarUtils';

const TranslatedRecentReviewList = withTranslation()(RecentReviewList);
const Stack = createStackNavigator();

const getTheme = (themeName) => {
    const theme = themeName === 'dark' ? darkTheme.colors : defaultTheme.colors;
    return {
        ...theme,
        mode: themeName,
    };
};

// Create a mock store with review reducer
const mockStore = createStore(() => ({
    user: {
        uid: 'user123',
        name: 'John Doe',
        location: 'San Francisco, CA',
        photoURL: getUniqueAvatarUrl('John Doe'),
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
                    photoURL: getUniqueAvatarUrl('John Doe'),
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

// Reset used photos before generating sample reviews
resetUsedPhotos();

const sampleReviews = [
    {
        id: 'review1',
        hid: 'hike1',
        rating: 5,
        review: 'One of the best hikes I have ever done! The sunset views were incredible and the trail was perfectly maintained.',
        savedOn: new Date(),
        userLikes: ['user1', 'user2', 'user3', 'user4', 'user5'],
        user: {
            uid: 'user1',
            name: 'John Doe',
            location: 'San Francisco, CA',
            photoURL: getUniqueAvatarUrl('John Doe'),
        },
        hike: {
            name: 'Mount Tamalpais',
            city: 'Mill Valley',
            state: 'CA',
        },
    },
    {
        id: 'review2',
        hid: 'hike2',
        rating: 4,
        review: 'Great trail with amazing views of the bay. The wildflowers were in full bloom.',
        savedOn: new Date(),
        userLikes: ['user1', 'user2'],
        user: {
            uid: 'user2',
            name: 'Jane Smith',
            location: 'Oakland, CA',
            photoURL: getUniqueAvatarUrl('Jane Smith'),
        },
        hike: {
            name: 'Mount Diablo',
            city: 'Danville',
            state: 'CA',
        },
    },
    {
        id: 'review3',
        hid: 'hike3',
        rating: 3,
        review: 'Nice trail with good views. A bit crowded on weekends but worth it for the scenery.',
        savedOn: new Date(),
        userLikes: ['user3'],
        user: {
            uid: 'user3',
            name: 'Mike Johnson',
            location: 'Berkeley, CA',
            photoURL: getUniqueAvatarUrl('Mike Johnson'),
        },
        hike: {
            name: 'Tilden Regional Park',
            city: 'Berkeley',
            state: 'CA',
        },
    },
    {
        id: 'review4',
        hid: 'hike4',
        rating: 5,
        review: 'Absolutely stunning views of the Golden Gate Bridge. Perfect for a morning hike with friends.',
        savedOn: new Date(),
        userLikes: ['user1', 'user2', 'user3', 'user4'],
        user: {
            uid: 'user4',
            name: 'Sarah Wilson',
            location: 'Sausalito, CA',
            photoURL: getUniqueAvatarUrl('Sarah Wilson'),
        },
        hike: {
            name: 'Marin Headlands',
            city: 'Sausalito',
            state: 'CA',
        },
    },
];

class ReviewListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: props.reviews || sampleReviews,
            layout: props.layout || 'default',
            activeSlideAlignment: props.activeSlideAlignment || 'start',
            hasTransparentBackground: props.hasTransparentBackground || false,
        };
    }

    render() {
        const {
            reviews,
            layout,
            activeSlideAlignment,
            hasTransparentBackground,
        } = this.state;

        return (
            <CenteredContainer>
                <TranslatedRecentReviewList
                    reviews={reviews}
                    layout={layout}
                    activeSlideAlignment={activeSlideAlignment}
                    hasTransparentBackground={hasTransparentBackground}
                />
            </CenteredContainer>
        );
    }
}

ReviewListScreen.propTypes = {
    reviews: PropTypes.array,
    layout: PropTypes.string,
    activeSlideAlignment: PropTypes.string,
    hasTransparentBackground: PropTypes.bool,
};

ReviewListScreen.defaultProps = {
    reviews: sampleReviews,
    layout: 'default',
    activeSlideAlignment: 'start',
    hasTransparentBackground: false,
};

const stories = storiesOf('RecentReviewList', module);

stories.addDecorator(withKnobs);

stories.addDecorator((Story) => (
    <Provider store={mockStore}>
        <ThemeProvider
            theme={getTheme(
                select('Theme', { light: 'light', dark: 'dark' }, 'light'),
            )}
        >
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='ReviewList'>
                        {() => <Story />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    </Provider>
));

const getKnobs = () => {
    const activeSlideAlignment = select(
        'Card Alignment',
        {
            start: 'start',
            center: 'center',
            end: 'end',
        },
        'start',
    );

    return {
        activeSlideAlignment,
    };
};

stories.add('Default', () => <ReviewListScreen />, {
    notes: "The default RecentReviewList component showing a list of recent hike reviews. Each review includes the user's name, location, rating, and review text. The list is scrollable and supports various interactions like liking reviews.",
});

stories.add(
    'With Custom Layout',
    () => {
        const layout = select(
            'Layout',
            { default: 'default', compact: 'compact' },
            'compact',
        );
        return <ReviewListScreen layout={layout} />;
    },
    {
        notes: 'This variant demonstrates the RecentReviewList with a custom layout. The compact layout provides a more condensed view of the reviews, showing less information but allowing more reviews to be visible at once.',
    },
);

stories.add(
    'With Transparent Background',
    () => {
        const hasTransparentBackground = boolean(
            'Transparent Background',
            true,
        );
        return (
            <ReviewListScreen
                hasTransparentBackground={hasTransparentBackground}
            />
        );
    },
    {
        notes: 'This variant shows the RecentReviewList with a transparent background. This is useful when the list needs to blend with the background of its container or when overlaying on other content.',
    },
);

stories.add(
    'With Custom Slide Alignment',
    () => {
        const activeSlideAlignment = select(
            'Slide Alignment',
            { start: 'start', center: 'center', end: 'end' },
            'center',
        );
        return <ReviewListScreen activeSlideAlignment={activeSlideAlignment} />;
    },
    {
        notes: 'This variant demonstrates different slide alignment options for the review list. The alignment affects how the active review is positioned within the viewport, with options for start, center, or end alignment.',
    },
);

stories.add('Empty', () => (
    <ReviewListScreen
        reviews={object('Reviews', [])}
        layout={select(
            'Layout',
            { default: 'default', stack: 'stack', tinder: 'tinder' },
            'default',
        )}
        activeSlideAlignment={getKnobs().activeSlideAlignment}
        hasTransparentBackground={boolean('Transparent Background', false)}
    />
));
