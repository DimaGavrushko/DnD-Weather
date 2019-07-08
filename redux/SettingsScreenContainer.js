import {connect} from "react-redux";
import SettingsScreen from "../screens/SettingsScreen";
import {CHANGE_LOCATION} from "./reducer";

const mapStateToProps = (state) => ({
    ...state
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

const SettingsScreenContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

export default SettingsScreenContainer;