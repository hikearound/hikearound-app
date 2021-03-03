import React from 'react';
import PropTypes from 'prop-types';
import HikeList from './HikeList';
import ProfileEmptyState from './empty/ProfileEmptyState';

const propTypes = {
    hikeData: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    showEmptyState: PropTypes.bool.isRequired,
};

const defaultProps = {
    loading: false,
};

class ProfileBody extends React.PureComponent {
    render() {
        const { hikeData, loading, showEmptyState } = this.props;
        const scrollRef = React.createRef();

        if (showEmptyState) {
            return <ProfileEmptyState />;
        }

        return (
            <HikeList
                scrollRef={scrollRef}
                hikeData={hikeData}
                loading={loading}
                showEmptyState={showEmptyState}
            />
        );
    }
}

ProfileBody.propTypes = propTypes;
ProfileBody.defaultProps = defaultProps;

export default ProfileBody;
