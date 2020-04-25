import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colors, spacing, opacities } from '../../constants/Index';

const propTypes = {
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    screenType: PropTypes.string.isRequired,
};

const defaultProps = {
    color: colors.white,
    size: 26,
};

function mapStateToProps(state) {
    return {
        screenType: state.homeReducer.screenType,
    };
}

function mapDispatchToProps() {
    return {};
}

class Map extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: 'map',
        };
    }

    componentDidUpdate(prevProps) {
        const { screenType } = this.props;

        if (prevProps.screenType !== screenType) {
            this.toggleIcon(screenType);
        }
    }

    toggleIcon = (screenType) => {
        let name = screenType;

        if (screenType === 'feed') {
            name = 'map';
        } else {
            name = 'list';
        }

        this.setState({ name });
    };

    render() {
        const { onPress, color, size } = this.props;
        const { name } = this.state;

        return (
            <StyledOpacity activeOpacity={opacities.regular} onPress={onPress}>
                <MaterialIcons name={name} size={size} color={color} />
            </StyledOpacity>
        );
    }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Map);

const StyledOpacity = styled.TouchableOpacity`
    margin-left: ${spacing.tiny}px;
`;
