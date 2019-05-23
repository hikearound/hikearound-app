import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import ActionButton from '../components/ActionButton';
import colors from '../constants/Colors';
import spacing from '../constants/Spacing';
import fontSizes from '../constants/Fonts';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

class SignInScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: colors.purple,
            height: parseInt(spacing.header),
        },
        headerTintColor: colors.white,
        headerTitle: 'Sign In',
        headerTitleStyle: {
            fontSize: parseInt(fontSizes.header),
        },
    };

    render() {
        return (
            <RootView>
                <SafeAreaView>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => {
                            this.props.navigation.dispatch(resetAction);
                        }}>
                        <ActionButton
                            primary
                            text={'Sign In'}
                        />
                    </TouchableOpacity>
                </SafeAreaView>
            </RootView>
        );
    }
}

export default SignInScreen;

const RootView = styled.View`
`;
