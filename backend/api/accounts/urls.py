
from django.urls import path
from accounts.views.signup_view import SignUpView
from accounts.views.login_view import LoginView
from accounts.views.logout_view import LogoutView
from rest_framework.authtoken.views import obtain_auth_token
    




urlpatterns = [
    path('signup/', SignUpView.as_view(), name='user-signup'),
    path('token/', obtain_auth_token),
    path('login/', LoginView.as_view(), name='login-view'),
    path('logout/',LogoutView.as_view(), name='logout-view')
]