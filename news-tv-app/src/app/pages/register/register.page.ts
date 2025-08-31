import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Country, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/providers/toast';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  countrySearch: string = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private navCtrl: NavController,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordRaw: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      country: [null, Validators.required],
      countrySearch: ['']
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  ngOnInit() {
    this.loadCountries();
  }

  private loadCountries() {
    const url = 'https://countriesnow.space/api/v0.1/countries/flag/unicode';
    this.http.get<any>(url).subscribe({
      next: res => {
        this.countries = res.data.map((c: any) => ({
          id: c.iso2.toLowerCase(),
          name: c.name,
          flagUrl: `https://flagcdn.com/24x18/${c.iso2.toLowerCase()}.png`
        }));
        this.filteredCountries = [...this.countries];
      },
      error: () => {
        this.toast.show('Error cargando países', { color: 'danger' });
      }
    });
  }

  filterCountries() {
    const term = this.countrySearch.trim().toLowerCase();
    this.filteredCountries = this.countries.filter(c =>
      c.name.toLowerCase().includes(term)
    );
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const pass = form.get('passwordRaw')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.toast.show('Completa todos los campos requeridos', { color: 'warning' });
      return;
    }

    if (this.registerForm.hasError('passwordMismatch')) {
      this.toast.show('Las contraseñas no coinciden', { color: 'danger' });
      return;
    }

    const data = { ...this.registerForm.value };
    delete data.confirmPassword;
    delete data.countrySearch;

    try {
      const user: User = this.userService.register(data);
      this.toast.show(`Registro exitoso, Bienvenido ${user.name}`, { color: 'success' });
      this.navCtrl.navigateRoot('/home');
    } catch (err: any) {
      this.toast.show(err.message, { color: 'danger' });
    }
  }

  // Getters para facilitar el HTML
  get name() { return this.registerForm.get('name'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get passwordRaw() { return this.registerForm.get('passwordRaw'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get country() { return this.registerForm.get('country'); }
}