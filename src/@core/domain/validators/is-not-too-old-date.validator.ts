import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotTooOldDate', async: false })
export class IsNotTooOldDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date): boolean {
    const minDate = new Date(1920, 0, 1);
    return date >= minDate;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'A data de nascimento deve ser depois de 1920';
  }
}
