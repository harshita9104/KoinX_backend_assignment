
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
    

        

    

## Installation

1.  Clone the repository:
    
    ```
    git clone https://github.com/ravjot07/KoinX-Backend-Internship-Assignment.git
    ```
    
2.  Navigate to the project directory:
    
    ```
    cd KoinX-Backend-Internship-Assignment
    ```
    
3.  Install dependencies:
    
    ```
    npm install
    ```
    
4.  Create a `.env` file in the root directory and add the following:
    
    ```
    MONGO_URI=your_mongodb_connection_uri_here
    COINGECKO_API_KEY=your_coingecko_api_key_here
    ```
    

## Running the Project Locally

1.  Start the server:
    
    ```
    node index.js
    ```
    
2.  The server will run on **port 5000** by default.
    
3.  You can test the API endpoints using **Postman** or **curl**.
    

## API Endpoints

### `/stats`

-   **Description**: Retrieves the latest market data (price, market cap, 24-hour change) for a given cryptocurrency.
    
-   **Method**: GET
    
-   **Query Params**:
    
    -   `coin`: Name of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`).
        
-   **Example**:
    
    ```
    http://localhost:5000/api/stats?coin=bitcoin

    ```

    
-   **Response**:
    
    ```
    {
      "price": 61000,
      "marketCap": 1200000000,
      "24hChange": 2.5
    }
    ```
    
    This response provides the current market price, market capitalization, and the percentage change in price over the last 24 hours for the specified cryptocurrency.
    

### `/deviation`

-   **Description**: Returns the standard deviation of the price for the last 100 records of the requested cryptocurrency.
    
-   **Method**: GET
    
-   **Query Params**:
    
    -   `coin`: Name of the cryptocurrency (`bitcoin`, `ethereum`, `matic-network`).
        
-   **Example**:
    
    ```
    http://localhost:5000/api/deviation?coin=bitcoin
    ```
    
-   **Response**:
    
    ```
    {
      "deviation": 4082.48
    }
    ```
    
    