import { Injectable } from "@angular/core";
import { AuthService } from "./../../auth/services/auth.service";


@Injectable()
export class TopNavService {

  constructor(
    private authService: AuthService
  ) {
  }
}