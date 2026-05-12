import json

import mysql.connector
from django.contrib.auth.hashers import check_password, make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .db import ensure_users_table, get_connection


def healthcheck(_request):
    return JsonResponse({"status": "online"})


def _json_body(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return None


def _bad_request(message, status=400):
    return JsonResponse({"ok": False, "erro": message}, status=status)


def _normalize_text(value):
    if value is None:
        return ""
    return str(value).strip()


@csrf_exempt
def register(request):
    if request.method != "POST":
        return _bad_request("Metodo nao permitido.", status=405)

    data = _json_body(request)
    if data is None:
        return _bad_request("JSON invalido.")

    usuario = _normalize_text(data.get("usuario"))
    email = _normalize_text(data.get("email")) or None
    senha = _normalize_text(data.get("senha"))
    acessibilidade = bool(data.get("acessibilidade", False))

    if len(usuario) < 3:
        return _bad_request("O usuario precisa ter pelo menos 3 caracteres.")
    if len(senha) < 6:
        return _bad_request("A senha precisa ter pelo menos 6 caracteres.")

    ensure_users_table()
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            INSERT INTO site_users (usuario, email, senha_hash, acessibilidade)
            VALUES (%s, %s, %s, %s)
            """,
            (usuario, email, make_password(senha), acessibilidade),
        )
        connection.commit()
        user_id = cursor.lastrowid
    except mysql.connector.IntegrityError:
        return _bad_request("Usuario ou email ja cadastrado.", status=409)
    finally:
        cursor.close()
        connection.close()

    return JsonResponse(
        {
            "ok": True,
            "mensagem": "Conta criada com sucesso.",
            "usuario": {"id": user_id, "usuario": usuario, "email": email},
        },
        status=201,
    )


@csrf_exempt
def login(request):
    if request.method != "POST":
        return _bad_request("Metodo nao permitido.", status=405)

    data = _json_body(request)
    if data is None:
        return _bad_request("JSON invalido.")

    usuario = _normalize_text(data.get("usuario"))
    senha = _normalize_text(data.get("senha"))

    if not usuario or not senha:
        return _bad_request("Informe usuario e senha.")

    ensure_users_table()
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT id, usuario, email, senha_hash, acessibilidade
            FROM site_users
            WHERE usuario = %s OR email = %s
            LIMIT 1
            """,
            (usuario, usuario),
        )
        user = cursor.fetchone()
    finally:
        cursor.close()
        connection.close()

    if not user or not check_password(senha, user["senha_hash"]):
        return _bad_request("Usuario ou senha invalidos.", status=401)

    return JsonResponse(
        {
            "ok": True,
            "mensagem": "Login realizado com sucesso.",
            "usuario": {
                "id": user["id"],
                "usuario": user["usuario"],
                "email": user["email"],
                "acessibilidade": bool(user["acessibilidade"]),
            },
        }
    )
