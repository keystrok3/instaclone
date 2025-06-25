
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(
            {'detail': "Successfully logged out"},
            status=status.HTTP_200_OK
        )