import React from 'react';
import { FlatList } from 'react-navigation';
import styled from 'styled-components';
import Item from './Item';
import Footer from './Footer';

class List extends React.Component {
    renderItem({item}) {
        return (
            <Item
                _key={item.key}
                {...item}
            />
        )
    }

    renderFooter({item}) {
        return (
            <Footer {...item} />
        )
    }

    render() {
        const { ...props } = this.props;
        return (
            <FlatList
                ref={(ref) => { this.listRef = ref; }}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.key}
                ListFooterComponent={this.renderFooter}
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
