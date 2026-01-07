from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WalletViewSet, CardViewSet, TransactionViewSet, SavingsViewSet, QRCodeView, MockDataView

router = DefaultRouter()
router.register(r'wallet', WalletViewSet, basename='wallet')
router.register(r'cards', CardViewSet, basename='cards')
router.register(r'transactions', TransactionViewSet, basename='transactions')
router.register(r'savings', SavingsViewSet, basename='savings')

urlpatterns = [
    path('', include(router.urls)),
    path('qr-pay/', QRCodeView.as_view(), name='qr-pay'),
    path('mock-data/', MockDataView.as_view(), name='mock-data'),
]
