## Marketing Tracking Tool

## INSTALATION

1) 
`git clone git:// https://github.com/lycha/masters-thesis.git`

2) 
`curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" '{
    "db-host": "localhost",
    "db-database":"homestead",
    "db-username":"homestead",
    "db-password":"secret"
}' "http://api.domain-name.dev/install"`

3) 
`curl -X GET -H "Cache-Control:no-cache" "http://api.domain-name.dev/run-migrations"`

4)
`curl -X POST -H "Cache-Control: no-cache" "http://api.domain-name.dev/init-permissions"`

5)
`curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" '{
    "name": "username",
    "email": "user@example.com ",
    "password": "secret"
}' "http://api.domain-name.dev.dev/init-roles"`


## Dependencies
- https://github.com/kodeine/laravel-acl/ for user management