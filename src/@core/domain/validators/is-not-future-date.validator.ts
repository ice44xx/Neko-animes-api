import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isNotFutureDate', async: false })
export class IsNotFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date): boolean {
    const currentDate = new Date();
    return date <= currentDate;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'A data de nascimento não pode ser no futuro';
  }
}
