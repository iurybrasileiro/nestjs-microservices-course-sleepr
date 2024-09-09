import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly consigService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(
    this.consigService.get('STRIPE_SECRET_KEY'),
    null,
  );

  async createCharge({ amount, email }: PaymentCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      currency: 'BRL',
      payment_method_types: ['card'],
    });

    this.notificationService.emit('notify_email', {
      email,
      text: `Your payment of R$ ${amount} has completed successfully`,
    });

    return paymentIntent;
  }

  async getPayments() {
    const payments = await this.stripe.paymentIntents.list();
    return payments.data;
  }
}
