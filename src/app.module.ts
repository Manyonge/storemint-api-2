import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { RetailersModule } from "./retailers/retailers.module";
import { EwalletsModule } from "./ewallets/ewallets.module";
import { ImagesModule } from "./images/images.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { CategoriesModule } from "./categories/categories.module";
import { SizesModule } from "./sizes/sizes.module";
import { ConditionsModule } from "./conditions/conditions.module";
import { CustomersModule } from "./customers/customers.module";
import { PickupmtaaniLocationsModule } from "./pickupmtaani-locations/pickupmtaani-locations.module";
import { PickupmtaaniAgentsModule } from "./pickupmtaani-agents/pickupmtaani-agents.module";
import { PrismaModule } from "nestjs-prisma";
import { APP_PIPE } from "@nestjs/core";
import { CheckRetailerPipe } from "./pipes/check-retailer.pipe";
import { OrdersModule } from "./orders/orders.module";
import { PaymentsModule } from "./payments/payments.module";
import { LoggingMiddleware } from "./middleware/logging.middleware";

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    RetailersModule,
    EwalletsModule,
    ImagesModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    SizesModule,
    ConditionsModule,
    CustomersModule,
    PickupmtaaniLocationsModule,
    PickupmtaaniAgentsModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CheckRetailerPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
