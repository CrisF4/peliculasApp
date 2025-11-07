import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movies } from '../services/movies';
import { Pelicula } from '../intefaces/interfaces';
import { Subject, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, finalize } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit, OnDestroy {

  searchQuery: string = '';
  peliculas: Pelicula[] = [];
  buscando = false;

  private searchSubject = new Subject<string>();
  private sub: Subscription | undefined;

  constructor(private movies: Movies, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.sub = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap( q => {
        const t = q.trim();
        if (!t) {
          // limpiar resultados
          this.buscando = false;
          return of({ results: [] } as any);
        }
        this.buscando = true;
        return this.movies.searchMovies(t).pipe(finalize(() => this.buscando = false));
      })
    ).subscribe( (resp: any) => {
      this.peliculas = resp.results || [];
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  onSearchChange(ev: Event) {
    const value = (ev as any).detail?.value ?? '';
    this.searchSubject.next(value);
  }

  async verDetalle(id: number){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id }
    });
    await modal.present();
  }

}
