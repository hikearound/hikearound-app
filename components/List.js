import React from 'react';
import { FlatList } from 'react-native';
import Item from './Item';
import styled from 'styled-components';
import Footer from './Footer';

class List extends React.Component {
    renderItem = ({ item }) => <Item {...item} />;
    keyExtractor = item => item.key;

    render() {
        const { onPressFooter, ...props } = this.props;
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                ListFooterComponent={footerProps => (
                    <Footer {...footerProps} onPress={onPressFooter} />
                )}
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
