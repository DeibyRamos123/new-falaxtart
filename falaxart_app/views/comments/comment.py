from falaxart_app.views.imports import *
from falaxart_app.serializer import CommentSerializer
from falaxart_app.models import Comment

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def comments(requets):
    comments = Comment.objects.all().order_by('-created_at')
    serializer = CommentSerializer(comments, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtain_comment(request, id):
    comment = get_object_or_404(Comment, id=id)

    serializer = CommentSerializer(instance=comment)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_comment(request):
    serializer = CommentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(usuario=request.user)
        return Response({'Comment':serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
