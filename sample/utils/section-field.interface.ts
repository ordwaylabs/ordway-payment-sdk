/**
 * Field definition to paint on the ordway app.
 */
import { HtmlFieldKey, HtmlFields } from './html-field.interface';

export interface SectionField {
  /**
   * Human understandable name to the field.
   */
  title?: string;
  /**
   * Type of the ui element to be rendered for the user.
   */
  type?: string;
  /**
   * Default value of the field.
   */

  id?: number | string;
  /**
   * Help text for the field name.
   */
  fields?: HtmlFieldKey[];

  sections?: SectionField[];
}
