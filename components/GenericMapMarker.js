import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { withTheme } from '../utils/Themes';
import { markerUnfocused, markerFocused } from '../constants/Images';

const propTypes = {
    coordinate: PropTypes.object,
    offset: PropTypes.object,
    tracksViewChanges: PropTypes.bool.isRequired,
    position: PropTypes.object,
};

const defaultProps = {
    coordinate: {},
    position: {},
    offset: { x: 0, y: -38 },
};

class GenericMapMarker extends React.Component {
    constructor(props) {
        super(props);

        const { offset } = this.props;

        this.state = {
            offset,
            isFocused: false,
            bgImage: markerUnfocused,
        };
    }

    componentDidUpdate(prevProps) {
        const { position } = this.props;

        const positionDidChange = prevProps.position !== position;
        const objectIsEmpty = Object.keys(position).length === 0;

        if (positionDidChange) {
            this.unfocusMarker();
        }

        if (objectIsEmpty && positionDidChange) {
            this.focusMarker();
        }
    }

    renderMarkerIcon = () => {
        const { bgImage } = this.state;

        return (
            <View>
                <ImageBackground
                    source={bgImage}
                    style={{ width: 61, height: 74 }}
                />
            </View>
        );
    };

    markerPress = () => {
        const { isFocused } = this.state;

        if (isFocused) {
            this.unfocusMarker();
        } else {
            this.focusMarker();
        }
    };

    focusMarker = () => {
        this.setState({
            bgImage: markerFocused,
            isFocused: true,
        });
    };

    unfocusMarker = () => {
        this.setState({
            bgImage: markerUnfocused,
            isFocused: false,
        });
    };

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
