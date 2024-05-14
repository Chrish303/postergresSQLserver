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

        // Show the table datas
        companies: async () => {
            const client = await pool.connect();
            try {
                const result = await client.query('SELECT * FROM companies');
                return result.rows;
            } finally {
                client.release();
            }
        },
        company:async(_,{id})=>{
            const client =await pool.connect();
            try{
                const result = await client.query('SELECT * FROM companies WHERE id = $1',[id]);
                return result.rows[0];
            }finally{
                client.release();
            }
        }
    },
    Mutation: {
        // CREATE querysss
       createUser: async (_, { name, email, age, address, city, district, state, pincode }) => {
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO users (name, email, age, address, city, district, state, pincode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [name, email, age, address, city, district, state, pincode]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    } finally {
        client.release();
    }
},

        // company datas create
        createCompany: async (_, { name, role, location,opening,experience,skill }) => {
            const client = await pool.connect();
            try {
                const result = await client.query('INSERT INTO companies (name, role, location, opening, experience, skill) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, role, location,opening,experience,skill]);
                return result.rows[0];
            }finally {
                client.release();
            }
        },
        // UPDATE querys
        updateUser: async (_, { id, name, email,age,address,city,district,state,pincode }) => {
            const client = await pool.connect();
            try {
                const result = await client.query('UPDATE users SET name = $1, email = $2,age = $3,address = $4,city = $5,district = $6,state = $7,pincode = $8 WHERE id = $9 RETURNING *', [name, email,age,address,city,district,state,pincode,id]);
                return result.rows[0];
            } catch (error) {
                console.error('Error updating user:', error);
                throw new Error('Failed to update user');
            } finally {
                client.release();
            }
        },
        updateCompany: async (_, { id, name, role, location, opening, experience, skill }) => {
            const client = await pool.connect();
            try {
                const result = await client.query('UPDATE companies SET name = $1, role = $2, location = $3, opening = $4, experience = $5, skill = $6 WHERE id = $7 RETURNING *', [name, role, location, opening, experience, skill, id]);
                return result.rows[0];
            } catch (error) {
                console.error('ERROR updating company', error);
                throw new Error('Failed to update company');
            } finally {
                client.release();
            }
        },        
        // Delete querys
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
        },
        deleteCompany:async(_,{id})=>{
            const client = await pool.connect();
            try{
                const result = await client.query('DELETE FROM companies WHERE id = $1 RETURNING *',[id]);
                return result.rows[0];
            }catch(error){
                console.error('Error delete companies',error);
                throw new Error('Failed to delete')
            }finally{
                client.release();
            }
        }
    }
};

module.exports = resolvers;
