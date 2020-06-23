import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { withTheme } from '../utils/Themes';
import { genericMarkerBgDefault } from '../constants/Images';

const propTypes = {
    coordinate: PropTypes.object,
    offset: PropTypes.object,
    tracksViewChanges: PropTypes.bool.isRequired,
};

const defaultProps = {
    coordinate: {},
    offset: { x: 0, y: -18 },
};

class GenericMapMarker extends React.Component {
    constructor(props) {
        super(props);

        const { offset } = this.props;

        this.state = {
            offset,
            bgImage: genericMarkerBgDefault,
        };
    }

    renderMarkerIcon = () => {
        const { bgImage } = this.state;

        return (
            <View>
                <ImageBackground
                    source={bgImage}
                    style={{ width: 40, height: 42 }}
                />
            </View>
        );
    };

    markerPress = () => {};

    render() {
        const { coordinate, tracksViewChanges } = this.props;
        const { offset } = this.state;

        return (
            <View>
                <Marker
                    coordinate={coordinate}
                    onPress={this.markerPress}
                    tracksViewChanges={tracksViewChanges}
                    centerOffset={offset}
                >
                    {this.renderMarkerIcon()}
                </Marker>
            </View>
        );
    }
}

GenericMapMarker.propTypes = propTypes;
GenericMapMarker.defaultProps = defaultProps;

export default withTheme(GenericMapMarker);
