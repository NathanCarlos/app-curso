import { Component, OnInit } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { TaskService } from '../services/task.service'
import { ToastController, AlertController, LoadingController } from '@ionic/angular'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private tasks;
  constructor(private router: Router, private taskService: TaskService, private toast: ToastController, private alertController: AlertController, private localNotifications: LocalNotifications, private loadingController: LoadingController) { }
  async ionViewWillEnter(){
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
      this.taskService.find().subscribe(
        async (task: any) => {
          this.tasks = task;
          await loading.dismiss();
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
  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Entendi']
    });

    await alert.present();
  }
  addTask() {
    localStorage.setItem('listToday', 'today')
    this.router.navigate(['/task'])
  }
  allDescription(id, title, description, dataInicio, dataFim, done, aviso) {
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('title', title)
    sessionStorage.setItem('description', description)
    sessionStorage.setItem('dataInicio', dataInicio)
    sessionStorage.setItem('dataFim', dataFim)
    sessionStorage.setItem('done', done)
    sessionStorage.setItem('aviso', aviso)
    localStorage.setItem('list', 'list')
    this.router.navigate(['/task-details'])
  }
  help() {
    this.presentAlert('Ajuda', '- Para atualizar a sua lista de tarefas basta arrastar com o dedo de cima para baixo.')
  }
}
