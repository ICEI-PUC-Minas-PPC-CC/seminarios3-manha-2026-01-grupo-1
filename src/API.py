import time
import yaml
import stringcolor
from datetime import datetime
import requests
import string
from random import choice
import mysql.connector



with open('config.yml','r', encoding='utf-8') as file:
     config = yaml.safe_load(file)
     mysql_info = config['Mysql']

try:
     # Conectando ao banco de dados
     conexao = mysql.connector.connect(
          host=mysql_info['host'],         # Endereço do servidor MySQL
          port=mysql_info['port'],
          user=mysql_info['user'],       # Seu usuário MySQL
          password=mysql_info['password'],     # Sua senha MySQL
          database=mysql_info['database'],      # Nome do banco de dados
          use_pure=False
          )
     c = datetime.now()
     time = c.strftime('%H:%M:%S')
     print(stringcolor.cs(f'[{time} INFO] Conexão estabelecida com sucesso com o Mysql {mysql_info["database"]}', '#FFFFFF'))
except:
     c = datetime.now()
     time = c.strftime('%H:%M:%S')
     print(stringcolor.cs(f'[{time} ERROR] Falha ao conectar no Mysql', '#FF5370'))

class API():

     def check_connection():
          global conexao
          try:
               conexao.ping(reconnect=True, attempts=3, delay=2)
          except mysql.connector.Error:
               API.log(1, "Tentando se reconectar ao MySQL.")
               conexao = mysql.connector.connect(
                    host=mysql_info['host'],         # Endereço do servidor MySQL
                    port=mysql_info['port'],
                    user=mysql_info['user'],       # Seu usuário MySQL
                    password=mysql_info['password'],     # Sua senha MySQL
                    database=mysql_info['database'],      # Nome do banco de dados
                    use_pure=False
               )
               API.log(0, "Reconexão com o MySQL realizada com sucesso.")
     

     # Função para ler um arquivo YAML 
     def ler_file(path):
          with open(path,'r', encoding='utf-8') as file:
               return yaml.safe_load(file)
          
     # Função para modificar um arquivo YAML    
     def mod_file(path, config):
          with open(path,'w', encoding='utf-8') as file:
               yaml.dump(config, file)
          
     # Função para adicionar Safiras para um jogador
     def add_cash(nick, valor):
          API.check_connection()
          cursor = conexao.cursor()
          consulta = "SELECT `uuid` FROM `playerpoints_username_cache` WHERE `username` = %s;"
          cursor.execute(consulta, (nick,))
          resultado = cursor.fetchone()
          uuid = resultado[0]

          cursor.fetchall()
          update = "UPDATE `playerpoints_points` SET `points` = `points` + %s WHERE `uuid` = %s;"
          cursor.execute(update, (valor, uuid))
          conexao.commit()
          API.log(0, f"Adicionado {valor} de Safiras para {nick}")
               
     # Função para logar textos no console
     def log(type, text):
          c = datetime.now()
          time = c.strftime('%H:%M:%S')

          # INFO 
          if type == 0:
               print(stringcolor.cs(f'[{time} INFO] {text}', '#FFFFFF'))

          # WARN
          elif type == 1:
               print(stringcolor.cs(f'[{time} WARN] {text}', '#F3C167'))

          # ERROR
          elif type == 2:
               print(stringcolor.cs(f'[{time} ERROR] {text}', '#FF5370'))

          # NONE
          else:
               print(stringcolor.cs(f'[{time} ERROR] Tipo de log não definido, o log tipo ({type}) não existe!', '#FF5370'))


