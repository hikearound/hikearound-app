export const defaultState = {
    hikes: [],
    reviews: [],
    currentPosition: {},
    lastKnownPosition: {},
    loading: false,
    firstLoad: false,
    sortDirection: 'asc',
    querySize: 25,
    queryType: 'feed',
    city: '',
    distance: 50,
    promotion: { shouldShow: false },
};

export default defaultState;
