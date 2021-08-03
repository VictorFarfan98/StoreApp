# StoreApp

## Tech Stack
    • FrontEnd: Angular
    • Backend: .Net Core
    • Database: PostgreSQL
    
    
## Setup environment
*(Database dump is located in the root of the repository.)*<br/>
This project includes a docker compose that set ups the API, the Client, the Database and a PG Admin instance in order to have the entire app environment grouped in a single place. 

1. To run the app open a terminal instance and locate yourself in the root directory *(where docker-compose.yml file is located)*
2. Make sure you have the following ports available: 
    * 5000 (Frontend)
    * 5001 (API)
    * 5432 (Postgres instance)
    * 5050 (PG Admin instance)
3. Run ``` docker compose up -d --build ```
4. Wait until all the containers are initialized and are up and running
5. Run the Entity Framework migrations for setting up the database *(You can skip this step if you restore the database with the given dump)*
    1. Go to the .Net Core API directory folder ```StoreAPI/StoreApi```
    2. Make sure you have the Entity Framework CLI installed. If not run this commands: 
        * ```dotnet tool install --global dotnet-ef```
        * ```dotnet tool update --global dotnet-ef```
        * Verify it with the following command: ```dotnet ef```
    3. Run ```dotnet ef database update``` in order to run the migration and update the database.
6. Open a browser window and go to ```localhost:5000``` in order to open the web application.

## Connect to our PostgreSQL database instance.
*(In order to restore the given database dump you will need to use your own postgres client or copy the dump inside of the PGAdmin volume.)*

1. Open a browser window and go to ```localhost:5050``` in order to open the given PG Admin instance.
2. Login to pgAdmin with the given credentials:
    * email: pgadmin@example.com
    * password: pgadmin1234
3. Right click on Servers and then "Create Server"
4. In the connection tab, fill the following values:
    * Host: postgresql_database
    * Port: 5432
    * Maintenance database: storeDB
    * Usernase: admin
    * Password: admin1234
