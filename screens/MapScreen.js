import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import GlobalMap from '../components/map/Global';
import MapSearch from '../components/map/Search';
import HikeSheet from '../components/bottom_sheet/Hike';
import { withTheme, SetBarStyle, setBarStyleWithTheme } from '../utils/Themes';
import { getMapMarkers } from '../utils/Map';
import { getHikeData } from '../utils/Hike';
import { withNavigation } from '../utils/Navigation';
import { defaultState } from '../constants/states/Map';
import { queryParams } from '../constants/Map';

const propTypes = {
    position: PropTypes.object,
    selectedHike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
    selectedHike: null,
    position: null,
};

function mapStateToProps(state) {
    return {
        selectedHike: state.mapReducer.selectedHike,
        position: state.userReducer.currentPosition,
    };
}

function mapDispatchToProps() {
    return {};
}

class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.bottomSheetRef = React.createRef();
        this.mapRef = React.createRef();

        this.setState = this.setState.bind(this);
        this.state = defaultState;
    }

    async componentDidMount() {
        const { theme } = this.props;

        setBarStyleWithTheme(theme, this.setState);
        this.getInitialMarkers();
    }

    async componentDidUpdate(prevProps) {
        const { selectedHike, theme } = this.props;

        if (prevProps.selectedHike !== selectedHike && selectedHike) {
            const sheetData = await getHikeData(selectedHike);
            this.setSheetData(sheetData);
        }

        if (prevProps.theme.dark !== theme.dark) {
            setBarStyleWithTheme(theme, this.setState);
        }
    }

    setSheetData = (sheetData) => {
        this.setState({ sheetData });
    };

    getInitialMarkers = async () => {
        const { position } = this.props;
        const markers = await getMapMarkers(position, queryParams.distance);

        this.setState({ markers });
    };

    render() {
        const { position, selectedHike } = this.props;
        const { markers, barStyle, sheetData } = this.state;

        return (
            <View>
                <SetBarStyle barStyle={barStyle} />
                <MapSearch
                    hideHikeSheet={() => {
                        this.bottomSheetRef.current.snapTo(2);
                    }}
                />
                {position && (
                    <GlobalMap
                        mapRef={this.mapRef}
                        position={position}
                        markers={markers}
                        showHikeSheet={() => {
                            this.bottomSheetRef.current.snapTo(1);
                        }}
                    />
                )}
                <HikeSheet
                    mapRef={this.mapRef}
                    sheetRef={this.bottomSheetRef}
                    sheetData={sheetData}
                    selectedHike={selectedHike}
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
