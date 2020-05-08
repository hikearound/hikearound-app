import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux';
import GlobalMap from '../components/GlobalMap';
import { withTheme } from '../utils/Themes';
import { colors, spacing, fontSizes } from '../constants/Index';

const handleWidth = '30px';
const handleHeight = '5px';

const propTypes = {
    position: PropTypes.object.isRequired,
    selectedHike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
    selectedHike: null,
};

function mapStateToProps(state) {
    return {
        selectedHike: state.mapReducer.selectedHike,
    };
}

function mapDispatchToProps() {
    return {};
}

class MapScreen extends React.Component {
    renderContent = () => {
        const { theme, selectedHike } = this.props;

        return (
            <Body style={{ backgroundColor: theme.colors.sheetBackground }}>
                <StyledText>{selectedHike}</StyledText>
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
                    snapPoints={[35, 100, 35]}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                />
            </>
        );
    }
}

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(MapScreen));

const Body = styled.View`
    height: 100px;
    padding: ${spacing.small}px;
`;

const StyledText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.small}px;
`;

const Header = styled.View`
    padding-top: ${spacing.small}px;
    border-top-left-radius: ${spacing.tiny}px;
    border-top-right-radius: ${spacing.tiny}px;
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
