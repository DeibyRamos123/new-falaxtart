from rest_framework import viewsets
from rest_framework import status
from .serializer import UsuarioSerializer, PublicationSerializer
from .models import Usuario, Publication
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

@api_view(['POST']) # peticiones admitidas
def register(request):

    serializador = UsuarioSerializer(data=request.data) # se obtiene la info (request.data) - informacion obtenida

    if serializador.is_valid(): # si el formulario tiene todos sus campos llenos
        serializador.save() #crea un nuevo registro en la bd con los datos validados toca guardar los dos ya que estan relacionados

        usuario = Usuario.objects.get(username=serializador.data['username']) #obtener el username del usuario
        usuario.set_password(serializador.data['password']) # hashear la contraseña del usuario
        usuario.save() # crea el usuario en la bd

        token = Token.objects.create(user=usuario) #crea el jwt
        return Response({'token':token.key, "user": serializador.data}, status=status.HTTP_201_CREATED) #retorna un mensaje de exito + la info del usuario
    
    return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST) # si los datos no se llenaron devuelve los errores y el codigo de estado 


@api_view(['POST']) 
def login(request):
    usuario = get_object_or_404(Usuario, username=request.data['username'])

    if not usuario.check_password(request.data['password']):
        return Response({'error':'inavlid password'}, status=status.HTTP_400_BAD_REQUEST)

    token, created = Token.objects.get_or_create(user=usuario)
    serializador = UsuarioSerializer(instance=usuario)

    return Response({"token":token.key, "user":serializador.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication]) # define como se autentica el usuario
@permission_classes([IsAuthenticated]) # define que solo los usuarios autenticados puedan acceder a la vista 
def profile(request, id):

    usuario = get_object_or_404(Usuario, id=id)

    serializador = UsuarioSerializer(instance=usuario)

    # return Response("you are login with {}".format(request.user.username), status=status.HTTP_200_OK)

    return Response(serializador.data, status=status.HTTP_200_OK)


#pagina de home
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def home (request):
    serializador = UsuarioSerializer(instance=request.user)

    # return Response("you are login with {}".format(request.user.username), status=status.HTTP_200_OK)

    return Response(serializador.data, status=status.HTTP_200_OK)



@api_view(['PUT'])
@authentication_classes([TokenAuthentication]) #identificamos que para acceder a la vista toca con una validacion JWT
@permission_classes([IsAuthenticated]) # Nos permite ingresar solo si el usuario hizo log in
def update_profile(request): # definimos la función que nos permitira actualizar

    usuario = request.user #preguntamos por el usuario logeado y lo guardamos en la variable "usuario"

    # hacemos uso de un serializador para validar y convertir a JSON (similar a un formulario de django)
    # como con request.data obtenemos la peticion en json que nos manda el cliente se la pasamos al server
    # partial permite la actualizacion no requiera todos los campos
    serializador = UsuarioSerializer(instance=usuario, data=request.data, partial=True) 

    # validamos si los datos de la petición son validos
    if serializador.is_valid():
        serializador.save()   # si son validos guardar en la bd
        """ cuando termine retornar una respuesta en json con el codigo de estado 200.
            devolvemos la informacion de la petición 
        """
        return Response(serializador.data, status=status.HTTP_200_OK) 

    return Response({'error':'ocurrio un error al capturar al usuario o al actualizar datos'}, status=status.HTTP_400_BAD_REQUEST)

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

