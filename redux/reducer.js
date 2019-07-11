export const CHANGE_LOCATION = 'weather/CHANGE_LOCATION';
export const CHANGE_UNIT = 'weather/CHANGE_UNIT';
export const CHANGE_CITY = 'weather/CHANGE_CITY';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_LOCATION:
            return { ...state, lat: action.payload.lat, lon: action.payload.lon };
        case CHANGE_UNIT:
            return { ...state, units: action.payload };
        case CHANGE_CITY:
            return { ...state, city: action.payload };
        default:
            return state;
    }
}