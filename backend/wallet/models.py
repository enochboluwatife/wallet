from django.db import models
from django.contrib.auth.models import User

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=3, default='USD')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Wallet ({self.currency})"

class Card(models.Model):
    CARD_TYPES = [('VISA', 'Visa'), ('MASTERCARD', 'Mastercard')]
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='cards')
    bank_name = models.CharField(max_length=50)
    card_number = models.CharField(max_length=16) # In production, store hash or last 4
    card_holder = models.CharField(max_length=100)
    expiry_date = models.CharField(max_length=5) # MM/YY
    cvv = models.CharField(max_length=3)
    card_type = models.CharField(max_length=10, choices=CARD_TYPES, default='MASTERCARD')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.bank_name} - {self.card_number[-4:]}"

class Transaction(models.Model):
    TRANSACTION_TYPES = [('CREDIT', 'Credit'), ('DEBIT', 'Debit')]
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=50, default='General') # e.g., 'Subscription', 'Transfer'
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.CharField(max_length=100, blank=True, null=True)
    receiver = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount}"

class Savings(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='savings')
    goal_name = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    icon = models.CharField(max_length=50, blank=True) # e.g., 'car', 'home'

    def __str__(self):
        return self.goal_name
