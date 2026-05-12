from getpass import getpass
import requests
from API import API


class FrontendRequester:
    def __init__(self, base_url="http://127.0.0.1:8000", endpoint_path="/login/"):
        self.base_url = base_url.rstrip("/")
        self.endpoint = f"{self.base_url}{endpoint_path}"

    def enviar_credenciais(self, usuario, senha, acessibilidade):
        """
        Recebe dados vindos do front-end e envia para a API em formato JSON.
        """
        payload = {
            "usuario": usuario,
            "senha": senha,
            "acessibilidade" : acessibilidade,
        }

        try:
            response = requests.post(
                self.endpoint,
                json=payload,
                timeout=10,
            )

            try:
                response_data = response.json()
            except ValueError:
                response_data = {"raw_response": response.text}

            return {
                "ok": response.ok,
                "status_code": response.status_code,
                "data": response_data,
            }

        except requests.exceptions.ConnectionError:
            return {
                "ok": False,
                "status_code": None,
                "data": {
                    "erro": "O servidor nao esta rodando ou a URL esta incorreta."
                },
            }
        except requests.exceptions.Timeout:
            return {
                "ok": False,
                "status_code": None,
                "data": {
                    "erro": "A requisicao demorou mais do que o esperado."
                },
            }

    def criar_conta(self, usuario, senha, email="", acessibilidade=False):
        payload = {
            "usuario": usuario,
            "senha": senha,
            "email": email,
            "acessibilidade": acessibilidade,
        }

        try:
            response = requests.post(
                f"{self.base_url}/cadastro/",
                json=payload,
                timeout=10,
            )

            try:
                response_data = response.json()
            except ValueError:
                response_data = {"raw_response": response.text}

            return {
                "ok": response.ok,
                "status_code": response.status_code,
                "data": response_data,
            }

        except requests.exceptions.ConnectionError:
            return {
                "ok": False,
                "status_code": None,
                "data": {
                    "erro": "O servidor nao esta rodando ou a URL esta incorreta."
                },
            }
        except requests.exceptions.Timeout:
            return {
                "ok": False,
                "status_code": None,
                "data": {
                    "erro": "A requisicao demorou mais do que o esperado."
                },
            }

if __name__ == "__main__":
    requester = FrontendRequester()

    API.log(0, "--- Sistema de Envio de Credenciais ---")
    usuario = input("Usuario: ")
    senha = getpass("Senha: ")
    acessibilidade = True

    resultado = requester.enviar_credenciais(usuario, senha, acessibilidade)

    if resultado["ok"]:
        print("Sucesso na requisicao.")
    else:
        print("Falha na requisicao.")

    print(resultado)
