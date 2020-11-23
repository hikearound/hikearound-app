import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';

const propTypes = {
    text: PropTypes.string.isRequired,
    hideBorder: PropTypes.bool,
};

const defaultProps = {
    hideBorder: false,
};

const Subtitle = ({ text, hideBorder }) => (
    <SubtitleView hideBorder={hideBorder}>
        <SubtitleText>{text}</SubtitleText>
    </SubtitleView>
);

Subtitle.propTypes = propTypes;
Subtitle.defaultProps = defaultProps;

export default Subtitle;

const SubtitleView = styled.View`
    border-bottom-width: ${(props) => (props.hideBorder ? 0 : '1px')};
    border-bottom-color: ${(props) => props.theme.itemBorder};
    margin: ${spacing.small}px 0 ${spacing.tiny}px 0;
    margin-bottom: ${(props) => (props.hideBorder ? 0 : `${spacing.tiny}px`)};
`;

const SubtitleText = styled.Text`
    color: ${colors.grayMedium};
    font-weight: ${fontWeights.medium};
    font-size: ${fontSizes.small}px;
    margin-bottom: 3px;
    text-transform: uppercase;
`;
