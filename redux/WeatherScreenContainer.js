import {connect} from "react-redux";
import WeatherScreen from "../screens/WeatherScreen";
import {CHANGE_LOCATION} from "./reducer";

const mapStateToProps = ({api_key, lat, lon,  units}) => ({
    api_key,
    lat,
    lon,
    units
});

function change_location(lat, lon) {
    return {
        type: CHANGE_LOCATION,
        payload: {
            lat,
            lon
        }
    }
}

const mapDispatchToProps = {
    change_location
};

const WeatherScreenContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);

export default WeatherScreenContainer;