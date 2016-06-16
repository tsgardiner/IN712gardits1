from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('books.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

# http -a admin:password123 --json POST http://127.0.0.1:8000/books/ title="Probability Theory: The Logic of Science" author="E. T. Jaynes" intro="Going beyond the conventional mathematics of probability theory, this study views the subject in a wider context. It discusses new results, along with applications of probability theory to a variety of problems." price=78.44 url="http://www.amazon.com/Probability-Theory-E-T-Jaynes/dp/0521592712/ref=sr_1_1"
# http -a admin:password123 --json POST http://127.0.0.1:8000/books/ title="Regenesis How Synthetic Biology will Reinvent Nature and Ourselves" author="George Church" intro="In Regenesis, Harvard biologist George Church and science writer Ed Regis explore the possibilities and perils of the emerging field of synthetic biology" price=17.20 url="http://www.amazon.com/Regenesis-Synthetic-Biology-Reinvent-Ourselves/dp/0465075703/ref=sr_1_1"
# http -a admin:password123 --json POST http://127.0.0.1:8000/books/ title="Economic Facts and Fallacies" author="Thomas Sowell" intro="In Economic Facts and Fallacies, Thomas Sowell exposes some of the most popular fallacies about economic issues in a lively manner that does not require any prior knowledge of economics." price=10.67 url="http://www.amazon.com/Economic-Facts-Fallacies-Thomas-Sowell/dp/0465022030/ref=pd_sim_14_3"