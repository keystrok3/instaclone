from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q # for complex lookups
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for JWT token creation that allows login with
    either username or email.
    """
    # Override the parent's username field to make it not required
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove the username field requirement from the parent class
        self.fields['username'].required = False
        self.fields['username'].allow_blank = True

    def validate(self, attrs):
        # Get the email and username fields from attrs
        email = attrs.get('email', '').strip() if attrs.get('email') else ''
        username = attrs.get('username', '').strip() if attrs.get('username') else ''
        password = attrs.get('password')

        # Ensure at least one identifier is provided
        if not email and not username:
            raise serializers.ValidationError(
                _('Must include username or email'),
                code='authorization'
            )
        
        # Build the credentials dictionary for 'authenticate'
        credentials = {
            'password': password
        }
        
        user_to_authenticate = None
        
        if email:
            try:
                user_model = get_user_model()
                user_to_authenticate = user_model.objects.get(email__iexact=email)
                credentials['username'] = user_to_authenticate.get_username()
            except user_model.DoesNotExist:
                # User with this email doesn't exist
                raise serializers.ValidationError(
                    _('No active account found with the given credentials'),
                    code='authorization'
                )
        else:
            credentials['username'] = username
        
        # Authenticate the user
        self.user = authenticate(**credentials)

        if not self.user or not self.user.is_active:
            raise serializers.ValidationError(
                _('No active account found with the given credentials'),
                code='authorization'
            )

        # Set the username in attrs for the parent class to use
        attrs['username'] = self.user.get_username()
        
        # Call the parent's validate method with the modified attrs
        # Remove email from attrs since parent class doesn't expect it
        validated_attrs = {
            'username': attrs['username'],
            'password': attrs['password']
        }
        
        return super().validate(validated_attrs)