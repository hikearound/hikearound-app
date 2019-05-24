import React from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { NotificationIcon } from '../components/Icons';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import {
    ScrollView,
    Animated,
    TouchableOpacity,
    Easing,
    StatusBar,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderLogo from '../components/HeaderLogo';

const CardsQuery = gql`
    {
        cardsCollection {
            items {
                title
                subtitle
                image {
                    title
                    description
                    contentType
                    fileName
                    size
                    url
                    width
                    height
                }
                subtitle
                caption
                logo {
                    title
                    description
                    contentType
                    fileName
                    size
                    url
                    width
                    height
                }
                content
            }
        }
    }
`;

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
        headerStyle: {
            backgroundColor: '#935DFF',
            height: 60,
        },
        headerTintColor: '#FFF',
        headerTitle: <HeaderLogo/>,
        headerBackTitle: null,
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
                        <Subtitle>Bay Area Hikes</Subtitle>
                        <Query query={CardsQuery}>
                            {({ loading, error, data }) => {
                                if (loading) return <Message>Loading...</Message>;
                                if (error) return <Message>Error...</Message>;
                                return (
                                    <CardsContainer>
                                        {data.cardsCollection.items.map((card, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {
                                                    this.props.navigation.push('Section', {
                                                        section: card
                                                    });
                                                }}>
                                                <Card
                                                    title={card.title}
                                                    image={{ uri: card.image.url }}
                                                    caption={card.caption}
                                                    logo={{ uri: card.logo.url }}
                                                    subtitle={card.subtitle}
                                                    content={card.content}/>
                                            </TouchableOpacity>
                                        ))}
                                    </CardsContainer>
                                );
                            }}
                        </Query>
                    </ScrollView>
                </SafeAreaView>
            </RootView>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);

const RootView = styled.View`
    background: #f0f3f5;
    flex: 1;
    overflow: hidden;
`;

const Title = styled.Text`
    font-size: 16px;
    color: #b8bece;
    font-weight: 500;
    margin-left: 55px;
`;

const Subtitle = styled.Text`
    color: #b8bece;
    font-weight: 600;
    font-size: 15px;
    margin: 25px 0 0 20px;
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
    padding: 20px;
`;
