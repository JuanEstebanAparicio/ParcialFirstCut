
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
profileForm : FormGroup;
currentUser: User | null = null;


  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private toast: ToastService,
    private navCtrl: NavController,

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



  }


  passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('passwordRaw')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }
  onSubmit(){
  if(this.profileForm.invalid){
    this.toast.show('Completa todos los campos correctamente', {color:'warning'});
    return;
  }
    const updated = { ...this.profileForm.value };
    delete updated.confirmPassword;

    updated.id = this.currentUser.id;
    updated.password = updated.passwordRaw;
    delete updated.passwordRaw;

    const users = this.storage.getObject('app_users') || [];
    const index = users.findIndex((u: any) => u.id === updated.id);
    users[index] = updated;

    this.storage.setObject('app_users', users);
    this.storage.setObject('current_user', updated);

    this.toast.show('Perfil actualizado con éxito', { color: 'success' });
    this.navCtrl.navigateBack('/home');
  }





}