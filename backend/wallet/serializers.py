from rest_framework import serializers
from .models import Wallet, Card, Transaction, Savings
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class WalletSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Wallet
        fields = ['id', 'user', 'balance', 'currency']

class CardSerializer(serializers.ModelSerializer):
    wallet = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Card
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class SavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savings
        fields = '__all__'
