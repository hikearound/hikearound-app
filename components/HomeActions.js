import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sort from './header/Sort';
import Search from './header/Search';
import { spacing } from '../constants/Index';

const marginBottom = '6px';
const maxHeight = '26px';

const propTypes = {
    feedAction: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired,
};

class HomeActions extends React.PureComponent {
    render() {
        const { feedAction, toggleAction } = this.props;

        return (
            <ActionsWrapper>
                <Sort onPress={feedAction} />
                <Search onPress={toggleAction} />
            </ActionsWrapper>
        );
    }
}

HomeActions.propTypes = propTypes;

export default HomeActions;

const ActionsWrapper = styled.View`
    display: flex;
    flex-direction: row;
    margin: 0 ${spacing.micro}px ${marginBottom} 0;
    max-height: ${maxHeight};
`;
