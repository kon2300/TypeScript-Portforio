import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileInput: Prisma.ProfilesCreateInput) {
    return this.prisma.profiles.create({
      data: createProfileInput,
    });
  }
}
