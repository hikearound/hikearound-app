import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, AsyncStorage } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { Updates } from 'expo';
import { connect } from 'react-redux';
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
            mapPreference,
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
        const { item, mapPreference } = this.props;
        const { selected } = this.state;
        if (mapPreference === item) {
            if (!selected) {
                this.selectItem();
                AsyncStorage.setItem(
                    'mapSetting', item,
                );
            }
        } else if (selected) {
            this.unselectItem();
        }
    }

    componentWillMount = async () => {
        const { item } = this.props;
        const mapSetting = await this.getMapSetting();
        // eslint-disable-next-line no-constant-condition
        if (item === mapSetting || 'Apple Maps') {
            this.selectItem();
        }
    }

    handleLogout = async () => {
        firebase
            .auth()
            .signOut()
            // eslint-disable-next-line no-unused-vars
            .then((response) => {
                Updates.reload();
            });
    };

    itemPress = () => {
        const { item, setMapPreference } = this.props;
        if (item === 'Logout') {
            this.handleLogout();
        } else {
            setMapPreference(item);
        }
    }

    getMapSetting = async () => AsyncStorage.getItem('mapSetting')

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
        const { item } = this.props;
        const { checkDisplay, textColor } = this.state;
        return (
            <TouchableOpacity onPress={this.itemPress}>
                <ItemContainer>
                    <ItemText
                        key={item.key}
                        textColor={textColor}
                    >
                        {item}
                    </ItemText>
                    <Ionicons
                        name='ios-checkmark'
                        size={35}
                        color='#935DFF'
                        style={{
                            display: checkDisplay,
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
