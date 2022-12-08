from django.shortcuts import render,redirect
from django.views.generic import View
from django.contrib import messages
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.hashers import make_password

# Create your views here.
class  homeview(LoginRequiredMixin,View):
    def render(self, request):
        return render(request, 'index.html')

    def get(self, request):
        return self.render(request)



class OrdersView(LoginRequiredMixin,View):
    def render(self, request):
        return render(request, 'orders.html')

    def get(self, request):
        return self.render(request)



class EditAccountView(LoginRequiredMixin, View):
    def render(self, request):
        return render(request, 'edit.html')

    def get(self, request):
        return self.render(request)



class SupportView(LoginRequiredMixin, View):
    def render(self, request):
        return render(request, 'support.html')

    def get(self, request):
        return self.render(request)


class RegisterView(View):
    def post(self, request):
        agree           = request.POST.get('agreement')
        password1       = request.POST.get('password')
        password2       = request.POST.get('confirm_password')
        email           = request.POST.get('email')
        first_name      = request.POST.get('first_name')
        last_name       = request.POST.get('last_name')
        address         = request.POST.get('address')
        city            = request.POST.get('city')
        state           = request.POST.get('state')

        if password1 and password2 and password1 != password2:
            messages.warning(request, 'Passwords do not match')
            return redirect('register')

        user =   User.objects.create(
                    email          = email,
                    first_name     = first_name,
                    last_name      = last_name,
                    address        = address,
                    city           = city,
                    state          = state,
                    password       = make_password(password2),
                    terms_condition= True
                )

        login(request, user)
        return redirect('index')

    def get(self, request):
        return render(request, 'register.html')



class LoginView(View):
    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.error(request, "Invalid username or password.")
            return redirect('login')
    def get(self, request):
        return render(request, 'login.html')