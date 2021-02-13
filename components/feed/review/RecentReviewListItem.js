import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import {
    spacing,
    opacities,
    borderRadius,
    fontSizes,
} from '../../../constants/Index';
import { withNavigation } from '../../../utils/Navigation';
import { defaultProps } from '../../../constants/states/FeedItem';
import { openHikeScreen } from '../../../utils/Hike';
import ReviewListItem from '../../ReviewListItem';
import { cardWidth } from '../../../constants/Carousel';

const propTypes = {
    rid: PropTypes.string.isRequired,
    hid: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
    savedOn: PropTypes.object.isRequired,
    userLikes: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    hike: PropTypes.object.isRequired,
};

class RecentReviewListItem extends React.PureComponent {
    onPress = () => {
        const { hid, navigation } = this.props;
        openHikeScreen(hid, navigation);
    };

    renderHeader = () => {
        const { hike } = this.props;

        return (
            <HeaderWrapper>
                <HikeName>{hike.name}</HikeName>
            </HeaderWrapper>
        );
    };

    renderBody = () => {
        const {
            rid,
            hid,
            user,
            rating,
            review,
            savedOn,
            userLikes,
        } = this.props;

        return (
            <ReviewListItem
                rid={rid}
                hid={hid}
                user={user}
                rating={rating}
                review={review}
                savedOn={savedOn}
                userLikes={userLikes}
                numberOfLines={2}
                showOverflow={false}
                includeMinHeight
            />
        );
    };

    render() {
        return (
            <CardsContainer width={cardWidth}>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={this.onPress}
                >
                    {this.renderHeader()}
                    {this.renderBody()}
                </TouchableOpacity>
            </CardsContainer>
        );
    }
}

RecentReviewListItem.propTypes = propTypes;
RecentReviewListItem.defaultProps = defaultProps;

export default withNavigation(RecentReviewListItem);

const CardsContainer = styled.View`
    flex-direction: row;
    padding: ${spacing.tiny}px;
    padding-bottom: 0;
    width: ${(props) => props.width}px;
    border: 1px solid;
    border-color: ${(props) => props.theme.itemBorder};
    border-radius: ${borderRadius.medium}px;
    margin-right: ${spacing.tiny}px;
    background-color: ${(props) => props.theme.feedReviewBackground};
`;

const HeaderWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    padding-bottom: ${spacing.micro}px;
`;

const HikeName = styled.Text`
    width: 100%;
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.small}px;
`;
