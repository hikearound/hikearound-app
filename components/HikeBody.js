import React from 'react';
import {
    Modal,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import {
    spacing,
    colors,
    fontWeights,
    fontSizes,
    opacities,
    borderRadius,
} from '../constants/Index';
import Subtitle from './Subtitle';
import FavoriteButton from './FavoriteButton';

const HIKE_IMAGES = [
    {
        source: {
            uri:
                'https://firebasestorage.googleapis.com/v0/b/hikearound-14dad.appspot.com/o/images%2Fhike1.jpg?alt=media&token=2113e260-6bb5-4e75-959f-f0cfc3c8d8e3',
        },
        title: 'Meyers Lane #1',
    },
];

const { VIEWPORT_WIDTH } = Dimensions.get('window');

class HikeBody extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalVisible: false,
            imageIndex: 0,
        };
    }

    componentDidMount() {
        this.updateDescription();
    }

    toggleLightbox(visible, index) {
        this.setState({
            modalVisible: visible,
            imageIndex: index,
        });
        StatusBar.setHidden(visible);
    }

    updateDescription() {
        const { description } = this.props;
        if (description) {
            this.setState({
                description: description.replace(
                    '\\n\\n', '\n\n'
                ),
            });
        }
    }

    render() {
        const { name, city, id } = this.props;
        const { description, modalVisible, imageIndex } = this.state;

        return (
            <BodyContent>
                <TitleText>{name}</TitleText>
                <LocationText>{city}</LocationText>
                <FavoriteButton
                    name={name}
                    id={id}
                />
                <Subtitle text='Description' />
                <DescriptionText>{description}</DescriptionText>
                <Subtitle text='Images' />
                {HIKE_IMAGES.map((image, index) => (
                    <TouchableOpacity
                        key={image.title}
                        onPress={() => {
                            this.toggleLightbox(
                                !modalVisible, index
                            );
                        }}
                    >
                        <ThumbnailImage
                            source={image.source}
                            resizeMode='cover'
                        />
                    </TouchableOpacity>
                ))}
                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {}}
                >
                    <ModalRoot>
                        <SafeAreaView style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.toggleLightbox(
                                        !modalVisible,
                                        imageIndex,
                                    );
                                }}
                                activeOpacity={opacities.regular}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    marginRight: 20,
                                    marginTop: -20,
                                }}
                            >
                                <Ionicons
                                    name='ios-close'
                                    color={colors.white}
                                    size={45}
                                />
                            </TouchableOpacity>
                            <LightboxImage
                                style={{ VIEWPORT_WIDTH }}
                                source={HIKE_IMAGES[imageIndex].source}
                                resizeMode='contain'
                            />
                        </SafeAreaView>
                    </ModalRoot>
                </Modal>
            </BodyContent>
        );
    }
}

export default HikeBody;

const BodyContent = styled.View`
    padding: ${spacing.medium}px ${spacing.small}px;
    background-color: ${colors.white};
`;

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
    background-color: ${colors.trueBlack};
`;

const ThumbnailImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: ${borderRadius.small}px;
    margin: 0 ${spacing.micro}px ${spacing.micro}px 0;
`;

const LightboxImage = styled.Image`
    height: 100%;
`;

const DescriptionText = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
`;

const TitleText = styled.Text`
    color: ${colors.black};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.big}px;
`;

const LocationText = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.large}px;
`;
