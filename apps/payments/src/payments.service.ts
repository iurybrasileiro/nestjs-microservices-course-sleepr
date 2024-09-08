import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private notificationsService: NotificationsServiceClient;

  constructor(
    private readonly consigService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationsService =
      this.client.getService<NotificationsServiceClient>(
        NOTIFICATIONS_SERVICE_NAME,
      );
  }

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

    this.notificationsService
      .notifyEmail({
        email,
        text: `Your payment of R$ ${amount} has completed successfully`,
      })
      .subscribe(() => {});

    return paymentIntent;
  }
}
