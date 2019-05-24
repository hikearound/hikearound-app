import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import {
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { MapView, Location, Permissions } from 'expo';

class HikeScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { state: { params = {} } } = navigation;
        const section = navigation.getParam('section')
        return {
            title: section.title || 'Hike',
            headerStyle: {
                backgroundColor: '#935DFF',
                height: 60,
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                fontSize: 22,
            },
        };
    }

    state = {
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null
    };

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission denied.',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location) });

        this.setState({mapRegion: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421 }
        });
    };

    render() {
        const { navigation } = this.props;
        const section = navigation.getParam('section');

        return (
            <ScrollView>
                <Container>
                    <Content>
                        <MapView
                            provider={MapView.PROVIDER_GOOGLE}
                            style={{ alignSelf: 'stretch', height: 400 }}
                            region={this.state.mapRegion}
                        />
                        <Text>{section.content}</Text>
                    </Content>
                </Container>
            </ScrollView>
        );
    }
}

export default HikeScreen;

const Text = styled.Text``;

const Content = styled.View`
    padding: 20px;
`;

const Container = styled.View`
    flex: 1;
`;

const Cover = styled.View`
    height: 375px;
`;

const Image = styled.Image`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background: #3c4560;
`;

const Title = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: bold;
    width: 170px;
    position: absolute;
    top: 78px;
    left: 20px;
`;

const Caption = styled.Text`
    color: white;
    font-size: 17;
    position: absolute;
    bottom: 20px;
    left: 20px;
    max-width: 300px;
`;

const CloseView = styled.View`
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 22px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.View`
    flex-direction: row;
    position: absolute;
    top: 40px;
    left: 20px;
    align-items: center;
`;

const Logo = styled.Image`
    width: 24px;
    height: 24px;
`;

const Subtitle = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 5px;
    text-transform: uppercase;
`;
