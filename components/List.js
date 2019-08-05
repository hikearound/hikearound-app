import React from 'react';
import { FlatList } from 'react-navigation';
import Item from './Item';
import Footer from './Footer';

class List extends React.Component {
    render() {
        const { ...props } = this.props;
        return (
            <FlatList
                ref={(ref) => { this.listRef = ref; }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.key}
                renderItem={({ item }) => <Item key={item.key} {...item} />}
                ListFooterComponent={({ item }) => <Footer {...item} />}
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
