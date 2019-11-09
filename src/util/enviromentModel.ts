/**
 * Enviroment Variable Model for the .env
 */
export type ENV = (typeof process.env) &  
{
    ENVIROMENT : string, // discouraged , but for any reason we might need the current env
    SCHEDULE : string, // the schedule we're on in the function , daily , weekly , monthly
    AUDIENCE_PROFILE_ENDPOINT : string, // AUDIENCE profile api for all the data
    DYNAMO_CLIENT_CONFIG_NAME : string, // Dynamo db table for client configs
    DYNAMO_JOB_NOTIFICATION_TABLE : string; // dynamo db table for notifications tables
    O_AUTH_ENDPOINT : string; // endpoint for authentication
    IS_OFFLINE : boolean; // check if we're localhost
    KMS_KEY_ID : string; // KMS key we use to encrypt decrypt stuff
    FUNCTION_BASE_NAME : string; // the function base name
    COLLECTOR_FN : string; // CONFIG HANLDER FUNCTION NAME , THE FUNCTION THAT INGESTS THE CLIENT CONFIGURATION
    SCHEDULER_DAILY_FN : string; // SCHEDULER FUNCTION NAME, THE FUNCTION THAT RUNS THE SCHEDULE FOR PROCESSING CLIENT REQUEST
    CRM_API_FN : string; // CRM API , THE FUNCTION THAT WE PASS THE CLIENT CONFIG AND LET IT POST TO AN ENDPOINT
    AUDIENCE_API_ENDPOINT : string;
    YV_AUTO_EMAIL : string;
    
   
}
