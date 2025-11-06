import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Pelicula } from 'src/app/intefaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
  standalone: false
})
export class SlideshowBackdropComponent  implements OnInit {

  @Input() peliculasRecientes: Pelicula[] = [];
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: number){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

  ngAfterViewInit() {
    if (this.swiperRef) {
      const swiperEl = this.swiperRef.nativeElement;

      // Opciones de Swiper. Parecido a ionic slidesOpts
      Object.assign(swiperEl, {
        slidesPerView: 1.1,
        freeMode: true,
        spaceBetween: 5,
      });

      swiperEl.initialize();
    }
  }

}
