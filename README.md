This is a monorepo: Good Luch

```
$ yarn                     # install all deps
$ yarn @api docker         # start db
$ yarn @api knex seed:up   # populate users table
$ yarn @api start:dev      # start api (port 3080)
$ yarn @client dev         # client (port 3000)
