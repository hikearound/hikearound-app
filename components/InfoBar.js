import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import {
    spacing,
    colors,
    fontSizes,
    borderRadius,
    fontWeights,
} from '../constants/Index';

const propTypes = {
    distance: PropTypes.number,
    elevation: PropTypes.number,
    route: PropTypes.string,
};

const defaultProps = {
    distance: 0,
    elevation: 0,
    route: '',
};

const InfoBar = ({ distance, elevation, route, t }) => {
    if (route === '') {
        route = 'loop';
    }
    return (
        <CardContent>
            <ContentItem>
                <MetaDataType>{t('hike.data.distance')}</MetaDataType>
                <MetaData>
                    {distance} {t('hike.data.miles')}
                </MetaData>
            </ContentItem>
            <ContentItem>
                <MetaDataType>{t('hike.data.elevation')}</MetaDataType>
                <MetaData>
                    {elevation} {t('hike.data.feet')}
                </MetaData>
            </ContentItem>
            <ContentItem>
                <MetaDataType>{t('hike.data.route')}</MetaDataType>
                <MetaData capitalize>{t(`hike.data.${route}`)}</MetaData>
            </ContentItem>
        </CardContent>
    );
};

InfoBar.propTypes = propTypes;
InfoBar.defaultProps = defaultProps;

export default withTranslation()(InfoBar);

const CardContent = styled.View`
    flex-direction: row;
    align-items: center;
    position: relative;
    padding: ${spacing.tiny}px;
    z-index: 2;
    background-color: ${(props) => props.theme.infoBarBackground};
    border-bottom-left-radius: ${borderRadius.medium}px;
    border-bottom-right-radius: ${borderRadius.medium}px;
    margin-top: -4px;
`;

const ContentItem = styled.View`
    flex-direction: column;
    flex-grow: 1;
`;

const MetaDataType = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    margin-top: -2px;
    text-transform: uppercase;
`;

const MetaData = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.small}px;
    text-transform: ${(props) =>
        props.capitalize ? 'capitalize' : 'lowercase'};
`;
