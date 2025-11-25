from falaxart_app.views.imports import *
from falaxart_app.models import Follow
from falaxart_app.serializer import FollowSerializer

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def follow_profile_user(request):

    serializer = FollowSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'Follow Succesfull'}, status=status.HTTP_200_OK)
    return Response({'message':'Error al seguir el usuario', 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_followers(request, id):

    followers = Follow.objects.filter(following=id)

    followers_count = Follow.objects.filter(following=id).count()

    serializer = FollowSerializer(followers, many=True)

    return Response({'followers_info': serializer.data, 'followers_count': followers_count},status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def check_follow_status(request, follower_id, following_id):
    try:
        # Intenta encontrar el registro de seguimiento
        exists = Follow.objects.filter(
            follower=follower_id,
            following=following_id
        ).exists() # 👈 Función eficiente de Django
        
        return Response({'is_following': exists}, status=status.HTTP_200_OK)
    
    except Exception:
        return Response({'is_following': False}, status=status.HTTP_200_OK)

@api_view(['DELETE']) # metodo de eliminacion
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_follower(request, follower_id, following_id):
    # La vista DELETE no necesita un Serializer para validar/guardar,
    # sino para obtener los IDs para la eliminación.

    follower_id = follower_id
    following_id = following_id

    if not follower_id or not following_id:
        return Response(
            {'message': 'Debe proporcionar los IDs de "follower" y "following".'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Busca el objeto Follow específico que corresponde a la relación.
        # Asumiendo que los campos en tu modelo Follow son 'follower' y 'following'.
        # Busca que coincidad exactamente los dos id tanto como del usuario que se sigue hasta de sus seguidores
        follow_instance = Follow.objects.get(
            follower=follower_id,
            following=following_id
        )
        
        # Elimina la instancia de la base de datos.
        follow_instance.delete()
        
        return Response(
            {'message': 'Se ha dejado de seguir al usuario correctamente.'},
            status=status.HTTP_204_NO_CONTENT # 204 No Content es estándar para DELETE exitoso sin cuerpo de respuesta
        )
        
    except Follow.DoesNotExist:
        # Si la relación de seguimiento no existe.
        return Response(
            {'message': 'La relación de seguimiento no existe.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        # Cualquier otro error
        return Response(
            {'message': f'Error al intentar dejar de seguir al usuario: {e}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )