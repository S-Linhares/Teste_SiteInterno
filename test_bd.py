import psycopg2
import requests
import json
import pandas as pd
import csv

def conecta_db():
    conexao = psycopg2.connect(host= 'localhost',
                           database= 'banco_teste',
                           user= 'postgres',
                           password= 'samuca2080#')
    return conexao

#cria uma tabela no banco de dados
def cria_tabela(sql):
    con = conecta_db()
    cursor = con.cursor()
    cursor.execute(sql)
    con.commit()
    con.close()

#Insere dados em uma tabela. Em caso de erro, retorna o motivo de erro. Em caso de dar certo, retorna "sucesso"
def insere(sql):
    con = conecta_db()
    cur = con.cursor()
    try:
        cur.execute(sql)
        con.commit()
        print("Inserção feita com sucesso!")
    except(Exception, psycopg2.DatabaseError) as error:
        print(f"ERROR: {error}")
        con.rollback()
        cur.close()
        return 1
    cur.close()

#Realiza uma consulta no banco de dados. Retorna uma lista com os dados da consulta.
def consulta(sql):
    con = conecta_db()
    cur = con.cursor()
    cur.execute(sql)
    recset = cur.fetchall()
    registros = []
    for rec in recset:
        registros.append(rec)
    con.close()
    return registros

sql = input("Insira o comando sql: ")

reg = consulta(sql)

with open("exemplo.csv", "w", newline="") as arquivo_csv:
    writer = csv.writer(arquivo_csv)
    writer.writerow(reg)

print(reg)
