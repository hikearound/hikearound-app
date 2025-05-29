import styled from 'styled-components/native';

const CenteredContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0;
    background-color: ${(props) =>
        props.theme.mode === 'dark' ? props.theme.rootBackground : '#F5F5F5'};
`;

export default CenteredContainer;
