import React from 'react';
import { FlatList } from 'react-navigation';
import Item from './Item';
import Footer from './Footer';

class List extends React.Component {
    renderItem = ({ item }) => <Item _key={item.key} {...item} />;

    keyExtractor = item => item.key;

    render() {
        const { ...props } = this.props;
        return (
            <FlatList
                ref={(ref) => { this.listRef = ref; }}
                showsVerticalScrollIndicator={false}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
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
