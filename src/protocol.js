import axios from 'axios';
import { retry_engine } from './retry-engine.js'

let sessionId = null;
let baseUrl = 'http://localhost:9515/session';
const ELEMENT_KEY = 'element-6066-11e4-a52e-4f735466cecf';
let retryNumber =0;

/*
    Going to create createSession() which will return a sessionId - 
    In this function I will hit post method on the baseUrl by axios and will extract the sessionId
    from that response - response.data.value.sessionId
*/
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
    //console.log(response);
    console.log("Session created!");
    console.log('Session Created with ID: ', sessionId);
    return sessionId;
}

/*
    Going to create "sendCommand(method, endpoint, payload = {})" which return the axios response
    of the given parameters like method, url and data: payload.
*/
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

/*
    Step-1: Going to create "findElement(selector)" function to find an element - 
    it will return a elementId which will be needed to perform action on that.
    Framework works on elementId not the element itself.

    Step-2: Wrapping up this function with retry_engine for auto-waiting purpose
 */
 export async function findElement(selector){
    return retry_engine(async ()=> {
        retryNumber++;
        console.log(`Retry number : ${retryNumber}`)
        console.log("The retry for findElement has been started");

        const response = await sendCommand(
            'post',
            '/element',
            {
                using : 'css selector',
                value: selector
            }
        );

        // console.log(response);
        
        // WebDriver returns an element reference object
        const elementId = response?.data?.value?.[ELEMENT_KEY];
        return elementId;
    });
}

 /*
    Going to create a clickElement(elementId) function to perform click action -
    It will only going to run the post request to endpoint "/element/${elementId}/click"
 */
export async function clickElement(elementId){
        await sendCommand(
            'post',
            `/element/${elementId}/click`
        );
}

/*
    Going to create a openPageUrl(url) function to perform open a page - 
    It will only going to run the post request to endpoint "/url" with { url } payload
*/
export async function openPageUrl(url){
    await sendCommand(
        'post',
        '/url',
        { url }
    );
}