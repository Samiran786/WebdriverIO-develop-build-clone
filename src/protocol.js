import axios from 'axios';

let sessionId = null;
let baseUrl = 'http://localhost:9515/session';

export async function createSession(){
    const response = await axios.post(
            baseUrl,
        {
            capabilities:{
                alwaysMatch:{
                    browserName: 'chrome'
                }
            }
        }
    );

    sessionId = response.data.value.sessionId;
    console.log("Session created!");
    console.log('Session Created with ID: ', sessionId);
    return sessionId;
}


export async function sendCommand (method, endpoint, payload = {}){
    // console.log("Send command: ", command);
    // console.log("with data: ", payload);

    if(!sessionId){
        throw new Error('Session not created yet');
    }

    const url = `${baseUrl}/${sessionId}${endpoint}`;
    return axios({
        method,
        url,
        data: payload
    });
}