import { mapState } from '@constants/Reducers';

export default function mapReducer(state = mapState, action) {
    switch (action.type) {
        case 'INITIALIZE_MAP_DATA':
            return {
                ...state,
                selectedHike: action.mapData.selectedHike,
                selectedCity: action.mapData.selectedCity,
                markers: action.mapData.markers,
            };

        case 'UPDATE_MAP_DATA':
            return {
                ...state,
                selectedHike: action.mapData.selectedHike !== undefined ? action.mapData.selectedHike : state.selectedHike,
                selectedCity: action.mapData.selectedCity !== undefined ? action.mapData.selectedCity : state.selectedCity,
                selectedRoute: action.mapData.selectedRoute !== undefined ? action.mapData.selectedRoute : state.selectedRoute,
                routeCoordinates: action.mapData.routeCoordinates !== undefined ? action.mapData.routeCoordinates : state.routeCoordinates,
            };

        default:
            return state;
    }
}
