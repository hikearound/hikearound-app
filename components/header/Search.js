import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colors, opacities } from '../../constants/Index';

const propTypes = {
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
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

class Search extends React.PureComponent {
    render() {
        const { onPress, color } = this.props;

        return (
            <StyledOpacity activeOpacity={opacities.regular} onPress={onPress}>
                <Ionicons name='md-search' size={26} color={color} />
            </StyledOpacity>
        );
    }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const StyledOpacity = styled.TouchableOpacity`
    margin-top: 1px;
`;
