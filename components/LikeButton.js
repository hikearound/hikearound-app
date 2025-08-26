import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { withTranslation } from 'react-i18next';
import { opacities, colors, borderRadius, fontSizes } from '@constants/Index';
import { withTheme } from '@utils/Themes';
import { writeReviewLikes } from '@utils/Review';
import { auth } from '@lib/Fire';

const propTypes = {
    rid: PropTypes.string.isRequired,
    userLikes: PropTypes.array.isRequired,
    iconSize: PropTypes.number,
    user: PropTypes.object,
};

const defaultProps = {
    iconSize: 16,
    user: null,
};

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
    };
}

function mapDispatchToProps() {
    return {};
}

class LikeButton extends React.Component {
    constructor(props) {
        super(props);

        const { userLikes, iconSize } = this.props;
        const likeCount = userLikes.length;

        this.state = {
            userLikes,
            iconSize,
            likeCount,
        };
    }

    componentDidMount = () => {
        this.setInitialStyle();
    };

    onPress = () => {
        this.toggleLike();
        Haptics.selectionAsync();
    };

    addLike = (rid) => {
        const { likeCount, userLikes } = this.state;
        const { uid } = auth.currentUser;

        this.setState({ likeCount: likeCount + 1 });
        this.setFilledStyle();

        userLikes.push(uid);
        writeReviewLikes(rid, userLikes);
    };

    removeLike = (rid) => {
        const { likeCount, userLikes } = this.state;
        const { uid } = auth.currentUser;
        const index = userLikes.indexOf(uid);

        this.setState({ likeCount: likeCount - 1 });
        this.setEmptyStyle();

        userLikes.splice(index, 1);
        writeReviewLikes(rid, userLikes);
    };

    setEmptyStyle = () => {
        this.setState({
            iconColor: colors.gray,
            iconName: 'ios-heart-outline',
        });
    };

    setFilledStyle = () => {
        this.setState({
            iconColor: colors.purple,
            iconName: 'ios-heart',
        });
    };

    setInitialStyle = () => {
        const { userLikes } = this.state;
        const { uid } = auth.currentUser;

        if (!userLikes.includes(uid)) {
            this.setEmptyStyle();
        } else {
            this.setFilledStyle();
        }
    };

    toggleLike = () => {
        const { rid } = this.props;
        const { userLikes } = this.state;
        const { uid } = auth.currentUser;

        if (!userLikes.includes(uid)) {
            this.addLike(rid);
        } else {
            this.removeLike(rid);
        }
    };

    render() {
        const { iconName, iconColor, iconSize, likeCount } = this.state;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
                style={{ display: 'flex', alignSelf: 'flex-start' }}
            >
                <ButtonWrapper>
                    <Ionicons
                        name={iconName}
                        color={iconColor}
                        size={iconSize}
                    />
                    <LikeCount>· {likeCount}</LikeCount>
                </ButtonWrapper>
            </TouchableOpacity>
        );
    }
}

LikeButton.propTypes = propTypes;
LikeButton.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(LikeButton)));

const ButtonWrapper = styled.View`
    border: 1px solid;
    border-color: ${(props) => props.theme.likeButtonBorder};
    display: flex;
    flex-wrap: wrap;
    padding: 2px 4px;
    border-radius: ${borderRadius.small}px;
    flex-direction: row;
    margin-top: 7px;
`;

const LikeCount = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.small}px;
    margin-left: 4px;
`;
