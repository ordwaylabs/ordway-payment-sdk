// TODO: needs to be defined for each payment gateway
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaymentGatewayConfig {}

export interface TenantPaymentConfig {
  /**
   * Unique id for the tenant
   */
  tenant_uid: string;
  /**
   * Tenant payment config
   */
  tenant_config: PaymentGatewayConfig;
}
