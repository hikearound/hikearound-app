import React from 'react';
import styled from 'styled-components';
import HikeListItem from './HikeListItem';

class HikeList extends React.PureComponent {
    render() {
        const { hikes } = this.props;

        return (
            <ListWrapper>
                {hikes.map((hike) => (
                    <HikeListItem
                        key={hike.id}
                        name={hike.name}
                        description={hike.description}
                    />
                ))}
            </ListWrapper>
        );
    }
}

export default HikeList;

const ListWrapper = styled.View`
`;
