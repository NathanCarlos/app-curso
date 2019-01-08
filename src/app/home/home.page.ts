import { Component } from '@angular/core';
import { TaskService } from '../services/task.service'
import { ToastController, LoadingController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private notifications;
  private notificationsAll;
  private home;
  public datenow = new Date();
  constructor( private taskService: TaskService, private toast: ToastController, private router: Router, private loadingController: LoadingController ) { }
  async ionViewWillEnter(){
    if (this.datenow.getHours() >= 0 && this.datenow.getHours() < 5) {
      this.home = `Boa Noite, ${localStorage.getItem('name')}`
    }
    else if (this.datenow.getHours() >= 5 && this.datenow.getHours() < 12) {
      this.home = `Bom Dia, ${localStorage.getItem('name')}`
    }
    else if (this.datenow.getHours() >= 12 && this.datenow.getHours() < 18) {
      this.home = `Boa Tarde, ${localStorage.getItem('name')}`
    }
    else {
      this.home = `Boa Noite, ${localStorage.getItem('name')}`
    }
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/welcome'])
    }
    else {
      const loading = await this.loadingController.create({
        spinner: 'crescent',
        message: 'Carregando dados...',
        translucent: true
      });
      await loading.present();  
      this.taskService.findCount().subscribe((retorno) => {
        this.notifications = retorno
        this.taskService.findCountAll().subscribe(async (retorno2) => {
          this.notificationsAll = retorno2
          await loading.dismiss();  
        }, error => {
          this.presentToast("Erro, verifique se o seu dispotivo tem conexão com a internet!.")
        })
      }, error => {
        this.presentToast("Erro, verifique se o seu dispotivo tem conexão com a internet!.")
      })
    }
  }
  async ngOnInit() {}
  async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      position: "top"
    })
    toast.present()
  }
  pageList() {
    this.router.navigate(['/list'])
  }
  pageListAll() {
    this.router.navigate(['/listAll'])
  }
}
