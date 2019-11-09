const phash = require ("password-hash");
import {generateUUID} from "../Helpers/UUID";
import {DynamoDb} from "../util/DyanmoDb";
/**
 * Credentials Model That mimics the mininmal fields required to 
 * Identifiy a User
 */
type Credentials = {
    user_id : string, // MUST BE UUID FORMAT !!
    user_name : string, // MUST BE UNIQUE
    password:string; // MUST Be Longer Than 8 characters
}
/**
 * Models A User Under Dalabungas
 * We Only Need The User's user_id and password
 * 
 * @author Ahmad Baderkhan
 */
export class User 
{
    private credentials : Credentials;
    private db_model : DynamoDb;
    private static DB_TABLE : string;
    
    // Response Codes for Persisting Data
    private static PERSIST_CODE : {
        CLASH : -1,
        WRITE_ERROR  : 0,
        OK : 1
    };

    constructor(user_name : string , pass_word : string,is_new_user : boolean)
    {
        // Our Db Connection Model
        this.db_model = new DynamoDb(
            User.DB_TABLE
        );
        // Sign up 
        if (is_new_user)
        {
            this.credentials.user_id = generateUUID();
            this.credentials.user_name = user_name;
            this.credentials.password = this.hash_pwd(
                pass_word
            );
        }
        else // VERIFY MODE
        {
            this.credentials.user_name = user_name;
            this.credentials.password = pass_word;
        }
        
    }

    /**
     * Generate a Type Strict User Object From a lose schema
     * @param obj 
     */
    public static GENERATE_USER_FROM_OBJ (obj : any) : User
    {
        return new User(
            obj.user_name,
            obj.password,
            obj.is_new_user
        );
    }   

    /**
     * Hash Password
     * @param password 
     */
    private hash_pwd (password : string) : string
    {
        return phash.generate(password);
    }

    /**
     * Verify plain text password with hash_value
     * @param plain_text 
     * @param hash_value 
     */
    private verify_password (plain_text : string,hash_value : string)
    {
        return phash.verify(
            plain_text,
            hash_value
        );
    }

    /**
     * Compare The Db Value for client to 
     */
    public async verify_user () : Promise <boolean>
    {
        let compare_model : Credentials = await this.db_model.get_one_record_by_filter(
            "user_name",
            this.credentials.user_name
        ) as Credentials;

        return this.verify_password(
            this.credentials.password,
            compare_model.password
        );
    }

    /**
     * Save User in a Database , Minimal Object like the Credentials only
     * 
     * @returns true No User Name Clash
     * @returns falsse USer Clash with database model
     */
    public async persist_user () : Promise <number>
    {
        const user_exists : boolean = await this.db_model.get_one_record_by_filter(
            "user_name",
            this.credentials.user_name,
            true
        );

        if (user_exists) return User.PERSIST_CODE.CLASH;

        try 
        {
            let response = await this.db_model.putRecord(
                this.credentials
            );
    
            if (response)
            {
                return User.PERSIST_CODE.OK
            }
            else 
            {
                return User.PERSIST_CODE.WRITE_ERROR;
            }
        }
        catch (e)
        {
            return User.PERSIST_CODE.WRITE_ERROR;
        }
    }
}