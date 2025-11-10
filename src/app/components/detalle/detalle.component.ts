import { Component, OnInit, Input} from '@angular/core';
import { PeliculaDetalle, Cast } from 'src/app/intefaces/interfaces';
import { Movies as MoviesService } from 'src/app/services/movies';
import { DataLocal } from 'src/app/services/data-local';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false
})
export class DetalleComponent  implements OnInit {
  @Input() id: any;
  pelicula?: PeliculaDetalle;
  cast: Cast[] = [];
  esFavorito = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocal
  ) { }

  ngOnInit() {
    //console.log('Pelicula ID:', this.id);
    this.moviesService.getPeliculaDetalle(this.id)
    .subscribe( resp => {
      console.log(resp);
      this.pelicula = resp;
      // Verificar si ya está en favoritos
      this.esFavorito = this.dataLocal.existePelicula(resp.id);
    });


   this.moviesService.getActoresPelicula(this.id)
    .subscribe( resp => {
      console.log('Actores response:', resp);
      this.cast = resp.cast;
    });
  }

  get genresText(): string {
    return this.pelicula && this.pelicula.genres ? this.pelicula.genres.map(g => g.name).join(', ') : '';
  }

  close() {

    this.modalCtrl.dismiss();
  }

  toggleFavorito() {
    if (this.pelicula) {
      this.esFavorito = this.dataLocal.toggleFavorito(this.pelicula);
    }
  }



}
