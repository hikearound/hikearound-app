import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';
import { opacities, spacing, fontSizes } from '../../../constants/Index';
import { withTheme } from '../../../utils/Themes';

const propTypes = {
    type: PropTypes.string,
    onPress: PropTypes.func.isRequired,
};

const defaultProps = {
    type: 'spam',
};

class FlagButton extends React.PureComponent {
    render() {
        const { t, type, onPress } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    onPress(type);
                }}
                activeOpacity={opacities.regular}
            >
                <Wrapper>
                    <Text>{t(`modal.flag.action.${type.toLowerCase()}`)}</Text>
                </Wrapper>
            </TouchableOpacity>
        );
    }
}

FlagButton.propTypes = propTypes;
FlagButton.defaultProps = defaultProps;

export default withTranslation()(withTheme(FlagButton));

const Wrapper = styled.View`
    border-color: ${(props) => props.theme.modalButtonBorder};
    border-bottom-width: 1px;
    border-top-width: 1px;
    margin-top: -1px;
`;

const Text = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.large}px;
    margin-top: ${spacing.small}px;
    margin-bottom: ${spacing.small}px;
    text-align: left;
    padding-left: ${spacing.small}px;
`;
