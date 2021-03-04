import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { RootView } from '../styles/Screens';
import { withTheme, SetBarStyle } from '../utils/Themes';
import { withNavigation } from '../utils/Navigation';
import ReviewListItem from '../components/ReviewListItem';
import {
    fontSizes,
    fontWeights,
    spacing,
    opacities,
    borderRadius,
} from '../constants/Index';
import { openHikeScreen } from '../utils/Hike';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

class ReviewScreen extends React.Component {
    constructor(props) {
        super(props);

        const { route } = this.props;
        const { review, hike, user } = route.params;

        this.state = {
            review,
            hike,
            user,
        };
    }

    renderHikeButton = () => {
        const { review } = this.state;
        const { navigation, t } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    openHikeScreen(review.hid, navigation, {});
                }}
                activeOpacity={opacities.regular}
            >
                <Button>
                    <Text>{t('sheet.map.actions.hike')}</Text>
                </Button>
            </TouchableOpacity>
        );
    };

    renderReviewScreen = () => {
        const { t } = this.props;
        const { review, hike, user } = this.state;
        const { name, city, state } = hike;

        return (
            <>
                <ReviewLabel>
                    {t('screen.review.label', { name, city, state })}
                </ReviewLabel>
                <ReviewWrapper>
                    <ReviewListItem
                        id={review.id}
                        rid={review.id}
                        hid={review.hid}
                        user={user}
                        rating={review.rating}
                        review={review.review}
                        savedOn={review.savedOn}
                        userLikes={review.userLikes}
                        showOverflow={false}
                        shouldShowBorder={false}
                    />
                </ReviewWrapper>
                {this.renderHikeButton()}
            </>
        );
    };

    render() {
        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
                {this.renderReviewScreen()}
            </RootView>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(withNavigation(ReviewScreen))));

export const ReviewLabel = styled.Text`
    color: ${(props) => props.theme.feedText};
    display: flex;
    margin: ${spacing.tiny}px ${spacing.small}px;
`;

export const ReviewWrapper = styled.View`
    display: flex;
    margin: 0 0 0 ${spacing.small}px;
    border-top-width: 1px;
    padding-bottom: 0;
    border-color: ${(props) => props.theme.itemBorder};
`;

export const Text = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.medium};
    text-align: center;
`;

export const Button = styled.View`
    border: 1px;
    border-color: ${(props) => props.theme.itemBorder};
    border-radius: ${borderRadius.medium}px;
    padding: 8px;
    background-color: ${(props) => props.theme.sheetBackground};
    margin: 2px ${spacing.small}px;
`;
