import mysql.connector
import yaml
from django.conf import settings


CONFIG_PATH = settings.BASE_DIR / "config.yml"


with open(CONFIG_PATH, "r", encoding="utf-8") as file:
    mysql_info = yaml.safe_load(file)["Mysql"]


def get_connection():
    return mysql.connector.connect(
        host=mysql_info["host"],
        port=mysql_info["port"],
        user=mysql_info["user"],
        password=mysql_info["password"],
        database=mysql_info["database"],
        use_pure=False,
    )


def ensure_users_table():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS site_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario VARCHAR(80) NOT NULL UNIQUE,
            email VARCHAR(160) NULL UNIQUE,
            senha_hash VARCHAR(255) NOT NULL,
            acessibilidade BOOLEAN NOT NULL DEFAULT FALSE,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    connection.commit()
    cursor.close()
    connection.close()
