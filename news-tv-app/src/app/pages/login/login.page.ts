import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/providers/toast';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordRaw: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.toast.show('Completa todos los campos correctamente', { color: 'warning' });
      return;
    }

    const { email, passwordRaw } = this.loginForm.value;

    try {
      const user = this.userService.login(email, passwordRaw);
      this.toast.show(`Bienvenido de nuevo, ${user.name}`, { color: 'success' });
      this.navCtrl.navigateRoot('/home');
    } catch (err: any) {
      this.toast.show(err.message, { color: 'danger' });
    }
  }

  get email() { return this.loginForm.get('email'); }
  get passwordRaw() { return this.loginForm.get('passwordRaw'); }
}