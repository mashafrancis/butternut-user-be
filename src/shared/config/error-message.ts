import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/error-message.interface';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
  'user:create:missingInformation': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new users with missing information.',
    userMessage: 'Unable to create a new users with missing information.',
  },
  'user:create:missingFirstName': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new users without first name.',
    userMessage: 'Please enter your first name.',
  },
  'user:create:missingLastName': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new users without last name.',
    userMessage: 'Please enter your last name.',
  },
  'user:create:missingEmail': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new users without email.',
    userMessage: 'Please enter your email address.',
  },
  'user:create:missingPassword': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new users without password.',
    userMessage: 'Please enter your password.',
  },
  'user:create:emailAlreadyExist': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new users with this email.',
    userMessage: 'The e-mail address you have provided is already used.',
  },
  'user:show:missingId': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to find the users caused by missing information.',
    userMessage: 'Can not find a user without providing d\'id.',
  },
  'user:update:missingInformation': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update the users caused by missing information.',
    userMessage: 'Unable to update the user with missing data.',
  },
  'user:update:missingId': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update the users caused by missing information.',
    userMessage: 'Unable to update the user with missing data.',
  },
  'user:delete:missingId': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to delete the users caused by missing information.',
    userMessage: 'Can not delete a user without providing an id.',
  },
  'user:notFound': {
    type: 'notFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'Unable to found the user with the provided information.',
    userMessage: 'No user found with the information provided. Kindly register or login.',
  },
  'request:unauthorized': {
    type: 'unauthorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'Access unauthorized.',
    userMessage: 'Unauthorized access.',
  },
  'auth:login:missingEmail': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to connect the users without email.',
    userMessage: 'Please enter your email address',
  },
  'auth:login:missingPassword': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to connect the users without password.',
    userMessage: 'Please enter your password',
  },
  'auth:login:invalidPassword': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to connect the users with an invalid password.',
    userMessage: 'Invalid Password',
  },
};
