import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
};

class ProfileHikeRow extends React.PureComponent {
    render() {
        const {
            name,
            location,
            distance,
            navigation,
        } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={() => {
                    navigation.push('Hike', {
                        hike: this.props,
                    });
                }}
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