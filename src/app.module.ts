import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfig, DBConfig } from './config';

import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EnumModule } from './enum/enum.module';
import { FileModule } from './file/file.module';
import { CompanyModule } from './company/company.module';
import { CompanyAttributeModule } from './company-attribute/company-attribute.module';
import { ShareholderModule } from './shareholder/shareholder.module';
import { StaffModule } from './staff/staff.module';
import { CompanyYearsModule } from './company-years/company-years.module';
import { ProxyGrantModule } from './proxy-grant/proxy-grant.module';
import { ShareholderGrantModule } from './shareholder-grant/shareholder-grant.module';
import { VirtualGrantModule } from './virtual-grant/virtual-grant.module';
import { ProtocolModule } from './protocol/protocol.module';
import { FlowDetailsModule } from './flow-details/flow-details.module';
import { MainCompanyModule } from './main-company/main-company.module';
import { PrimitiveGrantModule } from './primitive-grant/primitive-grant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [AppConfig] }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      keepConnectionAlive: true,
      ...DBConfig,
    }),
    AuthModule,
    UserModule,
    ShareholderModule,
    EnumModule,
    FileModule,
    CompanyModule,
    CompanyAttributeModule,
    ShareholderModule,
    StaffModule,
    CompanyYearsModule,
    ProxyGrantModule,
    ShareholderGrantModule,
    VirtualGrantModule,
    ProtocolModule,
    FlowDetailsModule,
    MainCompanyModule,
    PrimitiveGrantModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
