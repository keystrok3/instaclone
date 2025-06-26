

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q # for complex lookups
from rest_framework import serializers

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    By default, TokenObtainPairSerializer expects 'username' and 'password'
    We will override the username field to accept either the username or the email
    The password field remains the same
    """

    username_field = User.USERNAME_FIELD 

    def validate(self, attrs):
        """
        The 'attrs' dictionary initially contains 'username' and 'password' based on 
        incoming request body.
        We'll try to find the requested user using either username or password
        """
        input_identifier = attrs.get('username')
        password = attrs.get('password')

        if not input_identifier or not password:
            raise serializers.ValidationError('Must include "username or email and "password')
        
        # Try to find the user by username or email
        try:
            # Q objects allow you to build complex OR queries
            user = User.objects.get(Q(username__iexact=input_identifier) | Q(email__iexact=input_identifier))

        except User.DoesNotExist:
            raise serializers.ValidationError('No active account found with given credentials')


        if user and user.check_password(password):
            attrs['user'] = user

        else:
            raise serializers.ValidationError('No active account found with given credentials')

        # The parent TokenObtainPairSerializer's validate method expects 'user' in attrs
        # to generate tokens. We've set it correctly now
        return super().validate(attrs) 