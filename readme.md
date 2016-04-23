## Marketing Tracking Tool

## INSTALATION
- run POST http://master-tool.dev/install with json body to generate .en variable and check database connection:
```{
    "db-host": "localhost",
    "db-database":"homestead",
    "db-username":"homestead",
    "db-password":"secret"
}```
- run GET http://master-tool.dev/run-migrations to create all necessary tables in database
