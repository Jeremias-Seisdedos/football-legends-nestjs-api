import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.log('💥 PrismaExceptionFilter activado');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let message: string;
    let error: string;

    switch (exception.code) {
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        message = 'El valor es demasiado largo para esta columna';
        error = 'Bad Request';
        break;

      case 'P2002': {
        status = HttpStatus.CONFLICT;
        const targets = exception.meta?.target as string[];
        const field = targets ? targets[0] : 'campo';
        message = `Ya existe un registro con este ${field}`;
        error = 'Conflict';
        break;
      }

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'El registro no fue encontrado';
        error = 'Not Found';
        break;

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Violación de clave foránea';
        error = 'Foreign Key Constraint';
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Error interno en la base de datos';
        error = 'Internal Server Error';
        break;
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
    };

    console.error(
      `🔥 Prisma Error ${exception.code}: ${message} - ${request.method} ${request.url}`,
    );

    response.status(status).json(errorResponse);
  }
}
