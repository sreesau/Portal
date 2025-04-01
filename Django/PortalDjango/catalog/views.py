from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from .models import UploadedFile
from .serializers import FileSerializer, UserSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.shortcuts import get_object_or_404
from django.conf import settings
import os
from .models import UploadedFile
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
import os
from django.conf import settings
from .models import UploadedFile


User = get_user_model()
class FileListCreateView(generics.ListCreateAPIView):
    queryset = UploadedFile.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = FileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  


class FileDetailView(generics.RetrieveDestroyAPIView):
    queryset = UploadedFile.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FileSerializer

class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_files = UploadedFile.objects.count()
        file_types = UploadedFile.objects.values_list('file', flat=True)

        breakdown = {'pdf': 0, 'excel': 0, 'txt': 0, 'doc': 0, 'docx': 0, 'xlsx': 0}

        for file in file_types:
            ext = file.split('.')[-1].lower()
            if ext in breakdown:
                breakdown[ext] += 1

        return Response({'total_files': total_files, 'file_breakdown': breakdown})

def download_file(request, file_id):
    file_instance = get_object_or_404(UploadedFile, id=file_id)
    file_path = os.path.join(settings.MEDIA_ROOT, str(file_instance.file))

    if os.path.exists(file_path):
        response = FileResponse(open(file_path, 'rb'), as_attachment=True)
        return response
    else:
        raise Http404("File not found")


class SignUpView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(email=email).exists():
            return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=email, email=email, password=password)
        token, created = Token.objects.get_or_create(user=user)

        return Response({"message": "User created successfully", "token": token.key}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)  # Find user by email
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=user.username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
