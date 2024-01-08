import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../model/user/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async findOne(email: string): Promise<User> {
        const users = await this.userRepository.find({
        });
        return users.find((user) => user.email === email);
    }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.findOne(email);
        console.log('here', user);
        if (!user) {
          console.log('user not found');
          throw new UnauthorizedException('User not found');
        } else if (user && (await bcrypt.compare(pass, user.password))) {
          console.log('user found and pass ok');
          const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            username: user.username,
          };
          console.log('payload', payload);
          return {
            access_token: await this.jwtService.signAsync(payload)
          };
        } else {
          console.log('user found but pass not ok');
          throw new UnauthorizedException('Invalid credentials');
        }
      }
    
    async register(userCreated: any): Promise<User> {
        const { password, email } = userCreated;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user: User = {
            username: '', // Add the missing username property
            password: hash,
            email,
            isAdmin: false,
            id: 0
        };
        console.log('user', user);
        if (await this.findOne(user.email)) {
            throw new UnauthorizedException();
        }
        return await this.create(user);
    }

    async create(user: User) {
        const newUser = new User();
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.email = user.email;
        newUser.isAdmin = user.isAdmin;
        return await this.userRepository.save(newUser);
    }
}
