import { Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Pelicula } from 'src/app/intefaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
  standalone: false
})
export class SlideshowParesComponent  implements OnInit {

  @Input() peliculasRecientes: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  constructor(private modalCtrl: ModalController) { }

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
        slidesPerView: 3.3,
        freeMode: true,
        spaceBetween: -10,
      });

      swiperEl.initialize();
    }
  }

  onClick() {
    this.cargarMas.emit();
  }

}
