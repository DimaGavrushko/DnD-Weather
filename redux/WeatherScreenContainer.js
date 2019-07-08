import {connect} from "react-redux";
import WeatherScreen from "../screens/WeatherScreen";
import {CHANGE_LOCATION} from "./reducer";

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

const mapDispatchToProps = {
    changeLocation
};

const WeatherScreenContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);

export default WeatherScreenContainer;