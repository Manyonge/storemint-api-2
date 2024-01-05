import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ConditionsModule } from './conditions/conditions.module';
import { CustomersModule } from './customers/customers.module';
import { EwalletsModule } from './ewallets/ewallets.module';
import { ImagesModule } from './images/images.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { PickupmtaaniAgentsModule } from './pickupmtaani-agents/pickupmtaani-agents.module';
import { PickupmtaaniLocationsModule } from './pickupmtaani-locations/pickupmtaani-locations.module';
import { ProductsModule } from './products/products.module';
import { RetailersModule } from './retailers/retailers.module';
import { SizesModule } from './sizes/sizes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, CategoriesModule, ConditionsModule, CustomersModule, EwalletsModule, ImagesModule, OrdersModule, PaymentsModule, PickupmtaaniAgentsModule, PickupmtaaniLocationsModule, ProductsModule, RetailersModule, SizesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
