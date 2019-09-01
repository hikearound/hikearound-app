import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

function mapStateToProps(state) {
    return {
        name: state.name,
        avatar: state.avatar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAvatar: (avatar) => dispatch({
            type: 'UPDATE_AVATAR',
            avatar,
        }),
    };
}

class Avatar extends React.Component {
    componentDidMount() {
        this.loadState();
    }

    loadState = () => {
        const { updateAvatar } = this.props;
        AsyncStorage.getItem('state').then((serializedState) => {
            const state = JSON.parse(serializedState);
            if (state) {
                updateAvatar(state.avatar);
            }
        });
    };

    render() {
        const { avatar } = this.props;
        return <Image source={{ uri: avatar }} />;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Avatar);

const Image = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`;
