
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import logging

from accounts.serializers.login_serializer import CustomTokenObtainPairSerializer

logger = logging.getLogger(__name__)


class LoginView(TokenObtainPairView):
    """
    Customizes the TokenObtainPairView to set JWT tokens as HTTP-only cookies
    """
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Call the parent's post method to get the standard token response
        # This will run the CustomTokenObtainPairSerializer and generate tokens
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            # Extract  the tokens from the response data
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            del response.data['access']
            del response.data['refresh']

            # Set the refresh token as an HTTP-only, secure, and samesite cookie
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=refresh_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                path='/'
            )

            # Set the access token as an HTTP-only, secure, samesite cookie
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=access_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                path='/'
            )

            response.data = {'message': 'Logged in successfully'}

        return response