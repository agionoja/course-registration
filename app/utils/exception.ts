import { HttpStatus } from "~/utils/status";

export class Exception extends Error {
  isOperational: boolean;
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = HttpStatus[statusCode];
  }
}

export class NotFoundException extends Exception {
  constructor(message = "Not found") {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedException extends Exception {
  constructor(message = "Unauthorized") {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends Exception {
  constructor(message = "Forbidden") {
    super(message, HttpStatus.FORBIDDEN);
  }
}
