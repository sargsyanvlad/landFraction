## Install Dependencies
````
    $ npm install

````
##  Set Configurations
   create .env file and define your env variables
      ```` 
      
        ## server Configs
        HOST=
        PORT=
        
        # api key
        API_KEY=SoMEAPIKEY
        
        # db Configs
        DB_HOST=
        DB_NAME=
        DB_USERNAME=
        DB_PASSWORD=
        DB_DIALECT=
        DB_LOGGING= this value is 0 or 1 as false or true , default this logging is false
        
        ## auth config
        
        AUTH_PORT=
        
        AWS_ACCESS_KEY_ID=
        
        AWS_SECRET_ACCESS_KEY=
        
         ##  MAILER configs
         
         SEND_GRID_API_KEY=
        ## CORS Policy (i.e. CORS_WHITE_LIST=localhost:8000,https://brainstormtech.io)
        
        CORS_WHITE_LIST=
      ```` 

## Finally
````
    $ npm run migrate-up
    $ npm run seed-up
    $ npm run dev for development
    $ npm run prod for production 
````


