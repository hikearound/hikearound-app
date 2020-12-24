export const defaultState = {
    feedHikeCount: 0,
    loading: false,
    firstLoad: false,
    sortDirection: 'asc',
    querySize: 25,
    queryType: 'feed',
    view: 'feed',
    hikes: [],
    currentPosition: {},
    lastKnownPosition: {},
    city: '',
    distance: 50,
    promotion: { shouldShow: false },
};

export default defaultState;
