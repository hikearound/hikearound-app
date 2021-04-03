import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { fontWeights, opacities, fontSizes } from '../../constants/Index';
import HeaderText from '../../styles/Header';

const propTypes = {
    scrollRef: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    scrollType: PropTypes.string,
};

const defaultProps = {
    scrollType: 'scrollView',
};

class Title extends React.PureComponent {
    onPress = () => {
        const { scrollRef, scrollType } = this.props;

        if (scrollRef.current) {
            if (scrollType === 'flatList') {
                scrollRef.current.scrollToOffset({
                    animated: true,
                    offset: 0,
                });
            } else {
                scrollRef.current.scrollTo({
                    animated: true,
                    x: 0,
                    y: 0,
                });
            }
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
Title.defaultProps = defaultProps;

export default Title;

const Text = styled(HeaderText)`
    font-size: ${fontSizes.big}px;
    font-weight: ${fontWeights.bold};
`;
