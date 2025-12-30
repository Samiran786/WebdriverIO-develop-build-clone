import { clickElement, findElement } from "./protocol.js";
import { retry_engine } from "./retry-engine.js";
export function $(selector){
    return{
        async click(){
            //await sendCommand("ELEMENT_CLICK", {selector});
            return retry_engine(async ()=> {
                    const elementId = await findElement(selector);
                    await clickElement(elementId);
            });
            
        }
    }
}