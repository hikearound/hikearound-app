import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import Highlight from './Highlight';
import { opacities } from '../../constants/Index';
import { openHikeScreen } from '../../utils/Hike';

const propTypes = {
    hits: PropTypes.array.isRequired,
    refine: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
};

function mapDispatchToProps() {
    return {};
}

class InfiniteHits extends React.Component {
    onEndReached = () => {
        const { hasMore, refine } = this.props;
        if (hasMore) {
            refine();
        }
    };

    getHikeData = async (objectID) => {
        const { navigation } = this.props;
        openHikeScreen(objectID, navigation);
    };

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={() => {
                    this.getHikeData(item.objectID);
                }}
            >
                <Highlight attribute='name' hit={item} />
                <Text>{item.city}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        const { hits, hasMore, refine } = this.props;

        if (hits.length > 0) {
            return (
                <FlatList
                    keyExtractor={(item) => item.objectID}
                    data={hits}
                    renderItem={this.renderRow}
                    onEndReached={() => hasMore && refine()}
                />
            );
        }

        return null;
    }
}

InfiniteHits.propTypes = propTypes;

export function ConnectedInfiniteHits(props) {
    const navigation = useNavigation();
    return <InfiniteHits {...props} navigation={navigation} />;
}

export default connect(
    null,
    mapDispatchToProps,
)(connectInfiniteHits(ConnectedInfiniteHits));
