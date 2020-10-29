import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
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

const propTypes = {
    text: PropTypes.string,
    iconSize: PropTypes.number,
};

const defaultProps = {
    text: null,
    iconSize: 30,
};

function mapStateToProps(state) {
    return {
        action: state.hikeReducer.action,
    };
}

class Toast extends React.Component {
    render() {
        const { text, iconSize } = this.props;

        return (
            <Container>
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
            </Container>
        );
    }
}

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

export default connect(mapStateToProps)(Toast);

const Container = styled.View`
    position: absolute;
    bottom: -50px;
    left: ${spacing.small}px;
    right: ${spacing.small}px;
    background: ${transparentColors.purple};
    box-shadow: 0 4px 12px ${transparentColors.grayLight};
    border-radius: ${borderRadius.medium}px;
    z-index: 1;
`;

const ToastText = styled.Text`
    font-size: ${fontSizes.medium}px;
    color: ${colors.white};
    font-weight: ${fontWeights.medium};
    padding: 12px;
`;
