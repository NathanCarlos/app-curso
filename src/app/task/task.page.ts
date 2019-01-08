import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'
import { isNull, isUndefined } from 'util';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  private description;
  private title;
  private dateStart;
  private dateEnd;
  private calcDate = new Date();
  private aviso = "0";
  constructor(private taskService: TaskService, private router: Router, private toast: ToastController, private localNotifications: LocalNotifications) { }
  async ionViewWillEnter(){
    if(!isNull(sessionStorage.getItem('title'))){
      this.description = sessionStorage.getItem('description')
      this.title = sessionStorage.getItem('title')
      this.dateStart = sessionStorage.getItem('dataInicio')
      this.dateEnd = sessionStorage.getItem('dataFim')
      this.aviso = sessionStorage.getItem('aviso')
      sessionStorage.removeItem('description')
      sessionStorage.removeItem('title')
      sessionStorage.removeItem('dataInicio')
      sessionStorage.removeItem('dataFim')
      sessionStorage.removeItem('aviso')
    } else {
      this.calcDate.setHours(this.calcDate.getHours() - 2)
      this.dateStart = this.calcDate.toISOString()
      this.dateEnd = this.calcDate.toISOString()
    }

  }
  ngOnInit() {}
  createTask() {
    if (this.dateEnd > this.dateStart) {
      this.calcDate.setHours(this.calcDate.getHours() - 2)
      if (!isUndefined(this.title) && !isNull(this.title) && this.title != "") {
        if (!isUndefined(this.description) && !isNull(this.description) && this.description != "") {
          this.taskService.create(this.title, this.description, this.dateStart, this.dateEnd, this.aviso).subscribe(
            (taskCreated: any) => {
              let newDate: Date = new Date(taskCreated.dataInicio)
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
              this.localNotifications.schedule({
                title: 'Não Se Esqueça da Sua Tarefa!',
                text: `${taskCreated.title}`,
                trigger: { at: newDate },
                vibrate: true
              });
              this.dateEnd = new Date().toISOString();
              this.dateStart = new Date().toISOString();
              this.title = "";
              this.description = "";
              this.presentToast("Tarefa criada com sucesso!");
              if(!isNull(localStorage.getItem('listToday'))){
                localStorage.removeItem('listToday')
                this.router.navigate(['/list']);
              } else {
                this.router.navigate(['/listAll']);
              }
              
            }, error => {
              this.presentToast("Erro ao criar tarefa, verifique se você tem internet!");
            }
          )
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
    toast.present();
  }
  cancel(){
    if(!isNull(localStorage.getItem('listToday'))){
      localStorage.removeItem('listToday')
      this.router.navigate(['/list']);
    } else {
      this.router.navigate(['/listAll']);
    }
  }

}
