import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Updates } from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { colors, spacing, fontSizes, opacities } from '../constants/Index';
import { setMap } from '../actions/User';

const propTypes = {
    item: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    setdefaultMap: PropTypes.func.isRequired,
    defaultMap: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        defaultMap: state.userReducer.map,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setdefaultMap: (map) => dispatch(setMap(map)),
    };
}

class SettingsItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            textColor: colors.black,
            checkDisplay: 'none',
        };
    }

    componentWillMount = async () => {
        const { item } = this.props;
        const mapSetting = await AsyncStorage.getItem('mapSetting');
        if (item === mapSetting) {
            this.selectItem();
        }
    };

    setDefaultMap = async () => {
        const { item, defaultMap } = this.props;
        if (item === defaultMap) {
            this.selectItem();
        }
    };

    handleLogout = async () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                Updates.reload();
            });
    };

    itemPress = () => {
        const { item, setdefaultMap, index } = this.props;
        if (item === 'Logout') {
            this.handleLogout();
        } else {
            setdefaultMap(item, index);
        }
    };

    selectItem() {
        this.setState({
            textColor: `${colors.purple}`,
            checkDisplay: 'flex',
        });
    }

    unselectItem() {
        this.setState({
            textColor: colors.black,
            checkDisplay: 'none',
        });
    }

    render() {
        const { item } = this.props;
        const { checkDisplay, textColor } = this.state;
        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.itemPress}
            >
                <ItemContainer>
                    <ItemText key={item.key} textColor={textColor}>
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

SettingsItem.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsItem);

const ItemContainer = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const ItemText = styled.Text`
    color: ${(props) => props.textColor || colors.black};
    font-size: ${fontSizes.large}px;
`;
