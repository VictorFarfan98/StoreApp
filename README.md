# StoreApp

# Connect PG Admin to our postgresql database instance.

• Login to pgAdmin with the given credentials:
• Right click on Servers and then "Create Server"
• In the connection tab, fill the following values:
    - Host: postgresql_database
    - Port: 5432
    - Maintenance database: storeDB
    - Usernase: admin
    - Password: admin1234
• Run "dotnet ef database update"
