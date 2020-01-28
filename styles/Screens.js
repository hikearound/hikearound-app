import styled from 'styled-components';

export const RootView = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.rootBackground};
`;

export default { RootView };
