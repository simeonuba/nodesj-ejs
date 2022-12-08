from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User

from app.models import User

class CustomerBackend(ModelBackend):

    def authenticate(self, request, **kwargs):
        email = kwargs['email']
        password = kwargs['password']
        try:
            customer =User.objects.get(email=email)
            if customer.user.check_password(password) is True:
                return customer.user
        except User.DoesNotExist:
            pass