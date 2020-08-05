import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/shared/services/user.service";
import { Router } from "@angular/router";
import {
  PAGES,
  SNACKBAR_MESSAGES,
  RESPONSES,
} from "src/app/shared/utils/constant";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onLogin(): void {
    this.isLoading = true;
    const currentUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.snackbar.show(SNACKBAR_MESSAGES.LOGIN_SUCCESS, RESPONSES.SUCCESS);
    this.isLoading = false;
    this.router.navigate([PAGES.COMICS])
  }
}
