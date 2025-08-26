import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { fontWeights, fontSizes, spacing, opacities } from '@constants/Index';
import { showModal } from '@actions/Modal';

const propTypes = {
    title: PropTypes.string.isRequired,
    includeTopBorder: PropTypes.bool,
    isLoggedOut: PropTypes.bool,
    showFilter: PropTypes.bool,
    dispatchModalFlag: PropTypes.func,
};

const defaultProps = {
    includeTopBorder: false,
    isLoggedOut: false,
    showFilter: false,
};

class Header extends React.PureComponent {
    showFilter = () => {
        const { dispatchModalFlag } = this.props;
        if (dispatchModalFlag) {
            dispatchModalFlag('filter');
        }
    };

    render() {
        const { title, includeTopBorder, isLoggedOut, showFilter } = this.props;

        return (
            <View includeTopBorder={includeTopBorder} isLoggedOut={isLoggedOut}>
                <HeaderContent>
                    <Text>{title}</Text>
                    {showFilter && (
                        <TouchableOpacity
                            activeOpacity={opacities.regular}
                            onPress={this.showFilter}
                        >
                            <FilterText>FILTER</FilterText>
                        </TouchableOpacity>
                    )}
                </HeaderContent>
            </View>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
export default withTranslation()(ConnectedHeader);

const View = styled.View`
    padding-top: ${spacing.tiny}px;
    padding-bottom: ${spacing.small}px;
    padding-horizontal: ${spacing.tiny}px;
    padding-left: ${(props) =>
        props.isLoggedOut ? `${spacing.small}px` : `${spacing.tiny}px`};
    border-bottom-width: 1px;
    border-top-width: ${(props) => (props.includeTopBorder ? '1px' : 0)};
    border-color: ${(props) => props.theme.itemBorder};
`;

const HeaderContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;

const FilterText = styled.Text`
    color: #8B5CF6;
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.regular};
    text-transform: uppercase;
`;
