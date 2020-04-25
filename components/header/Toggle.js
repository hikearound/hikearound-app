import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { LayoutAnimation } from 'react-native';
import { colors, spacing, opacities } from '../../constants/Index';

const iconRightMargin = '30px';
const iconTopMargin = '-1px';

const propTypes = {
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    screenType: PropTypes.string.isRequired,
};

const defaultProps = {
    color: colors.white,
};

function mapStateToProps(state) {
    return {
        screenType: state.homeReducer.screenType,
    };
}

function mapDispatchToProps() {
    return {};
}

class Toggle extends React.PureComponent {
    componentDidUpdate() {
        const { screenType } = this.props;

        if (screenType === 'list') {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
            );
        }
    }

    render() {
        const { onPress, color, screenType } = this.props;

        return (
            <StyledOpacity activeOpacity={opacities.regular} onPress={onPress}>
                {screenType !== 'feed' && (
                    <Entypo name='list' size={26} color={color} />
                )}
                {screenType !== 'map' && (
                    <MaterialIcons name='map' size={26} color={color} />
                )}
            </StyledOpacity>
        );
    }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);

const StyledOpacity = styled.TouchableOpacity`
    position: absolute;
    margin-left: ${spacing.tiny}px;
    right: ${iconRightMargin};
    top: ${iconTopMargin};
`;
