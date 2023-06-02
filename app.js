const express = require('express');
const app = express();
const port = 3000; // Escolha a porta desejada para o servidor
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

app.post('/insert', async (req, res) => {
    const { dispositivo, patrimonio, remetente, data_entrada, obs } = req.body;

    const comando = `INSERT INTO equip_externo (dispositivo, patrimonio, remetente, data_entrada, obs) VALUES ('${dispositivo}', '${patrimonio}', '${remetente}', '${data_entrada}', '${obs}')`;

    try {
        await executa_comandos(comando);
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).send('Erro ao inserir dados no banco de dados.');
    }
});

// Configuração de rota de exemplo
app.use('/', express.static('/html/index.html'));

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
