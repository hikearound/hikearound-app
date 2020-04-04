import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fontWeights, fontSizes } from '../../constants/Index';
import Subtitle from '../Subtitle';
import FavoriteButton from '../FavoriteButton';

const propTypes = {
    name: PropTypes.string,
    city: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    distance: PropTypes.number,
};

const defaultProps = {
    name: '',
    city: '',
    description: '',
    distance: 0,
};

class TextContent extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            description: undefined,
        };
    }

    componentDidMount() {
        this.updateDescription();
    }

    updateDescription() {
        const { description } = this.props;
        if (description) {
            this.setState({
                description: description.replace('\\n\\n', '\n\n'),
            });
        }
    }

    render() {
        const { name, city, id, distance } = this.props;
        const { description } = this.state;

        return (
            <>
                <TitleText>{name}</TitleText>
                <LocationText>{city}</LocationText>
                <FavoriteButton
                    name={name}
                    id={id}
                    distance={distance}
                    city={city}
                />
                <Subtitle text='Description' />
                <DescriptionText>{description}</DescriptionText>
            </>
        );
    }
}

TextContent.propTypes = propTypes;
TextContent.defaultProps = defaultProps;

export default TextContent;

const DescriptionText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
`;

const TitleText = styled.Text`
    color: ${(props) => props.theme.text};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.big}px;
`;

const LocationText = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.large}px;
`;
