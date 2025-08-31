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
      country: [null, Validators.required]
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
          id: c.name,
          value: `${c.flag} ${c.name}`
        }));
      },
      error: () => {
        this.toast.show('Error cargando países', { color: 'danger' });
      }
    });
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


