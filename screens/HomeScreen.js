import React from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    ScrollView,
    Animated,
    TouchableOpacity,
    Easing,
    StatusBar,
    AsyncStorage,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderLogo from '../components/HeaderLogo';

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <HeaderLogo/>,
        headerBackTitle: null,
    };

    constructor(props) {
        super(props);
        this.getToken();
    }

    getToken = async () => {
        var token = await AsyncStorage.getItem('token');
        this.setState({ token });
        console.log(this.state.token);
    };

    render() {
        return (
            <RootView>
                <SafeAreaView
                    style={{ flex: 1 }}
                    forceInset={{ bottom: 'never'}}>
                    <ScrollView
                        style={{ flex: 1}}
                        showsVerticalScrollIndicator={false}>
                        <SubtitleView>
                            <Subtitle>Bay Area Hikes</Subtitle>
                        </SubtitleView>
                        <CardsContainer>
                            {cards.map((card, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.props.navigation.push('Hike', {
                                            hike: card
                                        });
                                    }}>
                                    <Card
                                        key={index}
                                        title={card.title}
                                        image={card.image}
                                        distance={card.distance}
                                        elevation={card.elevation}
                                        route={card.route}
                                        caption={card.caption}
                                        content={card.content}
                                    />
                                </TouchableOpacity>
                            ))}
                        </CardsContainer>
                    </ScrollView>
                </SafeAreaView>
            </RootView>
        );
    }
}

const cards = [
    {
        title: "Kent Trail Loop",
        image: require("../assets/hike1.jpg"),
        distance: "4.2",
        elevation: "1043",
        route: "Loop",
        caption: "1 of 12 sections",
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum erat arcu, posuere ac varius vel, viverra et lorem. Maecenas fringilla dignissim lobortis. Ut pharetra scelerisque eros, vitae pulvinar nisi pharetra quis.\n\nAliquam suscipit nec purus sit amet eleifend. Quisque quis turpis eget elit varius iaculis. Vivamus fermentum in quam eget vulputate. Aenean faucibus, ante nec fringilla faucibus, nunc ligula varius erat, non consequat elit diam vitae erat. ',
    },
    {
        title: "Marshall Beach Trail",
        image: require("../assets/hike2.jpg"),
        distance: "6.9",
        elevation: "954",
        route: "Out & Back",
        caption: "2 of 12 sections",
        content: 'This is content.',
    },
    {
        title: "Johnstone Trail",
        image: require("../assets/hike3.jpg"),
        distance: "3.2",
        elevation: "434",
        route: "Loop",
        caption: "2 of 12 sections",
        content: 'This is content.',
    },
];

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);

const RootView = styled.View`
    background: #FFF;
    flex: 1;
    overflow: hidden;
`;

const Title = styled.Text`
    font-size: 16px;
    color: #b8bece;
    font-weight: 500;
    margin-left: 55px;
`;

const SubtitleView = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #D8D8D8;
    margin: 30px 15px 0 15px;
`;

const Subtitle = styled.Text`
    color: #9C9C9C;
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 5px;
    text-transform: uppercase;
`;

const Message = styled.Text`
    margin: 20px;
    color: #b8bece;
    font-size: 15px;
    font-weight: 500;
`;

const CardsContainer = styled.View`
    flex-direction: column;
    padding: 15px;
`;
