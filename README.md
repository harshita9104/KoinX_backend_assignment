
# KoinX Backend Internship Assignment

This project is a backend server built for KoinX Backend Internship Assignment. It implements various API endpoints using Node.js and MongoDB, fetching and storing cryptocurrency data from CoinGecko.

## Features

-   **Background Job**: A cron job that runs every 2 hours to fetch the latest price, market cap, and 24-hour change of Bitcoin, Ethereum, and Matic using CoinGecko API and stores them in MongoDB.

        
-   **API Endpoints**:
    
    -   `/stats`: Provides the latest price, market cap, and 24-hour change of a given cryptocurrency.

            
    -   `/deviation`: Calculates and returns the standard deviation of the price for the last 100 records of the given cryptocurrency.
        
            

## Technologies Used

-   **Node.js**: JavaScript runtime for server-side programming.
    

        
-   **Express.js**: Web framework for building the REST APIs.
    

-   **MongoDB**: NoSQL database to store cryptocurrency data.

        
-   **Mongoose**: ODM library for MongoDB interactions.
    

        
-   **Axios**: HTTP client to make API requests to CoinGecko.
    

        

    


    
   
