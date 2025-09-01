import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  standalone: false,
})
export class UserMenuComponent {

  constructor(private popoverCtrl: PopoverController) { }

close(action:string){
this.popoverCtrl.dismiss({action})

}


}