import React from 'react';
import styled from 'styled-components';
import { spacing, transparentColors } from '../../constants/Index';

class SheetHeader extends React.PureComponent {
    render() {
        return (
            <Header>
                <HeaderPanel>
                    <HeaderHandle />
                </HeaderPanel>
            </Header>
        );
    }
}

export default SheetHeader;

const Header = styled.View`
    padding-top: ${spacing.small}px;
    border-top-left-radius: ${spacing.tiny}px;
    border-top-right-radius: ${spacing.tiny}px;
    box-shadow: 0 -4px 3px ${transparentColors.grayLight};
    background-color: ${(props) => props.theme.sheetBackground};
`;

const HeaderPanel = styled.View`
    align-items: center;
`;

const HeaderHandle = styled.View`
    width: 35px;
    height: ${spacing.micro}px;
    border-radius: ${spacing.micro}px;
    margin-bottom: ${spacing.micro}px;
    background-color: ${(props) => props.theme.sheetHandle};
`;
