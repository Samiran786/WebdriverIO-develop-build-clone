import { retry_engine } from "../src/retry-engine.js";

let attempt=0;

async function dummyAction(){
    attempt++;
    console.log(`Attempt ${attempt}`);
    
    if (attempt < 3){
        throw new Error("Still not ready");
    }
    
    return 'Success';
    
}

await retry_engine(dummyAction);