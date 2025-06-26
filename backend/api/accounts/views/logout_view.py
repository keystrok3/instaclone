
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class LogoutView(APIView):
    """
    Clear JWT tokens from HTTP-only cookies on logout.
    Requires the client to send a request (e.g., POST) to trigger this
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        response = Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

        # Expire the access token cookie
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
            path='/'
        )

        # Expire the refresh token cookie
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            path='/'
        )

        # Blacklist the refresh token to immediately invalidate it
        # Requires 'rest_framework_simplejwt.token_blacklist' in INSTALLED_APPS
        if 'rest_framework_simplejwt.token_blacklist' in settings.INSTALLED_APPS:
            try:
                # Get the refresh token from the cookie
                refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
                if refresh_token:
                    token = RefreshToken(refresh_token)
                    token.blacklist()
            except Exception as e:
                logger.error(f"Error blacklisting refresh token on logout: {str(e)}")
        
        return response