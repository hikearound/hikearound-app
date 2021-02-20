import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { fontWeights, fontSizes, spacing } from '../constants/Index';

const propTypes = {
    title: PropTypes.string.isRequired,
    includeTopBorder: PropTypes.bool,
    isLoggedOut: PropTypes.bool,
};

const defaultProps = {
    includeTopBorder: false,
    isLoggedOut: false,
};

class Header extends React.PureComponent {
    render() {
        const { title, includeTopBorder, isLoggedOut } = this.props;

        return (
            <View includeTopBorder={includeTopBorder} isLoggedOut={isLoggedOut}>
                <Text>{title}</Text>
            </View>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withTranslation()(Header);

const View = styled.View`
    padding: ${spacing.tiny}px;
    padding-left: ${(props) =>
        props.isLoggedOut ? `${spacing.small}px` : `${spacing.tiny}px`};
    border-bottom-width: 1px;
    border-top-width: ${(props) => (props.includeTopBorder ? '1px' : 0)};
    border-color: ${(props) => props.theme.itemBorder};
`;

const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
