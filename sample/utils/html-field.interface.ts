/**
 * Field definition to paint on the ordway app.
 */
export interface HtmlField {
  /**
   * Human understandable name to the field.
   */
  display: string;

  id: string;
  /**
   * Name of the field for the setup api in payment gateway.
   */
  name: string;
  /**
   * Type of the ui element to be rendered for the user.
   */
  type: string;
  /**
   * Default value of the field.
   */
  value?: number | string;
  /**
   * Help text for the field name.
   */
  tooltip?: string;
  /**
   * Field is required or optional.
   */
  required?: boolean;
}

export interface HtmlFieldKey {
  [key: string]: any;
}
/**
 * Fields needed for the on boarding.
 */
export interface HtmlFields {
  /**
   * Definition of the fields for setting up the tenant for the payment gateway.
   */
  fields: HtmlFieldKey[];
}
