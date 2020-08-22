import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
    colors,
    transparentColors,
    borderRadius,
    spacing,
    fontSizes,
    fontWeights,
    opacities,
} from '../constants/Index';

const { height } = Dimensions.get('window');

const propTypes = {
    text: PropTypes.string,
    action: PropTypes.string.isRequired,
    duration: PropTypes.number,
    timeout: PropTypes.number,
    iconSize: PropTypes.number,
    useNativeDriver: PropTypes.bool,
};

const defaultProps = {
    text: '',
    duration: 500,
    timeout: 3500,
    iconSize: 30,
    useNativeDriver: false,
};

function mapStateToProps(state) {
    return {
        action: state.hikeReducer.action,
    };
}

class Toast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            top: new Animated.Value(height),
        };
    }

    componentDidUpdate() {
        this.showToast();
    }

    showToast = () => {
        const { action, duration, timeout, useNativeDriver } = this.props;
        const { top } = this.state;

        if (action === 'favoriteHike' || action === 'copyLink') {
            Animated.timing(top, {
                toValue: height - 230,
                duration,
                useNativeDriver,
            }).start();
        }

        this.timeout = setTimeout(() => {
            this.hideToast();
        }, timeout);
    };

    hideToast = () => {
        const { top } = this.state;
        const { duration, useNativeDriver } = this.props;

        clearTimeout(this.timeout);

        Animated.timing(top, {
            toValue: height,
            duration,
            useNativeDriver,
        }).start();
    };

    render() {
        const { text, iconSize } = this.props;
        const { top } = this.state;

        return (
            <AnimatedContainer style={{ top }}>
                <ToastText>{text}</ToastText>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={this.buttonPress}
                    style={{
                        position: 'absolute',
                        right: 12,
                        top: 5,
                    }}
                >
                    <Ionicons
                        name='ios-close'
                        color={colors.white}
                        size={iconSize}
                    />
                </TouchableOpacity>
            </AnimatedContainer>
        );
    }
}

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

export default connect(mapStateToProps)(Toast);

const Container = styled.View`
    position: absolute;
    left: ${spacing.small}px;
    right: ${spacing.small}px;
    background: ${transparentColors.purple};
    box-shadow: 0 4px 12px ${transparentColors.grayLight};
    border-radius: ${borderRadius.medium}px;
    z-index: 1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const ToastText = styled.Text`
    font-size: ${fontSizes.medium}px;
    color: ${colors.white};
    font-weight: ${fontWeights.medium};
    padding: 12px;
`;
