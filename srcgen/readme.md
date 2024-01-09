## Generate source files

node generate-model.js UserModel
node generate-controller.js UserController
node generate-route.js UserRoute
node generate-request.js UserRequest

# Con ts

- Model: npx ts-node srcgen/generators/model.ts Post //be PostModel.ts
- Model: npx ts-node srcgen/generators/controller.ts Post //be PostController.ts

# Migraciones 
## Crear archivo de migraciones
- npx knex migrate:make create_TABLENAME_table --env development --knexfile ./srcgen/knexfile.ts --migrations-directory .././db/migrations
## Correr migraciones
- npx ts-node node_modules/.bin/knex migrate:latest --knexfile ./srcgen/knexfile.ts

- npx ts-node srcgen/generators/all.ts Source
- npx ts-node srcgen/generators/resource-controller.ts Source

npx ts-node srcgen/generators/controller.ts StripeProduct
npx ts-node srcgen/generators/route.ts StripeProduct