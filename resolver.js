const pool = require('./db');
const _ = require('lodash');

const resolvers = {
    Query: {
        users: async () => {
            const client = await pool.connect();
            try {
                const result = await client.query('SELECT * FROM users');
                return result.rows;
            } finally {
                client.release();
            }
        },
        user: async (_, { id }) => {
            const client = await pool.connect();
            try {
                const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
                return result.rows[0];
            } finally {
                client.release();
            }
        },
        // company datas create
        companies: async () => {
            const client = await pool.connect();
            try {
                const result = await client.query('SELECT * FROM companies');
                return result.rows;
            } finally {
                client.release();
            }
        }
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            const client = await pool.connect();
            try {
                const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
                return result.rows[0];
            } catch (error) {
                console.error('Error creating user:', error);
                throw new Error('Failed to create user');
            } finally {
                client.release();
            }
        },
        // company datas create
        createcompany: async (_, { name, role, location }) => {
            const client = await pool.connect();
            try {
                const result = await client.query('INSERT INTO companies (name, role, location) VALUES ($1, $2, $3) RETURNING *', [name, role, location]);
                return result.rows[0];
            }finally {
                client.release();
            }
        },
        updateUser: async (_, { id, name, email }) => {
            const client = await pool.connect();
            try {
                const result = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
                return result.rows[0];
            } catch (error) {
                console.error('Error updating user:', error);
                throw new Error('Failed to update user');
            } finally {
                client.release();
            }
        },
        deleteUser: async (_, { id }) => {
            const client = await pool.connect();
            try {
                const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
                return result.rows[0];
            } catch (error) {
                console.error('Error deleting user:', error);
                throw new Error('Failed to delete user');
            } finally {
                client.release();
            }
        }
    }
};

module.exports = resolvers;
