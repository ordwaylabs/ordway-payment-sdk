import { Injectable } from '@nestjs/common';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { HtmlFields } from '../utils/html-field.interface';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { DeletePaymentMethodDto } from './dto/delete-payment-method.dto';
import { GetAddPaymentMethodFormDto } from './dto/get-add-payment-method-form.dto';
import { GetCustomerPaymentMethodDto } from './dto/get-customer-payment-method.dto';
import { GetPaymentMethodDto } from './dto/get-payment-method.dto';
import {
  DeletePaymentMethodResponse,
  PaymentMethod,
  PaymentMethodsServiceInterface,
} from './payment-methods.interface';

@Injectable()
export class PaymentMethodsService implements PaymentMethodsServiceInterface {
  async getCustomerPaymentMethods(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCustomerPaymentMethodDto,
  ): Promise<PaymentMethod[]> {
    throw new NonSupportedByPaymentGateway();
  }

  async getPaymentMethodDetails(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetPaymentMethodDto,
  ): Promise<PaymentMethod> {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAddCCMethodForm(params: GetAddPaymentMethodFormDto): HtmlFields {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAddACHMethodForm(params: GetAddPaymentMethodFormDto): HtmlFields {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addPaymentMethod(params: AddPaymentMethodDto): Promise<PaymentMethod> {
    throw new NonSupportedByPaymentGateway();
  }

  async updatePaymentMethod(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: AddPaymentMethodDto,
  ): Promise<PaymentMethod> {
    throw new NonSupportedByPaymentGateway();
  }

  async deletePaymentMethod(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: DeletePaymentMethodDto,
  ): Promise<DeletePaymentMethodResponse> {
    throw new NonSupportedByPaymentGateway();
  }
}
