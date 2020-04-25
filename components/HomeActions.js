import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sort from './header/Sort';
import Toggle from './header/Toggle';

const marginRight = '7px';
const marginBottom = '4px';

const propTypes = {
    feedAction: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired,
};

class HomeActions extends React.PureComponent {
    render() {
        const { feedAction, toggleAction } = this.props;

        return (
            <ActionsWrapper>
                <Toggle onPress={toggleAction} />
                <Sort onPress={feedAction} />
            </ActionsWrapper>
        );
    }
}

HomeActions.propTypes = propTypes;

export default HomeActions;

const ActionsWrapper = styled.View`
    display: flex;
    flex-direction: row;
    margin: 0 ${marginRight} ${marginBottom} 0;
`;
