# Crm Integration

---

## General
#### Objectives : 
   - Push Audience Profile Data to client's crm on a schedule using AWS-Lambda
   - Notify Success Failures
   - Pull Unique Audience Profile For Each client
#### Authors : 
   - Ahmad Baderkhan (Dev) 
   -  Alan Pan (Product)
#### Language : 
   - TypeScript
   - Yaml 
#### Libraries/Frameworks Used : 
   - Lambda
   - Axios
   - Serverless
   - aws-sdk
#### Supported Crms : 
   - Slate
   - Support for Ellucian and other Rest Based Crms is Coming
#### Rules : 
   - Keep the playground tidy 
   - Use the Type Feature from typescript , try to abstract things as much as possible
   - Avoid Writing functions that return `Any`. It's discouraged , unless it's promise related!
   - You can write up a data structure using an interface without having a class definition
     - useful for making a schema for data that was posted to you
   - Document Everything 
   - Use Consistent Easy to understand variable names/classes/tables

---

## Dependencies 
   - yarn
   - nodejs/npm 
     - version > 10
   - serverless
   - AWS credentials / iam roles setup
   - Java JDK/SDK 
     - version > 11
     - For DynamoDb Local
   - Ports free (LOCAL) : 
     - localhost:3000
     - localhost:8000
--- 

## Deploy/Start 

There's multiple functionalities supported by the crm integration project. The 2 basic important functionalities is deployment and starting locally. 

#### Getting Started : 
  - To get started you must first pull dependencies
    ```bash
    yarn
    ```
  - Then you must initialize The DynamoDb local
    ```bash
    yarn run dynamodb:install
    ```

#### Deployment :
Deployment for this project falls in 3 stages : 

  - dev
  - prod
  - qa

To deploy a project given a stage name 

```bash
yarn run deploy:<<STAGE_NAME>>
```

#### Local Start : 

Make sure you completed the getting started step ;otherwise,
do that step before you run the following command. 

  - In order to start in a localhost:3000 port you should run the following command
  - Note This will run everything under the dev stage , so all the paramters are DEV paramters

    ```bash
    yarn run start
    ```
 
---- 
## Usage
Generally , the system works by sending a client configuration to the clientconfig endpoint. This endpoint then persists the client configuration and options for how they want to receive the data. The system will then run on a schedule DAILY/WEEKLY/MONTHLY and batch process said clients that fall under the exclusivity of the aforementioned schedules.
#### Posting Client configuration: 
   - POSTING example : 
      - Schema Required (Slate Example)

      ```
      
        {
	        "api_key" : "api_key_for_lambda", 
            "client":{
                "api_endpoint" : "someEndpoint.com",
                "inst_id" : "1234567810111213",
                "credentials" : {
                    "user_name" : "service_user",
                    "password": "serrvice_pwd"
                },
                "frequency" : "DAILY",
                "application_type" : "JSON",
                "crm_type" : "SLATE",
                "email" : "ahmadbedirxan@gmail.com",
                "notify_client" : false
            }
         }
         
      ```

      - Using Postman/Any Api Tester
        - Post To EndpointName.com/appendClientToSchedule  

#### Testing Schedule : 
We can force the schedules to fire off for daily/weekly/monthly clients for testing purposes , as such we can monitor to see if it went through just fine or not.After Posting a client configuration , we can run any of these 3 endpoints.

   - Supported Schedules : 
     - daily 
     - weekly
     - monthly

   - For Client Schedule Call : 
     - Endpoint.com/start/`<<SCHEDULE>>`
 
---

## Endpoints / Resources
There's Some resources you should keep an eye on for this project : 

   - Desing :
     - **[Product Design](https://youvisit.atlassian.net/wiki/spaces/PRODUCT/pages/636092417/Managed+Service+-+Slate+Integration+for+Inquiries)**
     - **[Technical [UML BASED]](https://drive.google.com/open?id=1kYmlghshdkN8hh8v6EtQiw5CiKi6f3pl)**
  
   - Endpoint : 
     - SomeEndpoint.com

   - Tables Used : 
     - see serverless.yml 
   
   - Misc : 
     - This project uses lambda
     - Uses Dynamo db for persistance
     - Cron jobs for schedules
     - Audience Api to pull individual client Audiences  

---

For Any Help Contact :

  -  **[Ahmad Baderkhan [Dev]](ahmad.baderkhan@youvisit.com)**.
  -  **[Alan Pan [Product]](alan.pan@youvisit.com)**
