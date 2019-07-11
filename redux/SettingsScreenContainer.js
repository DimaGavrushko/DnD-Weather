import {connect} from "react-redux";
import SettingsScreen from "../screens/SettingsScreen";
import {CHANGE_LOCATION, CHANGE_UNIT} from "./reducer";

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

const mapDispatchToProps = {
    changeLocation,
    changeUnit
};

const SettingsScreenContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

export default SettingsScreenContainer;