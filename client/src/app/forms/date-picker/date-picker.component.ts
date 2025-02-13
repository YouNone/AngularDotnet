import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [BsDatepickerModule, NgIf, ReactiveFormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements ControlValueAccessor{
    writeValue(obj: any): void {}
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}

    label = input<string>('');
    maxDate = input<Date>();
    bsConfig?: Partial<BsDatepickerConfig>;

    constructor(@Self() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
        this.bsConfig = {
            containerClass: 'theme-dark-blue',
            dateInputFormat: 'DD MMMM YYYY',            
        }
    }

     get control(): FormControl {
            return this.ngControl.control as FormControl;
        }
}
