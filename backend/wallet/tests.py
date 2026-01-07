from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Wallet, Transaction, Card

class WalletAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='password')
        self.wallet = Wallet.objects.create(user=self.user, balance=1000.00, currency='USD')
        self.client.force_authenticate(user=self.user)

    def test_get_wallet(self):
        """Test retrieving wallet details"""
        response = self.client.get('/api/wallet/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should return a list with one wallet
        self.assertEqual(len(response.data), 1)
        self.assertEqual(float(response.data[0]['balance']), 1000.00)

    def test_mock_transactions_and_analytics(self):
        """Test creating transactions and verifying analytics aggregation"""
        Transaction.objects.create(wallet=self.wallet, amount=500, transaction_type='CREDIT', description='Salary', category='Income')
        Transaction.objects.create(wallet=self.wallet, amount=200, transaction_type='DEBIT', description='Food', category='Expense')
        
        # Test Transactions Endpoint
        response = self.client.get('/api/transactions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        # Test Analytics Endpoint
        response = self.client.get('/api/wallet/analytics/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_income'], 500)
        self.assertEqual(response.data['total_expenses'], 200)

    def test_create_and_list_cards(self):
        """Test adding a card and retrieving it"""
        card_data = {
            'bank_name': 'Test Bank',
            'card_number': '1234567812345678',
            'card_holder': 'Test User',
            'expiry_date': '12/30',
            'cvv': '123',
            'card_type': 'VISA'
        }
        response = self.client.post('/api/cards/', card_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        response = self.client.get('/api/cards/')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['bank_name'], 'Test Bank')

    def test_qr_payment_flow(self):
        """Test paying via QR code endpoint"""
        payload = {
            'uid': '999999',
            'amount': 100
        }
        response = self.client.post('/api/qr-pay/', payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify balance deduction
        self.wallet.refresh_from_db()
        self.assertEqual(self.wallet.balance, 900.00)
        
        # Verify transaction record
        tx_response = self.client.get('/api/transactions/')
        self.assertEqual(tx_response.data[0]['amount'], '100.00')
