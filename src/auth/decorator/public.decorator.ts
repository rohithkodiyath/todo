import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { createMethodDecorator } from "@nestjs/swagger/dist/decorators/helpers";
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);