import React from 'react';
import styled from 'styled-components';
import HikeListItem from './HikeListItem';
import {
    colors,
    fontSizes,
    fontWeights,
    spacing,
} from '../constants/Index';

class HikeList extends React.PureComponent {
    render() {
        const { hikes } = this.props;

        return (
            <ListWrapper>
                <HeaderContainer>
                    <HeaderText>Your Hikes</HeaderText>
                </HeaderContainer>
                {hikes.map((hike) => (
                    <HikeListItem
                        key={hike.id}
                        name={hike.name}
                        description={hike.description}
                        location={hike.location}
                        distance={hike.distance}
                    />
                ))}
            </ListWrapper>
        );
    }
}

export default HikeList;

const ListWrapper = styled.View`
    margin-left: ${spacing.small}px;
`;

const HeaderContainer = styled.View`
    padding-bottom: ${spacing.tiny}px;
    margin-top: ${spacing.tiny}px;
`;

const HeaderText = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
