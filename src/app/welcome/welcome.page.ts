import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  private email: string
  private password: string
  constructor(private userService: UserService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home'])
    }
  }
  entrar(){
    this.userService.auth(this.email, this.password).subscribe(
      (user: any) => {
        localStorage.setItem('token', user.token)
        localStorage.setItem('name', user.data.name)
        this.presentToast("Logado com sucesso!")
        this.router.navigate(['/home'])
    }, error => {
      this.presentToast("Usuário ou senha inválidos!")
    })
  }
  async presentToast(message){
    const toast = await this.toast.create({
      message,
      duration: 2000,
      position: "top"
    })
    toast.present()
  }
  register(){
    this.router.navigate(['/register'])
  }
}
