import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'
import { HomePage } from '../home/home.page'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private username: string;
  private email: string;
  private password: string;

  constructor(private userService: UserService, private toast: ToastController, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home'])
    }
  }

  register() {
    this.presentToast("Aguarde enquanto efetivamos o seu cadastro!")
    this.userService.register(this.username, this.email, this.password).subscribe(
      (retorno) => {
        this.userService.auth(this.email, this.password).subscribe(
          (user: any) => {
            localStorage.setItem('token', user.token)
            localStorage.setItem('name', user.data.name)
            this.router.navigate(['/home'])
          }, error => {
            this.presentToast("Usuário ou senha inválidos!")
          })
      }, error => {
        this.presentToast("Ocorreu um erro ao realizar o seu cadastro, por favor, tente novamente!")
      })
  }
  async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      position: "top"
    })
    toast.present()
  }
  back(){
    this.router.navigate(['/welcome'])
  }
  animation(){
    this.presentToast("Preencha as informações e clique em concluir :)")
  }
}
