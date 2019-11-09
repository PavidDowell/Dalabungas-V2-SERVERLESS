import { DynamoDB } from "aws-sdk"
import {ENV} from "./enviromentModel";

/**
 * BareBones Implmenetation of Dynamo db , simplified and made easy 
 * for basic DynamoDb Operations, Furthermore , this integrates well with 
 * Dyanmo Offline and severless Offline
 * 
 * @example To use the package you need to instantiate it as such 
 *          let dy_wrapper : DynamoDb = new DynamoDb("sometable124");
 *          let all_records : Array<Object> = await dy_wrapper.get_all();
 *          // ALL THESE METHODS ARE ASYNC THEREFORE , THEY MUST BE WRAPPED
 *          // AROUND AN ASYNC BLOCK
 * @author AHMAD BADERKHAN 
 */
export class DynamoDb
{
    private dbModel : DynamoDB.DocumentClient;
    private tableName : string;
    constructor (tableName : string)
    {
        this.dbModel = (process.env as ENV).IS_OFFLINE
        ? new DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            }
        )
        : this.dbModel = new DynamoDB.DocumentClient();
        
        this.tableName = tableName;
    }

    /**
     * Get One Record by Some Key attribute (INDEX...ETC)
     * @param key 
     * @param value 
     */
    async get_one_record_by_filter(key : string , value : string,just_count : boolean = false) : Promise <any>
    {   
        const params = {
            TableName: 'ClientConfigurations-DEV',
            Key: { // a map of attribute name to AttributeValue for all primary key attributes
            
                "key": value, //(string | number | boolean | null | Binary)
                // more attributes...
        
            },
        };
        let response = await this.dbModel.get(params).promise();

        if (!just_count)
        {   
            return Object.entries((response.Item)).length > 0;
        }
        else 
        {
            return response.Item;
        }
 
       
    }

    /**
     * Get All Records By filtering the ones that have the following Values
     * @param key 
     * @param value 
     */
    async get_all_records_by_filter (key : string ,value : string) : Promise <Array<Object>>
    {
        let hash_key = "#"+key;
        const ExpressionAttributeNames = JSON.parse("{\""+hash_key+"\":\""+key+"\"}");
        const params = {
            TableName: this.tableName,
                              
            FilterExpression: hash_key+" = :value", // a string representing a constraint on the attribute
            ExpressionAttributeNames,
            ExpressionAttributeValues: {
                ":value" : value
            }
        };
        let response = await this.dbModel.scan(params).promise();
        return response.Items;
    }

    /**
     * Returns all the records inside a given table
     * 
     * @NOTE becareful when you're using this to pull everything , there's a 1mb limit i think
     */
    async get_all () : Promise <Array<Object>>
    {
        const params = {
            TableName : this.tableName
        }
        let response = await this.dbModel.scan(params).promise();
        return response.Items;
    }

    /**
     * Puts 1 record into a database Table
     * and returns a promise with a status of either written or not
     * 
     * @example we can use the boolean status to see if it wrote it 
     *          let is_written : boolean = await db_wrapper.putRecord({name:"captain_ahab"});
     *          if (is_written){
     *              // do something
     *          }
     * 
     * @param data 
     * 
     */
    async putRecord (data:any) : Promise <boolean>
    {
        
        const params = {
            TableName: this.tableName,
            Item:data
        };

        // Call DynamoDB to add the item to the table
        let response = await this.dbModel.put(params).promise();

        return response.$response.data != null;
    }
}