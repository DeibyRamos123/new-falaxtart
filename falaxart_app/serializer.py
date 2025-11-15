from rest_framework import serializers
from .models import Usuario, Publication, Comment
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
                  'biography',
                  'premium',
                  'color_theme',
                  'background',
                  'background_divs',
                  'gradient_theme',
                  'platform_user'
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
                  'for_sale',
                  'platform_publication',
                  'tag2'
                  )
        read_only_fields = ('usuario',)


class CommentSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 
                'usuario',
                'publication',
                'contenido',
                'created_at')
        read_only_fields = ('usuario',)
