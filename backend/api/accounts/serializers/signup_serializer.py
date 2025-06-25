

from rest_framework import serializers
from accounts.models import User



class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [ 'email', 'username', 'first_name', 'last_name', 'password' ]
        extra_kwargs = { 'email': {'required': True}}
    
    def create(self, validated_data):
        """
        Create and return a new 'User' instance, given the validate data
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user
    