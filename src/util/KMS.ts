import {KMS, Endpoint, AWSError} from "aws-sdk";
import { Authentication } from "./Authentication";
import {ENV} from "./enviromentModel"
/**
 * KMS WRAPPER 
 * 
 * @description Wraps the kms functionality , promisifying things , and returning exactly what you want
 * @author Ahmad Baderkhan
 */
export class Encryptor
{
    private key_aws : string;
    private cipher_model : KMS;
    constructor (key_aws? : string)
    {   
        console.log ("INSTANTIATING ENCRYPTOR WITH ARN: ",(process.env  as ENV).KMS_KEY_ID);
        this.cipher_model = new KMS();
        this.key_aws = typeof key_aws != "undefined" ? key_aws : (process.env as ENV).KMS_KEY_ID;   
    }
    /**
     * Takes a plain text and encrypts it into an encoded string
     * @param plain_text 
     * @example 
     *          let encryptor = new Encryptor ();
     *          let plain_text = await encryptor.encrypt("plain_text_123");
     */
    async encrypt (plain_text : string) : Promise<any>  
    {
        let response_encrypt = await this.cipher_model.encrypt({
            KeyId : this.key_aws,
            Plaintext : plain_text
        }).promise();

        return response_encrypt.CiphertextBlob;
    }
    /**
     * Takes the cipher text and decrypts it into a plain text string
     * @param cipher_text 
     * @example 
     *          let encryptor = new Encryptor ();
     *          let plain_text = await encryptor.decrypt("<someCIPHER");
     */
    async decrypt (cipher_text) : Promise<string>
    {
        let resonse_decrypt = await this.cipher_model.decrypt({
            CiphertextBlob : Buffer.from(cipher_text)
        }).promise();

        return resonse_decrypt.Plaintext.toString();
    }
}