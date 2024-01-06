-INSTALL SQUELIZE
npm install sequelize
-INSTALL Sequelize CLI
npm install --save-dev sequelize-cli
-INITILICE SEQUELIZE MIGRATION IN THE PROJECT
npx sequelize-cli init
-CREATE MIGRATION FILE 
npx sequelize-cli migration:generate --name=migration-name
-MIGRATION EJECUTION
npx sequelize-cli db:migrate
