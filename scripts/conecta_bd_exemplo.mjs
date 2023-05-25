import {Client} from 'pg/lib';

// Configurações de conexão com o banco de dados
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'teste_conexao',
  password: 'setic2022#',
  port: 5432, // porta padrão do PostgreSQL
};

// Função para conectar ao banco de dados
async function connectToDatabase() {
  const client = new Client(dbConfig);
  await client.connect();
  console.log('Conexão estabelecida com o banco de dados');
  return client;
}

// Função para executar uma consulta SQL
async function executeQuery(query, values) {
  const client = await connectToDatabase();
  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
  } finally {
    await client.end();
    console.log('Conexão com o banco de dados encerrada');
  }
}

// Exemplo de operações CRUD

// INSERT
async function insertData(name, email) {
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2)';
  const values = [name, email];
  await executeQuery(query, values);
}

// DELETE
async function deleteData(id) {
  const query = 'DELETE FROM users WHERE id = $1';
  const values = [id];
  await executeQuery(query, values);
}

// UPDATE
async function updateData(id, name, email) {
  const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
  const values = [name, email, id];
  await executeQuery(query, values);
}

// CREATE
async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
  `;
  await executeQuery(query);
}

// Exemplo de uso

// Conectar ao banco de dados
connectToDatabase()
  .then(() => {
    // Criar tabela (se ainda não existir)
    createTable()
      .then(() => {
        // Inserir dados
        insertData('João', 'joao@example.com');
        insertData('Maria', 'maria@example.com');
      })
      .then(() => {
        // Atualizar dados
        updateData(1, 'João Silva', 'joao.silva@example.com');
      })
      .then(() => {
        // Excluir dados
        deleteData(2);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
