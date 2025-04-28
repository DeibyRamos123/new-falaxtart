from rest_framework import serializers
from .models import Usuario, Publication
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id',
                  'username', 
                  'password', 
                  'email', 
                  'first_name',
                  'last_name',
                  'date_birth',
                  'avatar',
                  'cover',
                  'biography'
                  )
    

class PublicationSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Publication
        fields = ('id', 
                  'usuario',
                  'title',
                  'content',
                  'description',
                  'for_sale'
                  )
        read_only_fields = ('usuario',)
