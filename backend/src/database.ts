import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'PRODUCTION';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction 
    ? { rejectUnauthorized: false }
    : false
});

const initDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      descricao TEXT,
      status VARCHAR(20) DEFAULT 'pendente',
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Tabela 'tasks' verificada/criada com sucesso.");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  }
};

initDb();

pool.on('connect', () => {
  console.log('Conexão com a Base de Dados PostgreSQL estabelecida com sucesso!');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no PostgreSQL', err);
  process.exit(-1);
});
