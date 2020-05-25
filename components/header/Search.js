import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import { colors, opacities } from '../../constants/Index';
import { withNavigation } from '../../utils/Navigation';

const propTypes = {
    color: PropTypes.string,
};

const defaultProps = {
    color: colors.white,
};

class Search extends React.PureComponent {
    onPress = () => {
        const { navigation } = this.props;
        navigation.push('Search');
    };

    render() {
        const { color } = this.props;

        return (
            <StyledOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
            >
                <Ionicons name='md-search' size={26} color={color} />
            </StyledOpacity>
        );
    }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

const StyledOpacity = styled.TouchableOpacity`
    margin-top: 1px;
`;

export default withNavigation(Search);
