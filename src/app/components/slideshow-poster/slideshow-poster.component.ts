import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Pelicula } from 'src/app/intefaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
  standalone: false
})
export class SlideshowPosterComponent  implements OnInit, AfterViewInit {

  @Input() peliculasRecientes: Pelicula[] = [];
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: number){
    console.log('slideshow-poster verDetalle id:', id);
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
        slidesPerView: 3.3,
        freeMode: true,
        spaceBetween: 5,
      });

      swiperEl.initialize();
    }
  }

}
