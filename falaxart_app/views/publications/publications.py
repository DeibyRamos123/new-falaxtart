from falaxart_app.views.imports import *
from falaxart_app.serializer import UsuarioSerializer, PublicationSerializer, CommentSerializer
from falaxart_app.models import Publication

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def upload_publication(request):
    serializador = PublicationSerializer(data=request.data)

    if serializador.is_valid():
        serializador.save(usuario=request.user)
        return Response({"publication":serializador.data}, status=status.HTTP_201_CREATED)
    return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def my_publications(request, id):
    publication = Publication.objects.filter(usuario=id)

    serializador = PublicationSerializer(publication, many=True)

    return Response(serializador.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_publication(request, id):
    publicacion = get_object_or_404(Publication, id=id)

    serializador = PublicationSerializer(instance=publicacion, data=request.data, partial=True)

    if serializador.is_valid():
        serializador.save()
        return Response(serializador.data, status=status.HTTP_200_OK)
    
    return Response({'error':'ocurrio un error al actualizar la publicacion'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtain_publication(request, id):
    publicacion = get_object_or_404(Publication, id=id)

    serializer = PublicationSerializer(instance=publicacion)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def publications(request):
    publications = Publication.objects.all().order_by('-created_at')
    serializer = PublicationSerializer(publications, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)