import React from 'react';
import { FlatList } from 'react-native';
import Item from './Item';
import styled from 'styled-components';

class List extends React.Component {
    renderItem = ({ item }) => <Item {...item} />;
    keyExtractor = item => item.key;

    render() {
        const { ...props } = this.props;
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
                {...props}
            />
        );
    }
    // render() {
    //     const { onEndReached, ...props } = this.props;
    //     return (
    //         <FlatList
    //             keyExtractor={this.keyExtractor}
    //             renderItem={this.renderItem}
    //             onEndReached={onEndReached}
    //             onEndReachedThreshold={0.5}
    //             {...props}
    //         />
    //     );
    // }
}
export default List;
