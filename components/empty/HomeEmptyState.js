import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { withTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import { colors } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';
import { RootView, Title, Description } from '../../styles/Callouts';
import { withNavigation } from '../../utils/Navigation';

const propTypes = {
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    iconType: PropTypes.string,
    city: PropTypes.string,
};

const defaultProps = {
    iconSize: 50,
    iconColor: colors.purple,
    iconType: 'error',
    city: null,
};

class HomeEmptyState extends React.PureComponent {
    searchPress = () => {
        const { navigation } = this.props;
        navigation.push('Search');
    };

    mapPress = () => {
        const { navigation } = this.props;
        navigation.navigate('Map', { screen: 'Map' });
    };

    renderSearchLink = () => {
        return <TextLink onPress={this.searchPress} />;
    };

    renderMapLink = () => {
        return <TextLink onPress={this.mapPress} />;
    };

    render() {
        const { iconSize, iconColor, iconType, city, t } = this.props;

        return (
            <RootView>
                <MaterialIcons
                    name={iconType}
                    color={iconColor}
                    size={iconSize}
                />
                <Title>{t('screen.home.empty.title')}</Title>
                <Description>
                    <Trans i18nKey='screen.home.empty.description'>
                        {/* eslint-disable-next-line */}
                        This probably just means we haven't added any hikes near {{cityName: city}} yet. Try {this.renderSearchLink(t)} for a hike or browse the {this.renderMapLink(t)}.
                    </Trans>
                </Description>
            </RootView>
        );
    }
}

HomeEmptyState.propTypes = propTypes;
HomeEmptyState.defaultProps = defaultProps;

export default withTranslation()(withNavigation(withTheme(HomeEmptyState)));

const TextLink = styled.Text`
    color: ${colors.purple};
`;
