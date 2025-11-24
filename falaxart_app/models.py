from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Role (models.Model):
    name = models.CharField(max_length=10, null=False)
    code = models.CharField(max_length=3, null=False)

class Usuario(AbstractUser):
    
    PLATFORM_US = [
        ('playstation', 'Playstation'),
        ('xbox', 'Xbox'),
        ('pc', 'PC'),
        ('nintendo', 'Nintendo'),
        ('mobile', 'Mobile')
    ];

    date_birth = models.DateField(null=False)
    biography = models.TextField(default='Hi falaxart!')
    avatar = models.ImageField(upload_to='profile_images/', default='profile_images/default.jpg')
    cover = models.ImageField(upload_to='cover_images/', default='cover_images/default_cover.jpg')
    platform_user = models.CharField(max_length=20, choices=PLATFORM_US, default='pc')
    color_theme = models.CharField(max_length=20, default='#5D3FD3')
    background = models.CharField(max_length=20, default='#121212')
    background_divs = models.CharField(max_length=20, default='#1B1C1D')
    gradient_theme = models.CharField(max_length=20, default='#1B1C1D')
    premium = models.BooleanField(default=False)
    banned = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Publication(models.Model):
    PLATFORM_PUB = [
        ('playstation', 'Playstation'),
        ('xbox', 'Xbox'),
        ('pc', 'PC'),
        ('nintendo', 'Nintendo'),
        ('mobile', 'Mobile')
    ];

    TAG_CHOICE = [
        ('help', 'Help'),
        ('bug', 'Bug'),
        ('funny', 'funny'),
        ('lpt', 'LPT'),
        ('other', 'Other')
    ]


    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    platform_publication = models.CharField(max_length=20, choices=PLATFORM_PUB, default='pc')
    tag2 = models.CharField(max_length=20, choices=TAG_CHOICE, default='other')
    title = models.CharField(max_length=25, null=False)
    content = models.ImageField(upload_to='publications/',null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_premium = models.BooleanField(default=False)
    description = models.TextField(null=True)
    total_likes = models.IntegerField(null=True)
    for_sale = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Like(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE)
    contenido = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class Follow(models.Model):
    follower = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='user_follow')
    following = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='user_profile')