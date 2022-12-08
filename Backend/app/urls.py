from django.urls import path, re_path
from .views import *
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('', homeview.as_view(), name="index"),
    re_path(r'orders/?$', OrdersView.as_view(), name="orders"),
    re_path(r'edit/?$', EditAccountView.as_view(), name="edit"),
    re_path(r'support/?$',SupportView.as_view(), name="support"),
    re_path(r'register/?$',RegisterView.as_view(), name="register"),
    re_path(r'login/?$',LoginView.as_view(), name="login"),
    re_path(r'logout/?$', LogoutView.as_view(), name="logout"),
]
