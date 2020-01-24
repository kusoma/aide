var request = require('request');

// TODO: grab access token from mongodb
var headers = {
    'Authorization': 'Bearer 2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO'
};

var options = {
    url: 'https://canvas.apu.edu/api/v1/users/self/upcoming_events',
    headers: headers
};

request(options, (err, res, body) => {
    if (err) throw err;
    if (res.statusCode == 200) {
        return body;
    }
});
