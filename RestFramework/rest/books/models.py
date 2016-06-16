from django.db import models


class Book(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200, blank=True, default='')
    author = models.CharField(max_length=100)
    intro = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=5)
    url = models.URLField()
    owner = models.ForeignKey('auth.User', related_name='books')

    class Meta:
        ordering = ('created',)
