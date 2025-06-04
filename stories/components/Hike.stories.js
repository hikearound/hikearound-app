import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { select, object } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import MapWrapper from '@components/map/Wrapper';
import CenteredContainer from '../styles/Story';
import withNavigation from '../utils/StoryDecorators';
import { getMapTheme } from '../utils/ThemeUtils';
import { MapContainer, SimpleMapWrapper } from '../styles/Map';
import {
    loopCoordinates,
    loopRegion,
    outAndBackRegion,
    outAndBackCoordinates,
} from '../constants/Trail';

const mockStore = {
    getState: () => ({
        map: {
            region: {
                latitude: 37.7749,
                longitude: -122.4194,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
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

const HikeScreen = () => {
    const region = object('Region', loopRegion);
    const coordinates = object('Coordinates', loopCoordinates);
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
    const route = select('Route', { loop: 'loop', out: 'out' }, 'out');
    const isLoading = select(
        'Loading',
        { true: 'true', false: 'false' },
        'false',
    );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0)',
            }}
        >
            <CenteredContainer>
                <MapContainer>
                    <SimpleMapWrapper>
                        <MapWrapper
                            coordinates={coordinates}
                            region={region}
                            distance={parseFloat(distance)}
                            elevation={parseInt(elevation, 10)}
                            route={route}
                            isLoading={isLoading === 'true'}
                            hid='test-hike'
                            modalType='map'
                        />
                    </SimpleMapWrapper>
                </MapContainer>
            </CenteredContainer>
        </View>
    );
};

const stories = storiesOf('HikeMap', module);

stories.addDecorator((Story) => {
    const content = <Story />;
    const theme = getMapTheme(
        select('Theme', { light: 'light', dark: 'dark' }, 'light'),
    );

    return withNavigation(() => content, {
        headerTitle: 'HikeMap',
        theme,
        additionalProviders: [
            (props) => <Provider store={mockStore} {...props} />,
        ],
    });
});

stories.add(
    'Loading State',
    () => {
        const isLoading = select(
            'Loading',
            { true: 'true', false: 'false' },
            'true',
        );
        return <HikeScreen isLoading={isLoading === 'true'} />;
    },
    {
        notes: 'This story demonstrates the loading state of the Hike component. When loading is true, it shows a loading indicator while the map data is being fetched.',
    },
);

stories.add(
    'Loop Trail',
    () => {
        const region = object('Region', loopRegion);
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
        const isLoading = select(
            'Loading',
            { true: 'true', false: 'false' },
            'false',
        );

        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
                <CenteredContainer>
                    <MapContainer>
                        <SimpleMapWrapper>
                            <MapWrapper
                                coordinates={loopCoordinates}
                                region={region}
                                distance={parseFloat(distance)}
                                elevation={parseInt(elevation, 10)}
                                route='loop'
                                isLoading={isLoading === 'true'}
                                hid='test-hike'
                                modalType='map'
                            />
                        </SimpleMapWrapper>
                    </MapContainer>
                </CenteredContainer>
            </View>
        );
    },
    {
        notes: 'This story shows a loop trail route. The trail starts and ends at the same point, creating a circular path. You can adjust the distance and elevation using the knobs.',
    },
);

stories.add(
    'Out and Back Trail',
    () => {
        const region = object('Region', outAndBackRegion);
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
        const isLoading = select(
            'Loading',
            { true: 'true', false: 'false' },
            'false',
        );

        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
                <CenteredContainer>
                    <MapContainer>
                        <SimpleMapWrapper>
                            <MapWrapper
                                coordinates={outAndBackCoordinates}
                                region={region}
                                distance={parseFloat(distance)}
                                elevation={parseInt(elevation, 10)}
                                route='out'
                                isLoading={isLoading === 'true'}
                                hid='test-hike'
                                modalType='map'
                            />
                        </SimpleMapWrapper>
                    </MapContainer>
                </CenteredContainer>
            </View>
        );
    },
    {
        notes: 'This story displays an out-and-back trail route. The trail goes from point A to point B and then returns along the same path. You can modify the distance and elevation using the knobs.',
    },
);
