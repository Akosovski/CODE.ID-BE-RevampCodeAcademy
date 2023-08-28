/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Get()
  public async getAll() {
    return this.authService.findAll();
  }

  @Get('users/employees')
  public async getAllEmployees() {
    return this.authService.findAllEmployee(); // Panggil findAllEmployee
    // console.log(this.authService.findAllEmployee());
  }

  @Delete('users/:id')
  public async Delete(@Param('id') id: number) {
    return this.authService.delete(id);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('fields'))
  public async signUp(@Body() fields: any) {
    return this.authService.signup(fields);
  }

  @Post('signupEmployee')
  @UseInterceptors(FileInterceptor('fields'))
  public async signUpEmployee(@Body() fields: any) {
    return this.authService.signupasemployee(fields);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  public async Update(
    @UploadedFile('file') file,
    @Body() fields: any,
    @Param('id') id: number,
  ) {
    return this.authService.applyupdate(file, id, fields);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  public async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signinEmployee')
  public async signInEmployee(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  public async getProfile(@Request() req) {
    return req.user;
  }

  // @Get(':id')
  // public async getOne(@Param('id') id: number) {
  //   return this.authService.findOne(id);
  // }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    const user = await this.authService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // const userEmails = user.usersEmails.map((email) => email.pmailAddress);
    const userEmails = user.usersEmails.map((email) => ({
      id: email.pmailId,
      email: email.pmailAddress,
    }));
    // const userPhoneNumbers = user.usersPhones.map((phone) => phone.uspoNumber);
    const userPhoneNumbers = user.usersPhones.map((phone) => ({
      id: phone.uspoNumber,
      phone: phone.uspoNumber,
      pontycode: phone.uspoPontyCode, //untuk menampilkan data pontycode yang
    }));

    const userAddress = user.usersAddresses.map((address) => ({
      AddressId: address.etadAddrId,
    }));

    const userEducation = user.usersEducations.map((education) => ({
      EducationId: education.usduId,
      School: education.usduSchool,
      Degree: education.usduDegree,
      Study: education.usduFieldStudy,
      Grade: education.usduGrade,
      YearStart: education.usduStartDate,
      YearEnd: education.usduEndDate,
      Activity: education.usduActivities,
      Description: education.usduDescription,
    }));

    return {
      userEntityId: user.userEntityId,
      userName: user.userName,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userEmail: userEmails,
      userPhoneNumber: userPhoneNumbers,
      userAddress: userAddress, //untuk menampilkan users address ketika getone
      userEducation: userEducation,
    };
  }

  @Put('users/profile/edit/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async editProfile(
    @UploadedFile('file') file,
    @Param('id') id: number,
    @Body() fields: any,
  ) {
    return this.authService.editprofile(file, id, fields);
  }

  @Put('users/profile/password/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async changePassword(@Param('id') id: number, @Body() fields: any) {
    return this.authService.changepassword(id, fields);
  }

  @Post('users/profile/email/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async addEmail(@Param('id') id: number, @Body() fields: any) {
    return this.authService.addemail(id, fields);
  }

  @Put('users/profile/email/:pmailid')
  @UseInterceptors(FileInterceptor('fields'))
  public async editEmail(
    @Param('pmailid') pmailid: number,
    @Body() fields: any,
  ) {
    return this.authService.editmail(pmailid, fields);
  }

  @Delete('users/profile/email/:pmailid')
  public async Deleteemail(@Param('pmailid') pmailid: number) {
    return this.authService.deleteemail(pmailid);
  }

  @Post('users/profile/phone/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async addPhone(@Param('id') id: number, @Body() fields: any) {
    return this.authService.addphone(id, fields);
  }

  @Put('users/profile/phone/:usponumber')
  @UseInterceptors(FileInterceptor('fields'))
  public async editPhone(
    @Param('usponumber') usponumber: string,
    @Body() fields: any,
  ) {
    return this.authService.editphone(usponumber, fields);
  }

  @Delete('users/profile/phone/:usponumber')
  public async Deletephone(@Param('usponumber') usponumber: string) {
    return this.authService.deletephone(usponumber);
  }
  //penambahan di @body search menyesuaikan di service
  @Post('users/profile/address/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async addAddress(
    @Param('id') id: number,
    @Body() fields: any,
    @Body('search_city', new DefaultValuePipe(null)) search_city: string,
  ) {
    return this.authService.addaddress(id, fields, search_city);
  }
  //penambahan di @body search menyesuaikan di service
  @Put('users/profile/address/:addrid') //perubahan pada :id menjadi :addrid dan penambahan search
  @UseInterceptors(FileInterceptor('fields'))
  public async editAddress(
    @Param('addrid') addrid: number,
    @Body() fields: any,
    @Body('search_city', new DefaultValuePipe(null)) search_city: string,
  ) {
    return this.authService.editaddress(addrid, fields, search_city);
  }

  @Delete('users/profile/address/:id')
  public async Deleteaddress(@Param('id') id: number) {
    return this.authService.deleteaddress(id);
  }

  @Post('users/profile/education/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async addEducation(@Param('id') id: number, @Body() fields: any) {
    return this.authService.addeducation(id, fields);
  }

  @Put('users/profile/education/:usduid') //perubahan :id menjadi :usduid
  @UseInterceptors(FileInterceptor('fields'))
  public async editEducation(
    @Param('usduid') usduid: number,
    @Body() fields: any,
  ) {
    return this.authService.editeducation(usduid, fields);
  }

  @Delete('users/profile/education/:id')
  public async Deleteeducation(@Param('id') id: number) {
    return this.authService.deleteeducation(id);
  }
  //penambahan di @body search menyesuaikan di service
  @Post('users/profile/experience/:id') //penambahan search
  @UseInterceptors(FileInterceptor('fields'))
  public async addExperience(
    @Param('id') id: number,
    @Body() fields: any,
    @Body('search_city', new DefaultValuePipe(null)) search_city: string,
  ) {
    return this.authService.addexperience(id, fields, search_city);
  }
  //penambahan di @body search menyesuaikan di service
  @Put('users/profile/experience/:usexid')
  @UseInterceptors(FileInterceptor('fields'))
  public async editExperience(
    @Param('usexid') usexid: number,
    @Body() fields: any,
    @Body('search_city', new DefaultValuePipe(null)) search_city: string,
  ) {
    return this.authService.editexperience(usexid, fields, search_city);
  }

  @Delete('users/profile/experience/:usexid')
  public async Deleteexperience(@Param('usexid') usexid: number) {
    return this.authService.deleteexperience(usexid);
  }
  //penambahan di @body search menyesuaikan di service
  @Post('users/profile/skill/:id')
  @UseInterceptors(FileInterceptor('search_skill'))
  public async addSkill(
    @Param('id') id: number,
    @Body('search_skill', new DefaultValuePipe(null)) search_skill: string,
  ) {
    return this.authService.addskill(id, search_skill);
  }
}
