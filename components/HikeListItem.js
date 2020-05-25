import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import {
    colors,
    fontSizes,
    fontWeights,
    spacing,
    opacities,
} from '../constants/Index';
import { openHikeScreen } from '../utils/Hike';
import { withNavigation } from '../utils/Navigation';

const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
};

class HikeListItem extends React.PureComponent {
    getHikeData = async () => {
        const { id, navigation } = this.props;
        openHikeScreen(id, navigation);
    };

    render() {
        const { name, location, distance } = this.props;

        return (
            <View>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={() => {
                        this.getHikeData();
                    }}
                >
                    <Name>{name}</Name>
                    <MetaData>
                        {location}
                        {' · '}
                        {distance}
                        {'m'}
                    </MetaData>
                </TouchableOpacity>
            </View>
        );
    }
}

HikeListItem.propTypes = propTypes;

export default withNavigation(HikeListItem);

const View = styled.View`
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const Name = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.large}px;
    font-weight: ${fontWeights.bold};
`;

const MetaData = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.medium}px;
`;
