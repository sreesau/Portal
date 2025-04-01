from django.urls import path, include
from .views import FileListCreateView, FileDetailView, UserProfileView, DashboardView,SignUpView, LoginView,download_file

urlpatterns = [
    path('api/files/', FileListCreateView.as_view(), name='file-list-create'),
    path('api/files/<int:pk>/', FileDetailView.as_view(), name='file-detail'),
    path('api/user/', UserProfileView.as_view(), name='user-profile'),
    path('api/dashboard/', DashboardView.as_view(), name='dashboard'),
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/files/<int:file_id>/download/', download_file, name='download_file'),

    
]

