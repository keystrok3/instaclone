
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from accounts.serializers.signup_serializer import SignUpSerializer
import logging

logger = logging.getLogger(__name__)


class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(
                {'message': 'Sign Up Successful'},
                status=status.HTTP_201_CREATED
            )
        
        except IntegrityError as e:
            logger.error(f'Database integrity error: {str(e)}')
            return Response(
                {'error': 'A user with the provided details already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Exception as e:
            logger.error(f'Unexpected registration error: {str(e)}')
            return Response(
                {'error': 'An error occured during registration. Please try again later'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )