import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Avatar from './Avatar';
import {
    spacing,
    colors,
    fontWeights,
    fontSizes,
    opacities,
} from '../constants/Index';
import { showModal } from '../actions/Modal';

const BACKGROUND_IMAGE = require('../assets/profile-bg.png');

const propTypes = {
    showEditProfileModal: PropTypes.func.isRequired,
    modalType: PropTypes.string,
};

const defaultProps = {
    modalType: 'editProfile',
};

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showEditProfileModal: (modalType) => dispatch(showModal(modalType)),
    };
}

class ProfileHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        this.getUserData();
    }

    editProfile = () => {
        const { showEditProfileModal, modalType } = this.props;
        showEditProfileModal(modalType);
    };

    getUid = async () => firebase.auth().currentUser.uid;

    getUserSnapshot = async () => {
        const firestore = firebase.firestore();
        const uid = await this.getUid();
        return firestore
            .collection('users')
            .doc(uid)
            .get();
    };

    getUserData = async () => {
        const userSnapshot = await this.getUserSnapshot();
        const user = userSnapshot.data();

        this.setState({
            name: user.name,
            location: user.location,
        });
    };

    render() {
        const { name, location } = this.state;
        return (
            <HeaderWrapper source={BACKGROUND_IMAGE}>
                <Avatar />
                <NameText>{name}</NameText>
                <LocationText>{location}</LocationText>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={this.editProfile}
                    style={{
                        position: 'absolute',
                        right: parseInt(spacing.small, 10),
                        bottom: 20,
                    }}
                >
                    <EditProfileLink>Edit Profile</EditProfileLink>
                </TouchableOpacity>
            </HeaderWrapper>
        );
    }
}

ProfileHeader.propTypes = propTypes;
ProfileHeader.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileHeader);

const HeaderWrapper = styled.ImageBackground`
    padding-left: ${spacing.small}px;
    padding-top: 40px;
    padding-bottom: ${spacing.medium}px;
    min-height: 175px;
`;

const NameText = styled.Text`
    font-size: ${fontSizes.big}px;
    font-weight: ${fontWeights.bold};
    color: ${colors.black};
    margin-top: ${spacing.tiny}px;
`;

const LocationText = styled.Text`
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.medium};
    color: ${colors.black};
`;

const EditProfileLink = styled.Text`
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.medium};
    color: ${colors.purple};
`;
