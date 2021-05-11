import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesome5 } from '@expo/vector-icons';
import {
    colors,
    transparentColors,
    opacities,
    borderRadius,
} from '../../../constants/Index';
import { withTheme } from '../../../utils/Themes';

const propTypes = {
    iconSize: PropTypes.number,
};

const defaultProps = {
    iconSize: 22,
};

function mapStateToProps(state) {
    return {
        position: state.userReducer.currentPosition,
    };
}

function mapDispatchToProps() {
    return {};
}

class ExpandButton extends React.PureComponent {
    onPress = () => {};

    render() {
        const { iconSize } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
                style={{
                    position: 'absolute',
                    bottom: 55,
                    right: 8,
                    zIndex: 1,
                    opacity: 0.95,
                }}
            >
                <ButtonWrapper>
                    <FontAwesome5
                        name='expand-alt'
                        color={colors.purple}
                        size={iconSize}
                        style={{
                            position: 'absolute',
                            top: 6,
                            left: 8,
                        }}
                    />
                </ButtonWrapper>
            </TouchableOpacity>
        );
    }
}

ExpandButton.propTypes = propTypes;
ExpandButton.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(ExpandButton));

const ButtonWrapper = styled.View`
    display: flex;
    height: 34px;
    width: 34px;
    background-color: ${(props) => props.theme.mapButtonBackground};
    border-radius: ${borderRadius.large}px;
    box-shadow: 0 4px 4px ${transparentColors.grayLight};
    z-index: 2;
`;
