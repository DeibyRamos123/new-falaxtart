from falaxart_app.views.imports import *
from falaxart_app.models import Like
from falaxart_app.serializer import LikeSerializer

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def like_publication(request):
    serielizer = LikeSerializer(data=request.data)
    if serielizer.is_valid():
        serielizer.save()
        return Response({'message': 'Publication liked succesfully'}, status=status.HTTP_200_OK)
    return Response(serielizer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_likes(request, id):
    likes_number = Like.objects.filter(publication=id).count()

    likes_info = Like.objects.filter(publication=id)

    return Response({'likes': likes_info, 'likes_count': likes_number}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_like(request, publication_id, user_id):

    publication_id = publication_id
    user_id = user_id

    if not publication_id or not user_id:
        return Response(
            {'message': 'Debe proporcionar los IDs de "follower" y "following".'},
            status=status.HTTP_400_BAD_REQUEST
        )
    

    try: 
        like_instance = Like.objects.get(
            usuario=user_id,
            publication=publication_id
        )

        like_instance.delete()

        return Response(
            {'message': 'Se ha quitado el like correctamente.'},
            status=status.HTTP_204_NO_CONTENT # 204 No Content es estándar para DELETE exitoso sin cuerpo de respuesta
        )
    except Like.DoesNotExist:

        return Response(
            {'message': 'La relación de like no existe.'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    except Exception as e:
        # Cualquier otro error
        return Response(
            {'message': f'Error al intentar dejar de seguir al usuario: {e}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        ) 