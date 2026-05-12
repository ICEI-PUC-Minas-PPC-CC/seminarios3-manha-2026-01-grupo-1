# TrabalhoSeminarios

Backend Django com endpoints de login e cadastro usando MySQL.

## Rodar o backend

```bash
python -m pip install -r requirements.txt
python manage.py runserver 127.0.0.1:8000
```

## Rodar os testes

```bash
python manage.py test
```

## Endpoints

- `GET /` verifica se a API esta online.
- `POST /cadastro/` cria uma conta.
- `POST /login/` valida usuario/email e senha.

Exemplo de JSON para cadastro:

```json
{
  "usuario": "meuusuario",
  "email": "email@exemplo.com",
  "senha": "123456",
  "acessibilidade": false
}
```
