import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connectHighlight } from 'react-instantsearch-native';

const propTypes = {
    attribute: PropTypes.string.isRequired,
    hit: PropTypes.object.isRequired,
    highlight: PropTypes.func.isRequired,
};

class Highlight extends React.PureComponent {
    render() {
        const { attribute, hit, highlight } = this.props;
        const highlights = highlight({
            highlightProperty: '_highlightResult',
            attribute,
            hit,
        });

        return (
            <Text>
                {highlights.map(({ value, isHighlighted }, index) => {
                    const style = {
                        backgroundColor: isHighlighted
                            ? 'yellow'
                            : 'transparent',
                    };

                    return (
                        <Text key={index} style={style}>
                            {value}
                        </Text>
                    );
                })}
            </Text>
        );
    }
}

Highlight.propTypes = propTypes;

export default connectHighlight(Highlight);
