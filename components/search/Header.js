import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { connectStats } from 'react-instantsearch-native';
import { fontWeights, fontSizes, spacing } from '../../constants/Index';

const propTypes = {
    nbHits: PropTypes.number.isRequired,
};

class Header extends React.PureComponent {
    render() {
        const { t, nbHits } = this.props;
        return (
            <View>
                <Text>
                    {t('screen.search.results.header', { count: nbHits })}
                </Text>
            </View>
        );
    }
}

Header.propTypes = propTypes;

export default withTranslation()(connectStats(Header));

const View = styled.View`
    padding: ${spacing.tiny}px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.itemBorder};
`;

const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
