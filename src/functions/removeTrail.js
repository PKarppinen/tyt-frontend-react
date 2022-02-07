export default function removeTrail(id, getToken) {
    fetch(`https://localhost:8443/api/trails/` + id, {
        method: 'DELETE',
        credentials: 'omit',
        headers: {
            'Authorization': 'Basic ' + getToken(),
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(function (response) {
        console.log("Deleted the trail with id " + id);        
    }).catch(error => {
        console.error("Error while adding a new trail wit id: " + id + ". The error was " + error);
    });
}
