import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { colors, opacities } from '../../constants/Index';

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

// export default connect(mapStateToProps, mapDispatchToProps)(Search);

const StyledOpacity = styled.TouchableOpacity`
    margin-top: 1px;
`;

export default function (props) {
    const navigation = useNavigation();
    return <Search {...props} navigation={navigation} />;
}
