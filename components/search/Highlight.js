import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connectHighlight } from 'react-instantsearch-native';
import { colors, fontWeights } from '../../constants/Index';

const propTypes = {
    attribute: PropTypes.string.isRequired,
    hit: PropTypes.object.isRequired,
    highlight: PropTypes.func.isRequired,
    highlightProperty: PropTypes.string,
};

const defaultProps = {
    highlightProperty: '_highlightResult',
};

class Highlight extends React.PureComponent {
    render() {
        const { attribute, hit, highlight, highlightProperty } = this.props;
        const highlights = highlight({
            highlightProperty,
            attribute,
            hit,
        });

        return (
            <Text>
                {highlights.map(({ value, isHighlighted }, index) => {
                    return (
                        <HighlightedText
                            key={index}
                            showHighlight={isHighlighted}
                        >
                            {value}
                        </HighlightedText>
                    );
                })}
            </Text>
        );
    }
}

Highlight.propTypes = propTypes;
Highlight.defaultProps = defaultProps;

export default connectHighlight(Highlight);

const HighlightedText = styled.Text`
    color: ${(props) =>
        props.showHighlight ? colors.purple : colors.blackText};
    font-weight: ${(props) =>
        props.showHighlight ? fontWeights.bold : fontWeights.regular};
`;
