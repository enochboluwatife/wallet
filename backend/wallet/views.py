from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Wallet, Card, Transaction, Savings
from .serializers import WalletSerializer, CardSerializer, TransactionSerializer, SavingsSerializer
from django.contrib.auth.models import User
from django.db.models import Sum
from django.db.models.functions import TruncMonth

class WalletViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = WalletSerializer

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        wallet = request.user.wallet
        # Simple aggregation for the last 6 months (mock logic for prototype if not enough data, but let's try real)
        # For prototype simplicity, we will return static data if no transactions, 
        # or aggregate real transactions if they exist.
        
        income = Transaction.objects.filter(wallet=wallet, transaction_type='CREDIT').aggregate(Sum('amount'))['amount__sum'] or 0
        expenses = Transaction.objects.filter(wallet=wallet, transaction_type='DEBIT').aggregate(Sum('amount'))['amount__sum'] or 0
        
        return Response({
            'total_income': income,
            'total_expenses': expenses,
            'chart_data': {
                'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                'income': [6000, 7000, 5000, 9000, 7000, 8000], # Mocked history for nice charts
                'expenses': [4000, 3000, 6000, 4500, 3000, 5000] 
            }
        })

class CardViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        # Return cards for current user's wallet
        if hasattr(self.request.user, 'wallet'):
            return Card.objects.filter(wallet=self.request.user.wallet)
        return Card.objects.none()

    def perform_create(self, serializer):
        serializer.save(wallet=self.request.user.wallet)

class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        if hasattr(self.request.user, 'wallet'):
            return Transaction.objects.filter(wallet=self.request.user.wallet).order_by('-timestamp')
        return Transaction.objects.none()

class SavingsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SavingsSerializer

    def get_queryset(self):
        if hasattr(self.request.user, 'wallet'):
            return Savings.objects.filter(wallet=self.request.user.wallet)
        return Savings.objects.none()

    def perform_create(self, serializer):
        serializer.save(wallet=self.request.user.wallet)

class QRCodeView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Simulate scanning a QR code and making a payment
        # Expected payload: { "uid": "8194638720", "amount": 50.00 }
        uid = request.data.get('uid')
        amount = request.data.get('amount')
        
        # In a real app, verify UID and process payment
        # For prototype, we just create a transaction record
        wallet = request.user.wallet
        Transaction.objects.create(
            wallet=wallet,
            amount=amount,
            transaction_type='DEBIT',
            description=f"Transfer to UID {uid}",
            category='Transfer',
            sender=request.user.username,
            receiver=f"UID: {uid}"
        )
        
        # Verify balance (simple check)
        if wallet.balance >= float(amount):
             wallet.balance = float(wallet.balance) - float(amount)
             wallet.save()
             return Response({'status': 'success', 'message': f'Sent ${amount} to {uid}'})
        else:
             return Response({'status': 'error', 'message': 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)

class MockDataView(views.APIView):
    permission_classes = [AllowAny] # Open for prototype ease

    def post(self, request):
        # Create a default user and wallet if not exists
        user, created = User.objects.get_or_create(username='deji', email='deji@teggare.com')
        if created:
            user.set_password('password')
            user.save()
            wallet = Wallet.objects.create(user=user, balance=8899750.00, currency='USD')
             # Create Cards
            Card.objects.create(wallet=wallet, bank_name='Zenith Bank', card_number='1234567812345678', card_holder='John Doe', expiry_date='12/25', cvv='123', card_type='VISA')
            Card.objects.create(wallet=wallet, bank_name='GTBank', card_number='8765432187654321', card_holder='John Doe', expiry_date='11/24', cvv='456', card_type='MASTERCARD')
            # Create Transactions
            Transaction.objects.create(wallet=wallet, amount=10.99, transaction_type='DEBIT', description='Netflix Subscription', category='Subscription', sender='Self', receiver='Netflix')
            Transaction.objects.create(wallet=wallet, amount=10.99, transaction_type='DEBIT', description='Amazon Subscription', category='Subscription', sender='Self', receiver='Amazon')
            Transaction.objects.create(wallet=wallet, amount=10.99, transaction_type='DEBIT', description='Canva Subscription', category='Subscription', sender='Self', receiver='Canva')
            # Savings
            Savings.objects.create(wallet=wallet, goal_name='New car', target_amount=25000, current_amount=5000, icon='car')
            Savings.objects.create(wallet=wallet, goal_name='New House', target_amount=500000, current_amount=20000, icon='home')

        return Response({'status': 'seeded', 'username': 'deji', 'password': 'password'})
