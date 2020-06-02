import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import ReadMore from 'react-native-read-more-text';
import { colors, fontWeights, fontSizes, spacing } from '../../constants/Index';
import Subtitle from '../Subtitle';
import FavoriteButton from '../FavoriteButton';
import { defaultProps } from '../../constants/states/TextContent';

const propTypes = {
    name: PropTypes.string,
    city: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    distance: PropTypes.number,
    numberOfLines: PropTypes.number,
    placement: PropTypes.string,
};

class TextContent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            description: undefined,
        };
    }

    componentDidMount() {
        this.updateDescription();
    }

    componentDidUpdate(prevProps) {
        const { description } = this.props;

        if (prevProps.description !== description) {
            this.updateDescription();
        }
    }

    renderTruncatedFooter = (handlePress) => {
        const { t } = this.props;

        return (
            <ActionText onPress={() => this.expandText(handlePress)}>
                {t('label.common.read')}
            </ActionText>
        );
    };

    expandText = (handlePress) => {
        const { description } = this.props;

        handlePress();
        this.setState({ description });
    };

    renderRevealedFooter = () => {
        return null;
    };

    updateDescription() {
        const { description } = this.props;

        if (description) {
            this.setState({
                description: description.replace(/(\n\n)/gm, ' '),
            });
        }
    }

    render() {
        const {
            name,
            city,
            id,
            distance,
            numberOfLines,
            placement,
            t,
        } = this.props;
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
                    placement={placement}
                />
                <Subtitle text={t('label.heading.description')} />
                <ReadMore
                    numberOfLines={numberOfLines}
                    renderTruncatedFooter={this.renderTruncatedFooter}
                    renderRevealedFooter={this.renderRevealedFooter}
                >
                    <DescriptionText>{description}</DescriptionText>
                </ReadMore>
            </>
        );
    }
}

TextContent.propTypes = propTypes;
TextContent.defaultProps = defaultProps;

export default withTranslation()(TextContent);

const ActionText = styled.Text`
    color: ${colors.purple};
    font-size: ${fontSizes.medium}px;
    margin-top: 2px;
`;

const DescriptionText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
`;

const TitleText = styled.Text`
    color: ${(props) => props.theme.text};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.big}px;
    line-height: ${fontSizes.big}px;
    padding-top: ${spacing.micro}px;
    width: 75%;
`;

const LocationText = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.large}px;
`;
