import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomSheet from 'reanimated-bottom-sheet';
import GlobalMap from '../components/GlobalMap';
import { withTheme } from '../utils/Themes';
import { colors, spacing, fontSizes } from '../constants/Index';

const handleWidth = '40px';
const handleHeight = '8px';

const propTypes = {
    position: PropTypes.object.isRequired,
};

class MapScreen extends React.Component {
    renderContent = () => {
        const { theme } = this.props;

        return (
            <Body style={{ backgroundColor: theme.colors.sheetBackground }}>
                <StyledText>Placeholder text</StyledText>
            </Body>
        );
    };

    renderHeader = () => {
        const { theme } = this.props;

        return (
            <Header style={{ backgroundColor: theme.colors.sheetBackground }}>
                <HeaderPanel>
                    <HeaderHandle />
                </HeaderPanel>
            </Header>
        );
    };

    render() {
        const { position } = this.props;

        return (
            <>
                <GlobalMap position={position} />
                <BottomSheet
                    snapPoints={[45, 100, 45]}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                />
            </>
        );
    }
}

MapScreen.propTypes = propTypes;

export default withTheme(MapScreen);

const Body = styled.View`
    height: 100px;
    padding: ${spacing.small}px;
`;

const StyledText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.small}px;
`;

const Header = styled.View`
    padding-top: ${spacing.medium}px;
    border-top-left-radius: ${spacing.small}px;
    border-top-right-radius: ${spacing.small}px;
`;

const HeaderPanel = styled.View`
    align-items: center;
`;

const HeaderHandle = styled.View`
    width: ${handleWidth};
    height: ${handleHeight};
    border-radius: ${spacing.micro}px;
    margin-bottom: ${spacing.micro}px;
    background-color: ${colors.gray};
`;
