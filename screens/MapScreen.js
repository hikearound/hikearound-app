import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomSheet from 'reanimated-bottom-sheet';
import GlobalMap from '../components/GlobalMap';
import { withTheme } from '../utils/Themes';
import { colors, spacing, fontSizes } from '../constants/Index';

const propTypes = {
    position: PropTypes.object.isRequired,
};

class MapScreen extends React.Component {
    renderContent = () => {
        return (
            <StyledView>
                <StyledText>Placeholder text</StyledText>
            </StyledView>
        );
    };

    renderHeader = () => {
        // todo
    };

    render() {
        const { position } = this.props;

        return (
            <>
                <GlobalMap position={position} />
                <BottomSheet
                    snapPoints={[50, 100, 50]}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                />
            </>
        );
    }
}

MapScreen.propTypes = propTypes;

export default withTheme(MapScreen);

const StyledView = styled.View`
    height: 100px;
    padding: ${spacing.small}px;
    background-color: ${colors.white};
    opacity: 0.85;
`;

const StyledText = styled.Text`
    font-size: ${fontSizes.small}px;
`;
