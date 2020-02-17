exports.getCanvasAssignments = async (token) => {
    let url = 'https://canvas.apu.edu/api/v1/users/self/upcoming_events'
    let data = await fetch(url, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*',
        }
    }).then(res => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
        }
        return res.json();
    }).then(data => {
        return data;
    }).catch(err => {
        return err;
    })
    return data;
}

