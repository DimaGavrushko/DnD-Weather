export function getCurrentCoordinates() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                return res([currentLatitude, currentLongitude]);
            },
            (error) => rej(error.message),
            {
                enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
            }
        );
    })
}