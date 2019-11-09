import {SES} from "aws-sdk"
import { ENV } from "./enviromentModel";
/**
 * Mail Wrapper for aws-emailer
 * @author Ahmad Baderkhan
 */
export class SnailMail
{
    private sender : string;
    private recipient : string;
    private aws_emailer : SES;
    private static CHARSET  : string =  "UTF-8";
    private static YV_SENDER : string = (process.env as ENV).YV_AUTO_EMAIL;

    /**
     * Models an Aws - Sdk Email sender
     * @param sender email for sender
     * @param recipient email for receiver
     */
    constructor (recipient : string)
    {
        this.sender = SnailMail.YV_SENDER;
        this.recipient = recipient;
        this.aws_emailer = new SES({ 
            region: 'us-east-1',
            apiVersion: "2010-12-01" 
        });
    }

    /**
     * send the email to recipient , it will return a promise Await it
     * @param subject --> string description
     * @param body_html --> html for email body
     */
    public send_custom (subject : string , body_html : string) : Promise <any>
    {
        const params = {
            Source: this.sender, 
            Destination: { 
            ToAddresses: [
                this.recipient
            ],
            },
            Message: {
            Subject: {
                Data: subject,
                Charset: SnailMail.CHARSET
            },
            Body: {
                Html: {
                Data: body_html,
                Charset: SnailMail.CHARSET
                }
            }
            }
        }
        return this.aws_emailer.sendEmail(params).promise();
    }

    /**
     * Sends a Specific Success or Fail Notification to the clients Involved
     * @param is_posted 
     */
    public send_crm_notification(is_posted : boolean) : Promise <any>
    {
        const default_html_body : string = "<p> Crm Data  " + 
        is_posted ? 
        "Posted SuccessFully to The web service Endpoint" :
        "Could Not Post to the the web service endpoint, Please Contact a Youvisit Representative" + 
        "</p>";
        
        const default_subject : string = "Youvisit Crm Push " +
        is_posted ? 
        "SUCCESS" :
        "FAIL";
        
        return this.send_custom(
            default_subject,
            default_html_body
        );
    } 

}