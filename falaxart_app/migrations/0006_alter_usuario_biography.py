# Generated by Django 5.1.3 on 2025-03-25 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('falaxart_app', '0005_alter_usuario_avatar_alter_usuario_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='biography',
            field=models.TextField(default='Hi falaxart!'),
        ),
    ]
