import {Lambda, AWSError} from "aws-sdk";
import { ENV } from "./enviromentModel";
import { PromiseResult } from "aws-sdk/lib/request";
/**
 * Invoke a Lambda From TypeScript
 * @param functionName --> Name of the function to run
 * @param data_to_send --> 
 * @returns Status of Invoking , either went well or didn't go well
 * @throws Error If Lambda Does not execute
 */
export const Lambda_Invoke  = function (functionName : string , body : Object) : Promise <PromiseResult<Lambda.InvocationResponse, AWSError>>
{
    // for local use the plugin 
    let lambda = (process.env as ENV).IS_OFFLINE 
    ? new Lambda({
        region: 'us-east-1',
        endpoint: 'http://localhost:3000'
    }) 
    : new Lambda(); 
    body = {
        body
    }
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(body),
        InvocationType : "Event"
    };
    
    return lambda.invoke(params).promise();
}