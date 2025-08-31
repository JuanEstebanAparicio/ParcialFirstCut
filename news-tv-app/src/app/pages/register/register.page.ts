import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/providers/toast';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private navCtrl: NavController,
    private http: HttpClient,
    private sharedModule: SharedModule
  )  {
      this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordRaw: ['', [Validators.required, Validators.minLength(6)]],
      country: [null, Validators.required],
      countrySearch: ['']
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
      this.filteredCountries = [...this.countries]; // inicializa con todos
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




  async onSubmit(){
if(this.registerForm.invalid){
  this.toast.show('Completa todos los campos requeridos', { color: 'warning' });
  return;
}
const data = this.registerForm.value;
try{
const user: User = this.userService.register(data);
this.toast.show(`Registro exitoso, Bienvenido ${user.name}`,  { color: 'success' });
this.navCtrl.navigateRoot('/home');
}catch(err: any){
  this.toast.show(err.message, { color: 'danger' });
}
}
  }


