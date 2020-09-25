import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'react-native-expo-image-cache';
import { withTranslation } from 'react-i18next';
import FeedCardGradient from './FeedCardGradient';
import {
    spacing,
    colors,
    transparentColors,
    borderRadius,
    fontSizes,
} from '../constants/Index';
import { withTheme } from '../utils/Themes';
import LocationPill from './feed/card/pill/Location';
import DifficultyPill from './feed/card/pill/Difficulty';

const propTypes = {
    image: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
};

class FeedCard extends React.PureComponent {
    renderBackground = () => {
        const { image } = this.props;

        return (
            <Image
                uri={image.uri}
                resizeMode='cover'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                }}
            />
        );
    };

    renderHeader = () => {
        const { city, state, difficulty } = this.props;

        return (
            <Header>
                <LocationPill label={`${city}, ${state}`} />
                <DifficultyPill label={difficulty} />
            </Header>
        );
    };

    renderFooter = () => {
        const { name, distance, elevation, t } = this.props;

        return (
            <Footer>
                <HikeName>{name}</HikeName>
                <FooterText>
                    {t('card.metadata', { distance, elevation })}
                </FooterText>
            </Footer>
        );
    };

    renderGradient = () => {
        const { image } = this.props;
        return <FeedCardGradient imageDidLoad={image.uri} />;
    };

    render() {
        return (
            <View>
                {this.renderBackground()}
                {this.renderFooter()}
                {this.renderHeader()}
                {this.renderGradient()}
            </View>
        );
    }
}

FeedCard.propTypes = propTypes;

export default withTranslation()(withTheme(FeedCard));

const View = styled.View`
    background-color: ${(props) => props.theme.cardBackground};
    width: 100%;
    border-radius: ${borderRadius.medium}px;
    box-shadow: 0 4px 4px ${transparentColors.grayLight};
    height: 200px;
    border-radius: ${borderRadius.medium}px;
    overflow: hidden;
`;

const Header = styled.View`
    position: absolute;
    top: ${spacing.tiny}px;
    width: 100%;
    flex-direction: row;
    left: 4px;
`;

const Footer = styled.View`
    position: absolute;
    bottom: 12px;
    left: ${spacing.tiny}px;
    z-index: 1;
`;

const FooterText = styled.Text`
    color: ${colors.white};
    font-size: 14px;
    margin-top: 2px;
`;

const HikeName = styled.Text`
    color: ${colors.white};
    font-size: ${fontSizes.extraLarge}px;
    font-weight: bold;
`;
