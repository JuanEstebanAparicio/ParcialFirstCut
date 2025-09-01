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
  const formValues = this.profileForm.value;

  // … (validaciones previas)

  const updated: any = {
    ...this.currentUser,    // copia id, country, password viejos, etc.
    name:     formValues.name,
    lastName: formValues.lastName,
    email:    formValues.email,
    country:  formValues.country
  };

  // Sólo si ingresó nueva contraseña, la sobrescribimos
  if (formValues.passwordRaw) {
    // Hash SHA256
    updated.password = this.encryptService.encrypt(formValues.passwordRaw);

    // Si mantienes passwordCipher, asegúrate de que encryptAES exista:
    if (this.encryptService.encryptAES) {
      updated.passwordCipher = this.encryptService.encryptAES(formValues.passwordRaw);
    }
  }

  // Actualiza storage
  const users = this.storage.getObject<User[]>('app_users') || [];
  const idx = users.findIndex(u => u.id === updated.id);
  users[idx] = updated;
  this.storage.setObject('app_users', users);
  this.storage.setObject('current_user', updated);

  console.log('Usuario guardado final:', this.storage.getObject('current_user'));

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

