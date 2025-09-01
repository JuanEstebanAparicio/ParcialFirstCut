import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/providers/storage';
import { ToastService } from 'src/app/providers/toast';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  filteredCountries: any[] = [];
  countrySearch: string = '';


  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private toast: ToastService,
    private navCtrl: NavController
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordRaw: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      country: [null, Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  ngOnInit() {
    this.currentUser = this.storage.getObject('current_user');
    if (!this.currentUser) {
      this.toast.show('Usuario no encontrado', { color: 'danger' });
      this.navCtrl.navigateRoot('/login');
      return;
    }

    this.profileForm.patchValue({
      name: this.currentUser.name,
      lastName: this.currentUser.lastName,
      email: this.currentUser.email,
      country: this.currentUser.country
    });

const allCountries = this.storage.getObject<any[]>('countries') || [];
this.filteredCountries = allCountries.filter(c => c.name);

  }
   filterCountries() {
    const allCountries = this.storage.getObject<any[]>('countries') || [];
    const term = this.countrySearch.trim().toLowerCase();

    this.filteredCountries = term
      ? allCountries.filter(c => c.name.toLowerCase().includes(term))
      : allCountries;
  }



  passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('passwordRaw')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.toast.show('Completa todos los campos correctamente', { color: 'warning' });
      return;
    }

    if (this.profileForm.hasError('passwordMismatch')) {
      this.toast.show('Las contraseñas no coinciden', { color: 'danger' });
      return;
    }

    const updated = { ...this.profileForm.value };
    delete updated.confirmPassword;

    updated.id = this.currentUser?.id;
    updated.password = updated.passwordRaw;
    delete updated.passwordRaw;

    const users = this.storage.getObject('app_users') || [];
    if (!Array.isArray(users)) {
      this.toast.show('Error: lista de usuarios inválida', { color: 'danger' });
      return;
    }

    const index = users.findIndex((u: any) => u.id === updated.id);
    if (index === -1) {
      this.toast.show('Usuario no encontrado en la base', { color: 'danger' });
      return;
    }

    users[index] = updated;
    this.storage.setObject('app_users', users);
    this.storage.setObject('current_user', updated);

    this.toast.show('Perfil actualizado con éxito', { color: 'success' });
    this.navCtrl.navigateBack('/home');
  }

  // Getters para validaciones visuales
  get name() { return this.profileForm.get('name'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get passwordRaw() { return this.profileForm.get('passwordRaw'); }
  get confirmPassword() { return this.profileForm.get('confirmPassword'); }
  get country() { return this.profileForm.get('country'); }
}