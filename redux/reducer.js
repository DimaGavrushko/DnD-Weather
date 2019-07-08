export const CHANGE_LOCATION = 'weather/CHANGE_LOCATION';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_LOCATION:
            return { ...state, lat: action.payload.lat, lon: action.payload.lon };
        default:
            return state;
    }
}