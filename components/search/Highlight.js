import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connectHighlight } from 'react-instantsearch-native';
import { HighlightedText, HighlightedSubText } from '@styles/Highlight';

const propTypes = {
  attribute: PropTypes.string.isRequired,
  hit: PropTypes.object.isRequired,
  highlight: PropTypes.func.isRequired,
  highlightProperty: PropTypes.string,
};

const defaultProps = {
  highlightProperty: '_highlightResult',
};

const renderNameHighlight = highlights => (
  <Text>
    {highlights.map(({ value, isHighlighted }, index) => (
      <HighlightedText key={index} showHighlight={isHighlighted}>
        {value}
      </HighlightedText>
    ))}
  </Text>
);

const renderLocationHighlight = (highlights, attribute) => (
  <Text>
    {attribute === 'state' && <HighlightedSubText>, </HighlightedSubText>}
    {highlights.map(({ value, isHighlighted }, index) => (
      <HighlightedSubText key={index} showHighlight={isHighlighted}>
        {value}
      </HighlightedSubText>
    ))}
  </Text>
);

class Highlight extends React.PureComponent {
  render() {
    const { attribute, hit, highlight, highlightProperty } = this.props;

    const highlights = highlight({
      highlightProperty,
      attribute,
      hit,
    });

    if (attribute === 'city' || attribute === 'state') {
      return renderLocationHighlight(highlights, attribute);
    }

    return renderNameHighlight(highlights);
  }
}

Highlight.propTypes = propTypes;
Highlight.defaultProps = defaultProps;

export default connectHighlight(Highlight);
