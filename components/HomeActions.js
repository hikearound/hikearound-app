import React from 'react';
import styled from 'styled-components';
import Sort from './header/Sort';
import Search from './header/Search';
import { spacing } from '../constants/Index';

const marginBottom = '6px';
const maxHeight = '26px';

class HomeActions extends React.PureComponent {
    render() {
        return (
            <ActionsWrapper>
                <Sort />
                <Search />
            </ActionsWrapper>
        );
    }
}

export default HomeActions;

const ActionsWrapper = styled.View`
    display: flex;
    flex-direction: row;
    margin: 0 ${spacing.micro}px ${marginBottom} 0;
    max-height: ${maxHeight};
`;
