export const defaultState = {
    feedHikeCount: 0,
    loading: false,
    firstLoad: false,
    sortDirection: 'asc',
    querySize: 10,
    view: 'feed',
    hikes: [],
    currentPosition: {},
    lastKnownPosition: {},
    city: '',
    distance: 25,
    promotion: { shouldShow: false },
};

export default defaultState;
