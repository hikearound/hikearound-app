import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colors, spacing, opacities } from '../../constants/Index';

const enabled = 1;
const disabled = 0.3;

const propTypes = {
    onPress: PropTypes.func.isRequired,
    screenType: PropTypes.string.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
};

const defaultProps = {
    name: 'filter',
    color: colors.white,
    size: 18,
};

function mapStateToProps(state) {
    return {
        screenType: state.homeReducer.screenType,
    };
}

function mapDispatchToProps() {
    return {};
}

class Sort extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        const { onPress } = this.props;

        this.state = {
            iconOpacity: enabled,
            iconPress: onPress,
        };
    }

    componentDidUpdate(prevProps) {
        const { screenType, onPress } = this.props;

        if (prevProps.screenType !== screenType) {
            this.toggleIconVisibility(screenType, onPress);
        }
    }

    toggleIconVisibility = (screenType, onPress) => {
        if (screenType === 'feed') {
            this.setState({
                iconOpacity: enabled,
                iconPress: onPress,
            });
        } else {
            this.setState({
                iconOpacity: disabled,
                iconPress: null,
            });
        }
    };

    render() {
        const { name, color, size } = this.props;
        const { iconOpacity, iconPress } = this.state;

        return (
            <StyledOpacity
                activeOpacity={opacities.regular}
                onPress={iconPress}
            >
                <FontAwesome5
                    name={name}
                    size={size}
                    color={color}
                    style={{ opacity: iconOpacity }}
                    solid
                />
            </StyledOpacity>
        );
    }
}

Sort.propTypes = propTypes;
Sort.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sort);

const StyledOpacity = styled.TouchableOpacity`
    margin-top: ${spacing.micro}px;
    margin-right: ${spacing.tiny}px;
`;
