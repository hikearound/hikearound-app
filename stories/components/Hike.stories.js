import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { select } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import MapWrapper from '@components/map/Wrapper';
import { StoryContainer } from '../styles/Story';
import withNavigation from '../utils/StoryDecorators';
import { withThemeSelection, getMapTheme } from '../utils/ThemeUtils';
import { MapContainer, SimpleMapWrapper } from '../styles/Map';
import {
    loopCoordinates,
    loopRegion,
    outAndBackCoordinates,
    outAndBackRegion,
} from '../constants/Trail';
import { HIKE_NOTES } from '../constants/Notes';

const mockStore = {
    getState: () => ({
        map: {
            region: loopRegion,
            coordinates: [],
            isLoading: false,
        },
        user: {
            location: null,
        },
    }),
    dispatch: () => {},
    subscribe: () => () => {},
};

const HikeScreen = ({
    theme,
    themeName,
    isLoading: propIsLoading,
    coordinates: propCoordinates,
    region: propRegion,
}) => {
    const knobRoute = select('Route', { loop: 'loop', out: 'out' }, 'out');
    const knobIsLoading = select(
        'Loading',
        { true: 'true', false: 'false' },
        'false',
    );
    const distance = select(
        'Distance',
        { 2.5: '2.5', '5.0': '5.0', 7.5: '7.5' },
        '5.0',
    );
    const elevation = select(
        'Elevation',
        { 500: '500', 1000: '1000', 1500: '1500' },
        '1000',
    );

    return (
        <StoryContainer backgroundColor={theme.background}>
            <MapContainer>
                <SimpleMapWrapper>
                    <ThemeProvider theme={getMapTheme(themeName)}>
                        <MapWrapper
                            coordinates={propCoordinates}
                            region={propRegion}
                            distance={parseFloat(distance)}
                            elevation={parseInt(elevation, 10)}
                            route={knobRoute}
                            isLoading={
                                propIsLoading || knobIsLoading === 'true'
                            }
                            hid='test-hike'
                            modalType='map'
                        />
                    </ThemeProvider>
                </SimpleMapWrapper>
            </MapContainer>
        </StoryContainer>
    );
};

HikeScreen.propTypes = {
    theme: PropTypes.object.isRequired,
    themeName: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    coordinates: PropTypes.array.isRequired,
    region: PropTypes.object.isRequired,
};

HikeScreen.defaultProps = {
    isLoading: false,
};

const stories = storiesOf('HikeMap', module);

stories.addDecorator(withBackgrounds);
stories.addDecorator((Story) => {
    const content = <Story />;
    return withNavigation(() => content, {
        headerTitle: 'HikeMap',
        additionalProviders: [
            (props) => <Provider store={mockStore} {...props} />,
        ],
    });
});

stories.add(
    'Loading State',
    () =>
        withThemeSelection(HikeScreen)({
            isLoading: true,
            coordinates: loopCoordinates,
            region: loopRegion,
        }),
    {
        notes: HIKE_NOTES.LOADING_STATE,
    },
);

stories.add(
    'Loop Trail',
    () =>
        withThemeSelection(HikeScreen)({
            coordinates: loopCoordinates,
            region: loopRegion,
        }),
    {
        notes: HIKE_NOTES.LOOP_TRAIL,
    },
);

stories.add(
    'Out and Back Trail',
    () =>
        withThemeSelection(HikeScreen)({
            coordinates: outAndBackCoordinates,
            region: outAndBackRegion,
        }),
    {
        notes: HIKE_NOTES.OUT_AND_BACK_TRAIL,
    },
);
