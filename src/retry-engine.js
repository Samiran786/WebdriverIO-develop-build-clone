/*
Currently going to create a retry function which will have 'action', 'timeout', and 'interval'
parameter.
-> it will try to execute a action within the timeout and if any error comes we will set timeout
to wait to resolve that error. The setTimeout will have the interval time as timeout parameter.
*/
export async function retry_engine(action, timeout=5000, interval=500){
    let startTime = Date.now(); // Current Time
    let lastError;

    while(Date.now() - startTime < timeout){
        console.log("While loop started");
        try{
            return await action();
        }catch(error){
            lastError = error;
            console.log("Caught error:", error);
            await new Promise(resolve => setTimeout(resolve, interval));
        }    
    }

    throw new Error(
        `Retry timeout exceeded after ${timeout} ms, Last Error Message: ${lastError?.Error}`
    );
}