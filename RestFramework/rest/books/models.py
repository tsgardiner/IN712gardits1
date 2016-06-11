from django.db import models


class Book(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200, blank=True, default='')
    author = models.CharField(max_length=100)
    intro = models.TextField()
    price = models.DecimalField()
    url = models.URLField()

    class Meta:
        ordering = ('created',)
