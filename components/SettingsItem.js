import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Haptic } from 'expo';
import { connect } from 'react-redux';
import { Updates } from 'expo';
import firebase from 'firebase';

function mapStateToProps(state) {
    return {
        mapPreference: state.mapPreference,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setMapPreference: mapPreference => dispatch({
            type: 'SET_MAP_PREFERENCE',
            mapPreference: mapPreference,
        }),
    };
}

class SettingsItem extends React.Component {
    state = {
        textColor: '#333',
        checkDisplay: 'none',
        selected: false,
    };

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidUpdate() {
        if (this.props.mapPreference == this.props.item) {
            if (!this.state.selected) {
                this.selectItem();
                AsyncStorage.setItem(
                    'mapSetting', this.props.item,
                );
            }
        } else {
            if (this.state.selected) {
                this.unselectItem();
            }
        }
    }

    componentWillMount = async () => {
        const { ...props } = this.props;
        let mapSetting = await this.getMapSetting()
        if (this.props.item == mapSetting || 'Apple') {
            this.selectItem();
        }
    }

    handleLogout = async () => {
        firebase
            .auth()
            .signOut()
            .then(response => {
                Updates.reload()
            });
    };

    itemPress = () => {
        if (this.props.item == 'Logout') {
            this.handleLogout();
        } else {
            this.props.setMapPreference(this.props.item);
        }
    }

    getMapSetting = async () => {
        return AsyncStorage.getItem('mapSetting');
    }

    selectItem() {
        this.setState({
            textColor: '#935DFF',
            checkDisplay: 'flex',
            selected: true,
        });
    }

    unselectItem() {
        this.setState({
            textColor: '#333',
            checkDisplay: 'none',
            selected: false,
        });
    }

    render() {
        const { ...props } = this.props;
        return (
            <TouchableOpacity onPress={this.itemPress}>
                <ItemContainer>
                    <ItemText
                        key={this.props.item.key}
                        textColor={this.state.textColor}>
                        {this.props.item}
                    </ItemText>
                    <Ionicons
                        name='ios-checkmark'
                        size={35}
                        color='#935DFF'
                        style={{
                            display: this.state.checkDisplay,
                            right: 15,
                            top: 5,
                            position: 'absolute',
                        }}
                    />
                </ItemContainer>
            </TouchableOpacity>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsItem);

const ItemContainer = styled.View`
    border-color: #F0F0F0;
    border-top-width: 1px;
    padding: 15px 0;
`;

const ItemText = styled.Text`
    color: ${props => props.textColor || '#333'};
    font-size: 16px;
`;
