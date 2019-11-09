import { Handler, Context, Callback } from 'aws-lambda';

/**
 * This is a test handler to make sure we can use all the functionality for dev
 * @param event 
 * @param context 
 * @param callback 
 */
const hello: Handler = async (event: any, context: Context, callback: Callback) => {
  
    
 return {
   StatusCode : 200
 };
    


};



export { hello }