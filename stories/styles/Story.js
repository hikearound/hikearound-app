import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View } from 'react-native';

const StoryWrapper = styled(View)`
    flex: 1;
    background-color: ${(props) => props.backgroundColor || 'transparent'};
`;

const CenteredContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${(props) => props.backgroundColor || 'transparent'};
`;

export const StoryContainer = ({
    children,
    backgroundColor = 'transparent',
}) => (
    <StoryWrapper backgroundColor={backgroundColor}>
        <CenteredContainer backgroundColor={backgroundColor}>
            {children}
        </CenteredContainer>
    </StoryWrapper>
);

StoryContainer.propTypes = {
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
};

StoryContainer.defaultProps = {
    backgroundColor: 'transparent',
};

export { StoryWrapper };
export default CenteredContainer;
