import { mapState } from '../constants/Reducers';

export default function mapReducer(state = mapState, action) {
    switch (action.type) {
        case 'INITIALIZE_MAP_DATA':
            return {
                ...state,
                selectedHike: action.mapData.selectedHike,
                selectedCity: action.mapData.selectedCity,
            };
        case 'UPDATE_MAP_DATA':
            return {
                ...state,
                selectedHike: action.mapData.selectedHike,
                selectedCity: action.mapData.selectedCity,
            };
        default:
            return state;
    }
}
