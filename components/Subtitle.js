import React from 'react';
import styled from 'styled-components';

const Subtitle = ({ text }) => (
    <SubtitleView>
        <SubtitleText>{text}</SubtitleText>
    </SubtitleView>
);

export default Subtitle;

const SubtitleView = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #D8D8D8;
    margin: 20px 0 10px 0;
`;

const SubtitleText = styled.Text`
    color: #9C9C9C;
    font-weight: 500;
    font-size: 13px;
    margin-bottom: 3px;
    text-transform: uppercase;
`;
