import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { fontWeights, opacities, fontSizes } from '../../constants/Index';
import HeaderText from '../../styles/Header';

const propTypes = {
    scrollRef: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

class Title extends React.PureComponent {
    onPress = () => {
        const { scrollRef } = this.props;

        if (scrollRef) {
            scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    render() {
        const { title } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={() => this.onPress()}
            >
                <Text>{title}</Text>
            </TouchableOpacity>
        );
    }
}

Title.propTypes = propTypes;

export default Title;

const Text = styled(HeaderText)`
    font-size: ${fontSizes.big}px;
    font-weight: ${fontWeights.bold};
`;
