import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { spacing, opacities } from '../../constants/Index';
import FilterIcon from '../../icons/Filter';

const propTypes = {
    onPress: PropTypes.func.isRequired,
    size: PropTypes.number,
};

const defaultProps = {
    size: 40,
};

class Sort extends React.PureComponent {
    render() {
        const { size, onPress } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={onPress}
            >
                <View style={{ aspectRatio: 1, height: size }}>
                    <FilterIcon />
                </View>
            </TouchableOpacity>
        );
    }
}

Sort.propTypes = propTypes;
Sort.defaultProps = defaultProps;

export default Sort;

const View = styled.View`
    margin-top: -${spacing.micro}px;
`;
