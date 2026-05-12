import json
from unittest.mock import MagicMock, patch

import mysql.connector
from django.contrib.auth.hashers import make_password
from django.test import Client, SimpleTestCase


def _mock_connection(cursor):
    connection = MagicMock()
    connection.cursor.return_value = cursor
    return connection


class AccountEndpointTests(SimpleTestCase):
    def setUp(self):
        self.client = Client()

    def test_healthcheck_returns_online(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "online"})

    @patch("accounts.views.get_connection")
    @patch("accounts.views.ensure_users_table")
    def test_register_creates_user(self, ensure_users_table, get_connection):
        cursor = MagicMock()
        cursor.lastrowid = 12
        get_connection.return_value = _mock_connection(cursor)

        response = self.client.post(
            "/cadastro/",
            data=json.dumps(
                {
                    "usuario": "joaosilva",
                    "email": "joao@example.com",
                    "senha": "segredo123",
                    "acessibilidade": True,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.json()["usuario"],
            {"id": 12, "usuario": "joaosilva", "email": "joao@example.com"},
        )
        ensure_users_table.assert_called_once()
        get_connection.return_value.commit.assert_called_once()

    @patch("accounts.views.get_connection")
    @patch("accounts.views.ensure_users_table")
    def test_register_rejects_duplicate_user(self, ensure_users_table, get_connection):
        cursor = MagicMock()
        cursor.execute.side_effect = mysql.connector.IntegrityError()
        get_connection.return_value = _mock_connection(cursor)

        response = self.client.post(
            "/cadastro/",
            data=json.dumps(
                {
                    "usuario": "joaosilva",
                    "email": "joao@example.com",
                    "senha": "segredo123",
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 409)
        self.assertFalse(response.json()["ok"])
        ensure_users_table.assert_called_once()

    @patch("accounts.views.get_connection")
    @patch("accounts.views.ensure_users_table")
    def test_login_accepts_valid_credentials(self, ensure_users_table, get_connection):
        cursor = MagicMock()
        cursor.fetchone.return_value = {
            "id": 3,
            "usuario": "maria",
            "email": "maria@example.com",
            "senha_hash": make_password("segredo123"),
            "acessibilidade": 1,
        }
        get_connection.return_value = _mock_connection(cursor)

        response = self.client.post(
            "/login/",
            data=json.dumps({"usuario": "maria", "senha": "segredo123"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["ok"])
        self.assertEqual(response.json()["usuario"]["usuario"], "maria")
        ensure_users_table.assert_called_once()

    @patch("accounts.views.get_connection")
    @patch("accounts.views.ensure_users_table")
    def test_login_rejects_invalid_credentials(self, ensure_users_table, get_connection):
        cursor = MagicMock()
        cursor.fetchone.return_value = {
            "id": 3,
            "usuario": "maria",
            "email": "maria@example.com",
            "senha_hash": make_password("segredo123"),
            "acessibilidade": 0,
        }
        get_connection.return_value = _mock_connection(cursor)

        response = self.client.post(
            "/login/",
            data=json.dumps({"usuario": "maria", "senha": "senhaerrada"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 401)
        self.assertFalse(response.json()["ok"])
        ensure_users_table.assert_called_once()

    def test_invalid_json_returns_bad_request(self):
        response = self.client.post(
            "/login/",
            data="{json quebrado",
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["erro"], "JSON invalido.")
