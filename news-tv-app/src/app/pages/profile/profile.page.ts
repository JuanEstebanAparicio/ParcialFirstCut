import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/providers/storage';
import { ToastService } from 'src/app/providers/toast';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { EncryptService } from 'src/app/providers/encrypt';  // ← Import AES


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  countrySearch: string = '';
  allCountries: any[] = [];
  filteredCountries: any[] = [];



  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private toast: ToastService,
    private navCtrl: NavController,
    private encryptService: EncryptService 
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordRaw: ['', [Validators.minLength(6)]],
      confirmPassword: [''],
      country: [null, Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

ngOnInit() {
  this.currentUser = this.storage.getObject<User>('current_user');
  if (!this.currentUser) {
    this.toast.show('Usuario no encontrado', { color: 'danger' });
    this.navCtrl.navigateRoot('/login');
    return;
  }

  // Sólo parcheo los campos que NO son contraseña
  this.profileForm.patchValue({
    name:      this.currentUser.name,
    lastName:  this.currentUser.lastName,
    email:     this.currentUser.email,
    country:   this.currentUser.country
  });
}



  filterCountries() {
    const term = this.countrySearch.trim().toLowerCase();
    this.filteredCountries = term
      ? this.allCountries.filter(c => c.name.toLowerCase().includes(term))
      : [...this.allCountries];
  }





  // 3. Validator para contraseñas
passwordsMatchValidator(form: FormGroup) {
  const pass    = form.get('passwordRaw')?.value;
  const confirm = form.get('confirmPassword')?.value;

  // Si ambos están vacíos, está bien (no cambia contraseña)
  if (!pass && !confirm) {
    return null;
  }

  // Si uno o ambos tienen valor, deben coincidir
  return pass === confirm ? null : { passwordMismatch: true };
}



 // 4. Envío del formulario
  onSubmit() {
    if (this.profileForm.invalid) {
      this.toast.show('Completa todos los campos correctamente', { color: 'warning' });
      return;
    }
    if (this.profileForm.hasError('passwordMismatch')) {
      this.toast.show('Las contraseñas no coinciden', { color: 'danger' });
      return;
    }

    const updated: any = { ...this.profileForm.value };
    delete updated.confirmPassword;
    updated.id       = this.currentUser!.id;
    updated.password = updated.passwordRaw;
    delete updated.passwordRaw;

    const users = this.storage.getObject<any[]>('app_users') || [];
    const index = users.findIndex(u => u.id === updated.id);
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

  // Getters para validaciones en el template
  get name()            { return this.profileForm.get('name'); }
  get lastName()        { return this.profileForm.get('lastName'); }
  get email()           { return this.profileForm.get('email'); }
  get passwordRaw()     { return this.profileForm.get('passwordRaw'); }
  get confirmPassword() { return this.profileForm.get('confirmPassword'); }
  get country()         { return this.profileForm.get('country'); }
}

