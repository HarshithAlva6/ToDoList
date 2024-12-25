# ToDoList

npx create-next-app@latest frontend
mkdir backend
cd backend
npm init -y
npm install express cors dotenv prisma @prisma/client
npx prisma init
npx prisma migrate dev --name init

cd "C:\Program Files\MySQL\MySQL Server 9.0\bin"
mysqld --skip-grant-tables
mysqld --initialize --console 
mysqld 
mysqld --console

>mysql
SHOW DATABASES;
USE mydb;
SHOW TABLES;
DESCRIBE task;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'shetty';