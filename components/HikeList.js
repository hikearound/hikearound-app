import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import HikeListItem from './HikeListItem';
import {
    colors,
    fontSizes,
    fontWeights,
    spacing,
} from '../constants/Index';

class HikeList extends React.PureComponent {
    renderListHeader = () => (
        <HeaderContainer>
            <HeaderText>Your Hikes</HeaderText>
        </HeaderContainer>
    )

    renderItem = ({ item }) => (
        <HikeListItem
            key={item.id}
            name={item.name}
            description={item.description}
            location={item.location}
            distance={item.distance}
        />
    )

    render() {
        const { hikes } = this.props;
        const extractKey = ({ id }) => id;

        return (
            <RootView>
                <FlatList
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderListHeader}
                    data={hikes}
                    keyExtractor={extractKey}
                />
            </RootView>
        );
    }
}

export default HikeList;

const RootView = styled.View`
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
