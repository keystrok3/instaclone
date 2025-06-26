
from django.urls import path
from accounts.views.signup_view import SignUpView
from accounts.views.login_view import LoginView
from accounts.views.logout_view import LogoutView
    




urlpatterns = [
    path('signup/', SignUpView.as_view(), name='user-signup'),
    path('login/', LoginView.as_view(), name='login-view'),
    path('logout/',LogoutView.as_view(), name='logout-view')
]