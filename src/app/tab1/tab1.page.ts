import { Component, OnInit } from '@angular/core';
import { Movies } from '../services/movies';
import { Pelicula} from '../intefaces/interfaces';
// Importar y registrar los elementos personalizados de Swiper. Esto se hace en cada componente por separado.
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true,
  }

  constructor( private movies: Movies) {}

  ngOnInit() {
    this.movies.getFeature().subscribe( resp => {
      console.log('Response:', resp);
      this.peliculasRecientes = resp.results;
    });
    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.movies.getPopulares().subscribe( resp => {
      const arrTemp = [ ...this.populares, ...resp.results ];
      this.populares = arrTemp;
    });
  }
}
