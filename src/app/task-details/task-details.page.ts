import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { ToastController, AlertController } from '@ionic/angular';
import { isUndefined, isNull } from 'util';
import { ListPage } from '../list/list.page'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  private id: Number;
  private description;
  private title;
  private dateStart;
  private dateEnd;
  private done;
  private aviso;
  private calcDate = new Date()
  constructor( private router: Router, private taskService: TaskService, private toast: ToastController, private localNotifications: LocalNotifications, private alertController: AlertController ) { }

  ngOnInit() {
    this.calcDate.setHours(this.calcDate.getHours() - 2)
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/welcome'])
    }
    if (!isNull(sessionStorage.getItem('description'))) {
      this.description = sessionStorage.getItem('description')
      this.id = parseInt(sessionStorage.getItem('id'))
      this.title = sessionStorage.getItem('title')
      this.dateStart = sessionStorage.getItem('dataInicio')
      this.dateEnd = sessionStorage.getItem('dataFim')
      this.done = sessionStorage.getItem('done')
      this.aviso = sessionStorage.getItem('aviso')
      sessionStorage.removeItem('description')
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('title')
      sessionStorage.removeItem('dataInicio')
      sessionStorage.removeItem('dataFim')
      sessionStorage.removeItem('done')
      sessionStorage.removeItem('aviso')
    } else {
      this.router.navigate(['/list'])
    }
  }
  editTask() {
    if (this.dateEnd > this.dateStart) {
      this.calcDate.setHours(this.calcDate.getHours() - 2)
      if (this.title != "") {
        if (this.description != "") {
          this.taskService.update(this.id, this.title, this.description, this.dateStart, this.dateEnd, this.done, this.aviso).subscribe(
            (retorno) => {
              let newDate: Date = new Date(this.dateStart)
              newDate.setHours(newDate.getHours() + 2)
              if(this.aviso == "0")
              {
                newDate.setMinutes(newDate.getMinutes() - 5)
              } else if (this.aviso == "1"){
                newDate.setMinutes(newDate.getMinutes() - 10)
              } else if (this.aviso == "2"){
                newDate.setMinutes(newDate.getMinutes() - 20)
              } else {
                newDate.setMinutes(newDate.getMinutes() - 30)
              }
              console.log(newDate)
              this.localNotifications.schedule({
                title: 'Não Se Esqueça da Sua Tarefa!',
                text: `${this.title}`,
                trigger: { at: newDate },
                vibrate: true
              });
              if (retorno[0] == 1) {
                this.presentToast("Informações alteradas com sucesso!")

              }
              else {
                this.presentToast("Ocorreu um erro ao realizar a alteração da tarefa, tente novamente por favor!")
              }
            }, error => {
              this.presentToast("Erro, verifique se o seu dispotivo tem conexão com a internet!")
            })
        }
        else {
          this.presentToast("A descrição da tarefa precisa ser preenchida.")
        }
      }
      else {
        this.presentToast("O título da tarefa precisa ser preenchido.")
      }

    }
    else {
      this.presentToast("A data de término tem que ser maior que a data de início de uma tarefa.")
    }
  }
  async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      position: "top"
    })
    toast.present()
  }
  back() {
    if (!isNull(localStorage.getItem('list'))) {
      this.router.navigate(['/list'])
      localStorage.removeItem('list')
    } else {
      this.router.navigate(['/listAll'])
      localStorage.removeItem('listAll')
    }
  }
  remove() {
    this.taskService.delete(this.id).subscribe((retorno) => {
      if (retorno == 1) {
        this.presentToast("Tarefa excluída com sucesso!")
        this.back()
      }
      else {
        this.presentToast("Ocorreu um erro ao realizar a exclusão da tarefa, tente novamente por favor!")
      }
    }, error => {
      this.presentToast("Erro, verifique se o seu dispotivo tem conexão com a internet!")
    })
  }
  doneTask() {
    if (this.done == "false") {
      this.done = "true"
    }
    else {
      this.done = "false"
    }
    console.log(this.done)
  }
  copyTask(){
    sessionStorage.setItem('title', this.title)
    sessionStorage.setItem('description', this.description)
    sessionStorage.setItem('dataInicio', this.dateStart)
    sessionStorage.setItem('dataFim', this.dateEnd)
    sessionStorage.setItem('aviso', this.aviso)
    this.router.navigate(['/task'])
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Você realmente deseja deletar essa tarefa?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.remove();
          }
        }
      ]
    });

    await alert.present();
  }

}
