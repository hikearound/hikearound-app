import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import GlobalMap from '@components/map/Global';
import GooglePlacesSearch from '@components/map/GooglePlacesSearch';
import HikeSheet from '@components/bottom_sheet/Hike';
import { withTheme, SetBarStyle, setBarStyleWithTheme } from '@utils/Themes';
import { getHikeData } from '@utils/Hike';
import { withNavigation } from '@utils/Navigation';
import { defaultState } from '@constants/states/Map';
import { updateMapData } from '@actions/Map';

const propTypes = {
    markers: PropTypes.array,
    position: PropTypes.object,
    selectedHike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dispatchMapData: PropTypes.func.isRequired,
};

const defaultProps = {
    selectedHike: null,
    position: null,
    markers: [],
};

function mapStateToProps(state) {
    return {
        markers: state.mapReducer.markers,
        selectedHike: state.mapReducer.selectedHike,
        position: state.userReducer.currentPosition,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchMapData: (mapData) => dispatch(updateMapData(mapData)),
    };
}

class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        const { markers } = this.props;

        this.bottomSheetRef = React.createRef();
        this.mapRef = React.createRef();

        this.setState = this.setState.bind(this);
        this.state = {
            ...defaultState,
            markers,
            barStyle: 'dark-content',
        };
    }

    async componentDidMount() {
        const { theme } = this.props;

        setBarStyleWithTheme(theme, this.setState);
    }

    async componentDidUpdate(prevProps) {
        const { selectedHike, theme, markers } = this.props;

        if (prevProps.selectedHike !== selectedHike && selectedHike) {
            const sheetData = await getHikeData(selectedHike);
            this.setSheetData(sheetData);
        }

        if (prevProps.markers !== markers) {
            this.setMarkers(markers);
        }

        if (prevProps.theme.dark !== theme.dark) {
            setBarStyleWithTheme(theme, this.setState);
        }
    }

    setSheetData = (sheetData) => {
        this.setState({ sheetData });
    };

    setMarkers = (markers) => {
        this.setState({ markers });
    };

    handleSearchSelect = (data, details) => {
        const { dispatchMapData } = this.props;

        if (!details || !details.geometry || !details.geometry.location) {
            return;
        }

        // Update location and clear markers
        dispatchMapData({
            markers: [],
            selectedCity: {
                geometry: {
                    location: {
                        lat: details.geometry.location.lat,
                        lng: details.geometry.location.lng,
                    },
                },
                animationDuration: 0,
            },
            animationConfig: {
                pitch: 0,
                heading: 0,
                duration: 0,
            },
        });

        this.bottomSheetRef.current?.close();
    };

    clearRoute = () => {
        const { dispatchMapData } = this.props;
        dispatchMapData({
            selectedRoute: null,
            routeCoordinates: [],
        });
    };

    render() {
        const { position, selectedHike, theme } = this.props;
        const { markers, barStyle, sheetData } = this.state;

        return (
            <View>
                <SetBarStyle barStyle={barStyle} />
                <GooglePlacesSearch
                    theme={theme}
                    onPress={this.handleSearchSelect}
                    placeholder='Search for a city'
                />
                {position && (
                    <GlobalMap
                        mapRef={this.mapRef}
                        position={position}
                        markers={markers}
                        showHikeSheet={() => {
                            this.bottomSheetRef.current?.expand();
                        }}
                    />
                )}
                <HikeSheet
                    mapRef={this.mapRef}
                    sheetRef={this.bottomSheetRef}
                    sheetData={sheetData}
                    selectedHike={selectedHike}
                    onClose={this.clearRoute}
                />
            </View>
        );
    }
}

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(withTheme(MapScreen)));
