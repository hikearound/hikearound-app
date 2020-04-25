import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colors, spacing, opacities } from '../../constants/Index';

const iconRightMargin = '3px';
const iconTopMargin = '1px';

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
    render() {
        const { onPress, color, screenType } = this.props;

        return (
            <StyledOpacity activeOpacity={opacities.regular} onPress={onPress}>
                {screenType !== 'feed' && (
                    <StyledView>
                        <FontAwesome5
                            name='list-alt'
                            solid
                            size={23}
                            color={color}
                        />
                    </StyledView>
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
    margin-left: ${spacing.tiny}px;
`;

const StyledView = styled.View`
    margin-right: ${iconRightMargin};
    margin-top: ${iconTopMargin};
`;
