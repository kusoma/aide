const fetch = require('node-fetch');

module.exports = async function getCanvasAssignments(token) {
    let url = 'https://canvas.apu.edu/api/v1/users/self/upcoming_events'
    let data = await fetch(url, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*',
        }
    }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
        }
        return res.json();
    }).then(data => {
        const result = [];

        data.map((i) => {
            result.push({
                title: i.title,
                course: i.assignment.course_id,
                description: i.description,
                isQuiz: i.assignment.is_quiz_assignment,
                start: i.start_at,
                end: i.end_at,
            })
        })
        return result;
    }).catch(err => {
        return err;
    })
    return data;
}