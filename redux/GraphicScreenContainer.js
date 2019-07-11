import {connect} from "react-redux";
import GraphicScreen from "../screens/GraphicScreen";
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

const GraphicScreenContainer = connect(mapStateToProps, mapDispatchToProps)(GraphicScreen);

export default GraphicScreenContainer;
