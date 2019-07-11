import {connect} from "react-redux";
import SettingsScreen from "../screens/SettingsScreen";
import {CHANGE_LOCATION, CHANGE_UNIT, CHANGE_API_KEY} from "./reducer";

const mapStateToProps = ({api_key, lat, lon,  units, city}) => ({
    api_key,
    lat,
    lon,
    units,
    city
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

function changeUnit(unit) {
    return {
        type: CHANGE_UNIT,
        payload: unit
    }
}

function changeApiKey(key) {
    return {
        type: CHANGE_API_KEY,
        payload: key
    }
}

const mapDispatchToProps = {
    changeLocation,
    changeUnit,
    changeApiKey
};

const SettingsScreenContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

export default SettingsScreenContainer;