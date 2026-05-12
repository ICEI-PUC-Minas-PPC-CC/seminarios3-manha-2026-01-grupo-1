from django.urls import path

from accounts.views import healthcheck, login, register


urlpatterns = [
    path("", healthcheck),
    path("login/", login),
    path("cadastro/", register),
    path("register/", register),
]
