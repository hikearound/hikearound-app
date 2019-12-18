import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, spacing, fontSizes } from '../constants/Index';

const propTypes = {
    item: PropTypes.string.isRequired,
};

class SettingsItem extends React.PureComponent {
    render() {
        const { item } = this.props;
        return (
            <ItemContainer>
                <ItemText key={item.key}>{item}</ItemText>
            </ItemContainer>
        );
    }
}

SettingsItem.propTypes = propTypes;

export default SettingsItem;

const ItemContainer = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const ItemText = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.large}px;
`;
