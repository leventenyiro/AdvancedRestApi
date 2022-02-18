# AdvancedRestApi

Package Manager Console
```
PM> add-migration InitCreate
PM> update-database
```

## OData
it helps in queries
https://localhost:7130/api/users?$select=id,Name&$orderby=Name%20desc
https://localhost:7130/api/users?$filter=Name eq 'Levi'

## Nugets
+ AutoMapper.Extensions.Microsoft.DependencyInjection
+ Microsoft.AspNetCore.OData
+ Microsoft.EntityFrameworkCore
+ Microsoft.EntityFrameworkCore.SqlServer
+ Microsoft.EntityFrameworkCore.Tools
+ AspNetCoreRateLimit

## Deployment
Frontend: https://www.youtube.com/watch?v=FW2-_ce_eNc

## Angular info
use promise in http:
 - https://balramchavan.medium.com/using-async-await-feature-in-angular-587dd56fdc77
 - https://www.learnrxjs.io/learn-rxjs/operators/utility/topromise
