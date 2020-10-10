import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connectHighlight } from 'react-instantsearch-native';
import { colors, fontWeights, fontSizes } from '../../constants/Index';

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
    renderNameHighlight = (highlights) => {
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
    };

    renderCityHighlight = (highlights) => {
        return (
            <Text>
                {highlights.map(({ value, isHighlighted }, index) => {
                    return (
                        <HighlightedSubText
                            key={index}
                            showHighlight={isHighlighted}
                        >
                            {value}
                        </HighlightedSubText>
                    );
                })}
            </Text>
        );
    };

    renderStateHighlight = (highlights) => {
        return (
            <Text>
                <HighlightedSubText>, </HighlightedSubText>
                {highlights.map(({ value, isHighlighted }, index) => {
                    return (
                        <HighlightedSubText
                            key={index}
                            showHighlight={isHighlighted}
                        >
                            {`${value}`}
                        </HighlightedSubText>
                    );
                })}
            </Text>
        );
    };

    render() {
        const { attribute, hit, highlight, highlightProperty } = this.props;
        const highlights = highlight({ highlightProperty, attribute, hit });

        if (attribute === 'city') {
            return this.renderCityHighlight(highlights);
        }

        if (attribute === 'state') {
            return this.renderStateHighlight(highlights);
        }

        return this.renderNameHighlight(highlights);
    }
}

Highlight.propTypes = propTypes;
Highlight.defaultProps = defaultProps;

export default connectHighlight(Highlight);

const HighlightedText = styled.Text`
    color: ${(props) =>
        props.showHighlight ? colors.purple : props.theme.text};
    font-weight: ${(props) =>
        props.showHighlight ? fontWeights.bold : fontWeights.bold};
    font-size: ${fontSizes.large}px;
`;

const HighlightedSubText = styled.Text`
    color: ${(props) =>
        props.showHighlight ? colors.purple : colors.grayMedium};
`;
