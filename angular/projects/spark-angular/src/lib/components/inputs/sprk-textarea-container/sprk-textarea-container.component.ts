import { Component, ContentChild, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { SprkFieldErrorDirective } from '../../../directives/inputs/sprk-field-error/sprk-field-error.directive';
import { SprkInputDirective } from '../../../directives/inputs/sprk-input/sprk-input.directive';
import { SprkLabelDirective } from '../../../directives/inputs/sprk-label/sprk-label.directive';

@Component({
  selector: 'sprk-textarea-container',
  template: `
    <div [ngClass]="getClasses()">
      <ng-content select="[sprkLabel]"></ng-content>
      <ng-content select="[sprkInput]"></ng-content>
      <ng-content select="sprk-selection-item-container"></ng-content>
      <ng-content select="[sprkHelperText]"></ng-content>
      <ng-content select="[sprkFieldError]"></ng-content>
    </div>
  `
})
export class SprkTextareaContainerComponent implements OnInit {
  /**
   * Expects a space separated string
   * of classes to be added to the
   * component.
   */
  @Input()
  additionalClasses: string;
  /**
   * Expects a space separated string
   * of classes to be added to the
   * icon container.
   */
  @Input()
  iconContainerClasses: string;
  /**
   * This component expects a child label element
   * with the `sprkLabel` directive.
   */
  @ContentChild(SprkLabelDirective, { static: true })
  label: SprkLabelDirective;
  /**
   * This component expects a child input element
   * with the `sprkInput` directive.
   */
  @ContentChild(SprkInputDirective, { static: true })
  input: SprkInputDirective;
  /**
   * This component expects a child element
   * with the `sprkFieldError` directive.
   */
  @ContentChild(SprkFieldErrorDirective, { static: true })
  error: SprkFieldErrorDirective;

  /**
   * @ignore
   */
  id = _.uniqueId();
  /**
   * @ignore
   */
  input_id = `input_${this.id}`;
  /**
   * @ignore
   */
  error_id = `error_${this.id}`;

  /**
   * @ignore
   */
  getClasses(): string {
    const classArray: string[] = [
      'sprk-b-InputContainer',
      'sprk-b-InputContainer--textarea'
    ];

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }

  ngOnInit(): void {
    if (this.label && this.input) {
      this.label.ref.nativeElement.setAttribute('for', this.input_id);
      this.input.ref.nativeElement.id = this.input_id;
    }
    if (this.input && this.error) {
      this.input.ref.nativeElement.setAttribute(
        'aria-describedby',
        this.error_id
      );
      this.error.ref.nativeElement.id = this.error_id;
    }
  }
}
