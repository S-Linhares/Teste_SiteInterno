const { Client } = require('pg');

// Configuração para conexão com o banco de dados (postgreSQL)
var config = {
    user: 'postgres',
    host: 'localhost',
    database: 'teste_conexao',
    password: 'setic2022#',
    port: 5432
};

//Função que faz a conexão ao banco de dados
async function conecta_db(){
    var client = new Client(config);
    await client.connect();
    console.log('Conexão estabelecida com sucesso!');
    return client;
}

//Função que executa os comandos SQL
async function executa_comandos(comando){
    var client = await conecta_db();
    try {
        var result = await client.query(comando);
        return result.rows;
    }catch (error){
        console.error('Erro ao executar consulta:', error);
    }finally{
        await client.end();
        console.log('Conexão com o banco de dados finalizada');
    }
}

//Função que recebe comandos das operações
async function insert(comando){
    var comando_interno = comando;
    await executa_comandos(comando_interno);
}

module.exports = insert;