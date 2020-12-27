import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocationButton from '../map/button/Location';
import { spacing, transparentColors } from '../../constants/Index';
import { animationConfig } from '../../constants/Animation';

const propTypes = {
    shouldShowLocationButton: PropTypes.bool,
    mapRef: PropTypes.object,
};

const defaultProps = {
    shouldShowLocationButton: false,
    mapRef: {},
};

class SheetHeader extends React.PureComponent {
    render() {
        const { mapRef, shouldShowLocationButton } = this.props;

        return (
            <>
                {shouldShowLocationButton && (
                    <LocationButton
                        mapRef={mapRef}
                        animationConfig={animationConfig}
                    />
                )}
                <Header>
                    <HeaderPanel>
                        <HeaderHandle />
                    </HeaderPanel>
                </Header>
            </>
        );
    }
}

SheetHeader.propTypes = propTypes;
SheetHeader.defaultProps = defaultProps;

export default SheetHeader;

const Header = styled.View`
    padding-top: ${spacing.small}px;
    border-top-left-radius: ${spacing.tiny}px;
    border-top-right-radius: ${spacing.tiny}px;
    box-shadow: 0 -4px 3px ${transparentColors.grayLight};
    background-color: ${(props) => props.theme.sheetBackground};
`;

const HeaderPanel = styled.View`
    align-items: center;
`;

const HeaderHandle = styled.View`
    width: 35px;
    height: ${spacing.micro}px;
    border-radius: ${spacing.micro}px;
    margin-bottom: ${spacing.micro}px;
    background-color: ${(props) => props.theme.sheetHandle};
`;
