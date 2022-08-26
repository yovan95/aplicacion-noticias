import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private actionCtrl: ActionSheetController,
             private storageService: StorageService,
             private iab: InAppBrowser,
             private socialSharing: SocialSharing) {}

  ngOnInit() {}
  abrirNoticia(){

    const browser = this.iab.create(this.noticia.url, '_system');

  }
  async lanzarMenu() {
    const noticiaEnFavoritos = this.storageService.noticiaEnFavoritos(this.noticia);
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share-social-outline',
        id: 'delete-button',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
            );
        }
      }, {
        text: noticiaEnFavoritos ? 'Remover de favoritos ' : 'Agregar a favoritos',
        icon: noticiaEnFavoritos ? 'bookmarks-outline' : 'star-outline',
        handler: () => {
          this.storageService.saveRemoveNoticia(this.noticia);
          
        }
      }, 
       {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Click boton cancelar');
        }
      }]
    });
    await actionSheet.present();
  }
}
