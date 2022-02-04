export default function addNewTrail(trail, getToken) {
    fetch(`https://localhost:8443/api/trails/`, {
        method: 'POST',
        credentials: 'omit',
        headers: {
            'Authorization': 'Basic ' + getToken(),
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(trail)
    }).then(function (response) {
        console.log("Added new trail");        
    }).catch(error => {
        console.error("Error while adding a new trail: " + error);
    });
}
