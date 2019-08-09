import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Updates } from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { colors, spacing, fontSizes } from '../constants/Index';

/* eslint-disable no-constant-condition */

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
        textColor: colors.black,
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
        if (item === mapSetting || 'Apple Maps') {
            this.selectItem();
        }
    }

    handleLogout = async () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
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
            textColor: `${colors.purple}`,
            checkDisplay: 'flex',
            selected: true,
        });
    }

    unselectItem() {
        this.setState({
            textColor: colors.black,
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
                        color={colors.purple}
                        style={{
                            display: checkDisplay,
                            right: parseInt(spacing.small, 10),
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
    padding: ${spacing.small}px 0;
`;

const ItemText = styled.Text`
    color: ${props => props.textColor || colors.black};
    font-size: ${fontSizes.large}px;
`;
