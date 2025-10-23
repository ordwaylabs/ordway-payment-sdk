export interface OrdwayPaymentGatewayConfig {
  tenant_id: string;
  tenant_config: PaymentGatewayConfig;
}

export interface PaymentGatewayConfig {
  id: string;
  type: string;
  defaultMerchantId: string;
  defaultTerminalId: string;
  defaultTerminalGatewayId: string;
}
