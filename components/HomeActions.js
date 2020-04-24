import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sort from './header/Sort';
import Map from './header/Map';
// import { spacing } from '../constants/Index';

const propTypes = {
    feedAction: PropTypes.func.isRequired,
};

class HomeActions extends React.PureComponent {
    render() {
        const { feedAction } = this.props;

        return (
            <ActionsWrapper>
                <Map onPress={feedAction} />
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
    margin-bottom: 2px;
    margin: 0 7px 2px 0;
`;
