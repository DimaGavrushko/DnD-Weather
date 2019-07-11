import {connect} from "react-redux";
import WeatherScreen from "../screens/WeatherScreen";
import {CHANGE_CITY, CHANGE_LOCATION} from "./reducer";

const mapStateToProps = ({api_key, lat, lon,  units}) => ({
    api_key,
    lat,
    lon,
    units
});

function changeLocation(lat, lon) {
    return {
        type: CHANGE_LOCATION,
        payload: {
            lat,
            lon
        }
    }
}

function changeCity(city) {
    return {
        type: CHANGE_CITY,
        payload: city
    }
}

const mapDispatchToProps = {
    changeLocation,
    changeCity
};

const WeatherScreenContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);

export default WeatherScreenContainer;