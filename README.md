ToDo App -

Backend:
1. cd backend -> npm install
2. In 1st terminal, run: mysqld
3. Open the .env file. Update the DATABASE_URL to match your database setup on the new system.
3. To recreate the database schema on the new system, run: npx prisma migrate dev
4. Look for the table task under database tasks for the entries, using 2nd terminal: mysql -u root -p
5. Open 3rd Terminal to run Express.js backend server under server.js: nodemon start
6. You will find the API endpoints hit the server at localhost:4000/tasks

Frontend:
1. cd frontend -> npm install
2. Open 4th terminal, run: npm run dev. It should open localhost:3000/home
3. Can test all the mentioned functionalities for the task.