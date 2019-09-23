import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
    colors,
    fontSizes,
    fontWeights,
    spacing,
    opacities,
} from '../constants/Index';

const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
};

class ProfileHikeRow extends React.PureComponent {
    getHikeSnapshot = async () => {
        const { id } = this.props;
        const firestore = firebase.firestore();
        return firestore.collection('hikes').doc(id).get();
    }

    getAdditionalHikeData = async () => {
        const hikeSnapshot = await this.getHikeSnapshot();
        this.setAdditionalHikeData(hikeSnapshot);
    }

    setAdditionalHikeData = async (hikeSnapshot) => {
        const { navigation } = this.props;
        const hikeData = hikeSnapshot.data();
        navigation.push('Hike', {
            hike: hikeData,
        });
    };

    render() {
        const {
            name,
            location,
            distance,
        } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={() => { this.getAdditionalHikeData(); }}
            >
                <Container>
                    <Name>{name}</Name>
                    <MetaData>
                        {location}
                        {' · '}
                        {distance}
                        {'m'}
                    </MetaData>
                </Container>
            </TouchableOpacity>
        );
    }
}

ProfileHikeRow.propTypes = propTypes;

export default withNavigation(ProfileHikeRow);

const Container = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const Name = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.large}px;
    font-weight: ${fontWeights.bold};
`;

const MetaData = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.medium}px;
`;
