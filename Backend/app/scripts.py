import json
from django.core.mail import send_mail, BadHeaderError, EmailMultiAlternatives, EmailMessage
from django.template.loader import get_template, render_to_string
from django.http import HttpResponseRedirect, HttpResponse, response
from django.contrib.auth import get_user_model
import os
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from django.utils.http import urlsafe_base64_encode


User = get_user_model()
from django.utils.encoding import force_bytes, force_text


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) +
            six.text_type(user.is_active)
        )
account_activation_token = TokenGenerator()










def activation_email(user, current_site):
    user = User.objects.get(email = user)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    with open(os.path.join(BASE_DIR, 'backend/template/email/activation_email.html')) as emailSend:
        feedback_message = emailSend.read()
    
    
    c = {
        "email": user.email,
        'domain': current_site ,
        # .decode(),
        'uid':urlsafe_base64_encode(force_bytes(user.pk)),
        'token':account_activation_token.make_token(user),
        "user": user,
    } 

    subject = "Account activation"
    sender = "ofmax@gmail.com"
    recipients = ["user.email", ]
    

    message = EmailMultiAlternatives(
        subject=subject, body=feedback_message, from_email=sender, to=recipients)
    html_template = get_template(
        "email/activation_email.html").render(c)
    message.attach_alternative(html_template, "text/html")
    try:
        message.send()
    except BadHeaderError:
        return HttpResponse('Invalid header found.')








