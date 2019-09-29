import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { opacities } from '../constants/Index';
import { updateAvatar } from '../actions/User';

const propTypes = {
    update: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
    size: PropTypes.number,
};

const defaultProps = {
    size: 60,
};

function mapStateToProps(state) {
    return {
        avatar: state.userReducer.avatar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        update: (avatar) => dispatch(updateAvatar(avatar)),
    };
}

class Avatar extends React.Component {
    componentDidMount() {
        this.loadState();
    }

    loadState = () => {
        const { update } = this.props;
        AsyncStorage.getItem('state').then((serializedState) => {
            const state = JSON.parse(serializedState);
            if (state) {
                update(state.avatar);
            }
        });
    };

    render() {
        const { avatar, size } = this.props;
        return (
            <TouchableOpacity activeOpacity={opacities.regular}>
                <Image
                    source={{ uri: avatar }}
                    style={{
                        height: size,
                        width: size,
                        borderRadius: size / 2,
                    }}
                />
            </TouchableOpacity>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Avatar);
