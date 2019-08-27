import React from 'react';
import styled from 'styled-components';
import HikeList from './HikeList';

class ProfileBody extends React.PureComponent {
    render() {
        const { hikes, loading, maybeShowEmptyState } = this.props;

        return (
            <BodyWrapper>
                <HikeList
                    hikes={hikes}
                    loading={loading}
                    maybeShowEmptyState={maybeShowEmptyState}
                />
            </BodyWrapper>
        );
    }
}

export default ProfileBody;

const BodyWrapper = styled.View`
`;
