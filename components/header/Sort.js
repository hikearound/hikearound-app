import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { spacing, opacities } from '../../constants/Index';
import FilterIcon from '../../icons/Filter';

const enabled = 1;
const disabled = 0.3;

const propTypes = {
    onPress: PropTypes.func.isRequired,
    screenType: PropTypes.string.isRequired,
    size: PropTypes.number,
};

const defaultProps = {
    size: 40,
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
        const { iconOpacity, iconPress } = this.state;
        const { size } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={iconPress}
            >
                <StyledView
                    style={{
                        opacity: iconOpacity,
                        aspectRatio: 1,
                        height: size,
                    }}
                >
                    <FilterIcon />
                </StyledView>
            </TouchableOpacity>
        );
    }
}

Sort.propTypes = propTypes;
Sort.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sort);

const StyledView = styled.View`
    margin-top: -${spacing.micro}px;
`;
