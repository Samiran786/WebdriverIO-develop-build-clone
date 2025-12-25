import {spawn} from 'child_process';
import chromedriver from 'chromedriver';

const driver = spawn(chromedriver.path, ['--port=9515']);

driver.stdout.on('data', data =>{
    console.log(`chromedriver: ${data}`);
});

driver.stderr.on('data', data =>{
    console.error( `chromedriver error: ${data}`);
})