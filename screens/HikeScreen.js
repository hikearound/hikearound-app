import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import {
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

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

    render() {
        const { navigation } = this.props;
        const section = navigation.getParam('section');

        return (
            <ScrollView>
                <Container>
                    <Cover>
                        <Image source={section.image} />
                        <Wrapper>
                            <Subtitle>{section.subtitle}</Subtitle>
                        </Wrapper>
                        <Title>{section.title}</Title>
                        <Caption>{section.caption}</Caption>
                    </Cover>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={{ position: 'absolute', top: 20, right: 20 }}>
                        <CloseView>
                            <Icon.Ionicons
                                name='ios-close'
                                size={36}
                                color='#4775f2'
                                style={{ marginTop: -2 }}
                            />
                        </CloseView>
                    </TouchableOpacity>
                    <Content>
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
