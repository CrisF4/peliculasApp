import { Component, OnInit } from '@angular/core';
import { DataLocal } from '../services/data-local';
import { PeliculaDetalle } from '../intefaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

interface GeneroGrupo {
  genero: string;
  peliculas: PeliculaDetalle[];
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  peliculasFavoritas: PeliculaDetalle[] = [];
  peliculasPorGenero: GeneroGrupo[] = [];

  constructor(
    private dataLocal: DataLocal,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  ionViewWillEnter() {
    // Se ejecuta cada vez que entramos a la pestaña
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.peliculasFavoritas = this.dataLocal.obtenerFavoritos();
    this.agruparPorGenero();
  }

  agruparPorGenero() {
    // Objeto para almacenar películas agrupadas por género
    const gruposPorGenero: { [key: string]: PeliculaDetalle[] } = {};

    // Agrupar películas por cada uno de sus géneros
    this.peliculasFavoritas.forEach(pelicula => {
      if (pelicula.genres && pelicula.genres.length > 0) {
        pelicula.genres.forEach(genero => {
          if (!gruposPorGenero[genero.name]) {
            gruposPorGenero[genero.name] = [];
          }
          // Evitar duplicados en el mismo género
          if (!gruposPorGenero[genero.name].find(p => p.id === pelicula.id)) {
            gruposPorGenero[genero.name].push(pelicula);
          }
        });
      } else {
        // Si no tiene géneros, ponerla en "Sin clasificar"
        if (!gruposPorGenero['Sin clasificar']) {
          gruposPorGenero['Sin clasificar'] = [];
        }
        gruposPorGenero['Sin clasificar'].push(pelicula);
      }
    });

    // Convertir el objeto en array y ordenar alfabéticamente
    this.peliculasPorGenero = Object.keys(gruposPorGenero)
      .sort()
      .map(genero => ({
        genero,
        peliculas: gruposPorGenero[genero]
      }));
  }

  async verDetalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id }
    });

    await modal.present();

    // Cuando se cierra el modal, recargar favoritos
    await modal.onDidDismiss();
    this.cargarFavoritos();
  }

  eliminarFavorito(pelicula: PeliculaDetalle) {
    this.dataLocal.eliminarPelicula(pelicula.id);
    this.cargarFavoritos();
  }

}
