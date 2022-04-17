const { getDB } = require("../mysql");
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves todos from the "todos" array above.
const resolvers = {
    //Query
    Query: {
        todos: async () => {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                db.query("SELECT * FROM todo", (err, todos) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(todos);
                    }
                });
            });
        },
        todo: async (parent, args) => {
            const db = await getDB();
            // console.log("database", db);
            return new Promise((resolve, reject) => {
                db.query(`SELECT * FROM todo WHERE id=${args.id + 0}`, (err, todos) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("adididddd", todos);
                        resolve(todos[0]);
                    }
                });
            });
        }
    },
    //Mutation
    Mutation: {
        createTodo: async (parent, args) => {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO todo (description) VALUES("${args.description}")`, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(args);
                    }
                });
            });
        },
        deleteTodo: async (parent, args) => {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                db.query(`DELETE FROM todo WHERE id=${args.id}`, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(args);
                    }
                });
            });
        },
        editTodo: async (parent, args) => {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                db.query(`UPDATE todo SET description = "${args.description}", isFinished = ${args.isFinished} WHERE id=${args.id}`, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(args);
                    }
                });
            });
        }
    }
};
module.exports = resolvers