import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTMDB, PeliculaDetalle, RespuestaCredits } from '../intefaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class Movies {

  private popularesPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ){
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

   //console.log( query );

    return this.http.get<T>( query );
  }

  getPopulares(): Observable<RespuestaTMDB> {
    this.popularesPage ++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery<RespuestaTMDB>(query);
  }

  // getFeature() tiene que devolver un Observable.
  getFeature(): Observable<RespuestaTMDB> {

    const hoy = new Date();                                              // mes +1 es el siguiente mes; dia 0 es el dia anterior al dia 1 del siguiente mes.
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if ( mes < 10 ){
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaTMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

getPeliculaDetalle( id: string ) {
  return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
}

searchMovies(query: string): Observable<RespuestaTMDB> {
  // Escape query minimally
  const q = encodeURIComponent(query.trim());
  return this.ejecutarQuery<RespuestaTMDB>(`/search/movie?query=${ q }&page=1`);
}
getActoresPelicula( id: string ){
  return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
}



}
