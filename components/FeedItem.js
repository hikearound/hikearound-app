import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import FeedCard from './FeedCard';
import { spacing, opacities } from '../constants/Index';
import { getHikeImage } from '../utils/Hike';

const propTypes = {
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
    name: PropTypes.string,
    distance: PropTypes.number,
    elevation: PropTypes.number,
    route: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
};

const defaultProps = {
    images: [],
    name: '',
    distance: 0,
    elevation: 0,
    route: '',
    description: '',
    city: '',
};

class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const { images, id } = this.props;
        if (images.length >= 1) {
            const imageUrl = await getHikeImage(id, 0);
            this.setState({ imageUrl });
        }
    }

    render() {
        const {
            navigation,
            name,
            distance,
            elevation,
            route,
            city,
            description,
        } = this.props;

        const { imageUrl } = this.state;

        return (
            <CardsContainer>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={() => {
                        navigation.push('Hike', {
                            hike: this.props,
                        });
                    }}
                >
                    <FeedCard
                        name={name}
                        image={{ uri: imageUrl }}
                        distance={distance}
                        elevation={elevation}
                        route={route}
                        city={city}
                        description={description}
                    />
                </TouchableOpacity>
            </CardsContainer>
        );
    }
}

FeedItem.propTypes = propTypes;
FeedItem.defaultProps = defaultProps;

export default withNavigation(FeedItem);

const CardsContainer = styled.View`
    flex-direction: column;
    padding: ${spacing.tiny}px;
    padding-bottom: 0;
`;
