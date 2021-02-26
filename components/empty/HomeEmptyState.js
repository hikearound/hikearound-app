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

    renderSearchLink = () => <TextLink onPress={this.searchPress} />;

    renderMapLink = () => <TextLink onPress={this.mapPress} />;

    renderMessage = () => {
        const { city } = this.props;
        if (city) {
            return this.renderDefaultMessage();
        }
        return this.renderPermissionMessage();
    };

    renderDefaultMessage = () => {
        const { city, t } = this.props;

        return (
            <>
                <Title>{t('screen.home.empty.default.title')}</Title>
                <Description>
                    <Trans i18nKey='screen.home.empty.default.description'>
                        {/* eslint-disable-next-line */}
                        This probably just means we haven't added any hikes near {{cityName: city}} yet. Try {this.renderSearchLink()} or {this.renderMapLink()}.
                    </Trans>
                </Description>
            </>
        );
    };

    renderPermissionMessage = () => {
        const { t } = this.props;

        return (
            <>
                <Title>{t('screen.home.empty.permission.title')}</Title>
                <Description>
                    <Trans i18nKey='screen.home.empty.permission.description'>
                        {/* eslint-disable-next-line */}
                        The Home tab only works if you've enabled location sharing. Try {this.renderSearchLink()} or {this.renderMapLink()} instead.
                    </Trans>
                </Description>
            </>
        );
    };

    render() {
        const { iconSize, iconColor, iconType } = this.props;

        return (
            <RootView>
                <MaterialIcons
                    name={iconType}
                    color={iconColor}
                    size={iconSize}
                />
                {this.renderMessage()}
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
