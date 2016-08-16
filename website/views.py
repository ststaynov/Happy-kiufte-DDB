from django.shortcuts import render

# Create your views here.

from django.shortcuts import render_to_response


def index(request):
    return render_to_response('website/index.html', {})


def responsibility(request):
    return render_to_response('website/responsibility.html', {})
