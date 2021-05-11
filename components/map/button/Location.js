import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import {
    colors,
    transparentColors,
    opacities,
    borderRadius,
    spacing,
} from '../../../constants/Index';
import { withTheme } from '../../../utils/Themes';
import { altitude } from '../../../constants/Altitude';

const propTypes = {
    position: PropTypes.object,
    mapRef: PropTypes.object,
    sheetRef: PropTypes.object,
    animationConfig: PropTypes.object.isRequired,
    bottomOffset: PropTypes.number,
    transitionDelay: PropTypes.number,
};

const defaultProps = {
    position: null,
    mapRef: {},
    sheetRef: {},
    bottomOffset: 35,
    transitionDelay: 250,
};

function mapStateToProps(state) {
    return {
        position: state.userReducer.currentPosition,
    };
}

function mapDispatchToProps() {
    return {};
}

class LocationButton extends React.PureComponent {
    onPress = () => {
        const { mapRef, sheetRef, animationConfig, position, transitionDelay } =
            this.props;

        const camera = {
            altitude: altitude.hike,
            center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            },
            heading: 0,
            pitch: 0,
        };

        mapRef.current.animateCamera(camera, {
            duration: animationConfig.duration,
        });

        setTimeout(() => {
            sheetRef.current.snapTo(2);
        }, animationConfig.duration + transitionDelay);
    };

    render() {
        const { bottomOffset } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
                style={{
                    position: 'absolute',
                    bottom: bottomOffset,
                    right: parseInt(spacing.tiny, 10),
                }}
            >
                <ButtonWrapper>
                    <Ionicons
                        name='ios-navigate'
                        color={colors.purple}
                        size={24}
                        style={{
                            position: 'absolute',
                            top: 8,
                            left: 7,
                        }}
                    />
                </ButtonWrapper>
            </TouchableOpacity>
        );
    }
}

LocationButton.propTypes = propTypes;
LocationButton.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(LocationButton));

const ButtonWrapper = styled.View`
    display: flex;
    height: 40px;
    width: 40px;
    background-color: ${(props) => props.theme.mapButtonBackground};
    border-radius: ${borderRadius.large}px;
    box-shadow: 0 4px 4px ${transparentColors.grayLight};
    z-index: 2;
`;
