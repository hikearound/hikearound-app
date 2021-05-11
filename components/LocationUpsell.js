import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { colors } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import InputButton from './InputButton';
import { getHeaderHeight } from '../utils/Navigation';
import { Title, Description } from '../styles/Callouts';

const headerHeight = getHeaderHeight();

const propTypes = {
    getLocationPermissions: PropTypes.func.isRequired,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    iconType: PropTypes.string,
};

const defaultProps = {
    iconSize: 64,
    iconColor: colors.purple,
    iconType: 'location-on',
};

class LocationUpsell extends React.PureComponent {
    render() {
        const { t, getLocationPermissions, iconSize, iconColor, iconType } =
            this.props;

        return (
            <RootView>
                <MaterialIcons
                    name={iconType}
                    color={iconColor}
                    size={iconSize}
                />
                <Title>{t('screen.onboard.permission.title')}</Title>
                <Description>
                    {t('screen.onboard.permission.description')}
                </Description>
                <ButtonWrapper>
                    <InputButton
                        text={t('screen.onboard.permission.button')}
                        action={getLocationPermissions}
                    />
                </ButtonWrapper>
            </RootView>
        );
    }
}

LocationUpsell.propTypes = propTypes;
LocationUpsell.defaultProps = defaultProps;

export default withTranslation()(withTheme(LocationUpsell));

const RootView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.rootBackground};
    margin-top: -${headerHeight}px;
    width: 100%;
`;

const ButtonWrapper = styled.View`
    width: 100%;
`;
