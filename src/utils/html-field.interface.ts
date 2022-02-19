/**
 * Field definition to paint on the ordway app.
 */
export interface HtmlField {
  /**
   * Human understandable name to the field.
   */
  display_name: string;
  /**
   * Name of the field for the setup api in payment gateway.
   */
  api_name: string;
  /**
   * Type of the ui element to be rendered for the user.
   */
  type: 'section' | 'text' | 'checkbox' | 'select' | 'link' | 'number' | 'html';
  /**
   * Default value of the field.
   */
  value: number | string;
  /**
   * Help text for the field name.
   */
  tooltip: string;
  /**
   * Field is required or optional.
   */
  isRequired: boolean;
  /**
   * Is this field needs to be rendered or hidden.
   */
  isHidden: boolean;
  /**
   * Validation rule set to be validated for user input.
   */
  validation: {
    min: number;
    max: number;
    regex: string;
    values: string[] | number[];
  };
}

/**
 * Fields needed for the on boarding.
 */
export interface HtmlFields {
  /**
   * Definition of the fields for setting up the tenant for the payment gateway.
   */
  fields: HtmlField[];
}
