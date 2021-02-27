import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { withTranslation, Trans } from 'react-i18next';
import { withTheme } from '../../utils/Themes';
import { spacing, colors } from '../../constants/Index';
import { RootView, Title, Description } from '../../styles/Callouts';
import { HeaderContainer, HeaderText } from '../../styles/Lists';
import { withNavigation } from '../../utils/Navigation';

const propTypes = {
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    iconType: PropTypes.string,
};

const defaultProps = {
    iconSize: 40,
    iconColor: colors.purple,
    iconType: 'ios-heart',
};

class ProfileEmptyState extends React.PureComponent {
    mapPress = () => {
        const { navigation } = this.props;
        navigation.navigate('Map', { screen: 'Map' });
    };

    renderMapLink = () => <TextLink onPress={this.mapPress} />;

    renderListHeader = () => {
        const { t } = this.props;

        return (
            <StyledHeaderContainer showBottomBorder>
                <HeaderText>{t('screen.profile.header')}</HeaderText>
            </StyledHeaderContainer>
        );
    };

    renderIcon = () => {
        const { iconSize, iconColor, iconType } = this.props;
        return (
            <Ionicons
                name={iconType}
                color={iconColor}
                size={iconSize}
                style={{ marginBottom: -3 }}
            />
        );
    };

    renderText = () => {
        const { t } = this.props;

        return (
            <>
                <Title>{t('screen.profile.empty.title')}</Title>
                <Description>
                    <Trans i18nKey='screen.profile.empty.description'>
                        {/* eslint-disable-next-line */}
                        Hikes that you favorite will be saved to your profile. {this.renderMapLink()}.
                    </Trans>
                </Description>
            </>
        );
    };

    render() {
        return (
            <EmptyStateWrapper>
                {this.renderListHeader()}
                <StyledRootView>
                    {this.renderIcon()}
                    {this.renderText()}
                </StyledRootView>
            </EmptyStateWrapper>
        );
    }
}

ProfileEmptyState.propTypes = propTypes;
ProfileEmptyState.defaultProps = defaultProps;

export default withTranslation()(withNavigation(withTheme(ProfileEmptyState)));

const TextLink = styled.Text`
    color: ${colors.purple};
`;

const EmptyStateWrapper = styled.View`
    flex: 1;
`;

const StyledRootView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: -180px;
`;

const StyledHeaderContainer = styled(HeaderContainer)`
    margin-left: ${spacing.small}px;
`;
