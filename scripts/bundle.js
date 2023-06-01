(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { Client } = pg;

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
},{}]},{},[1]);
