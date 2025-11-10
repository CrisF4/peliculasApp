import { Injectable } from '@angular/core';
import { PeliculaDetalle } from '../intefaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocal {

  private STORAGE_KEY = 'peliculasFavoritas';

  constructor() { }

  // Guardar película en favoritos
  guardarPelicula(pelicula: PeliculaDetalle): void {
    const favoritos = this.obtenerFavoritos();

    // Verificar si ya existe
    const existe = favoritos.find(p => p.id === pelicula.id);
    if (!existe) {
      favoritos.push(pelicula);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
    }
  }

  // Obtener todas las películas favoritas
  obtenerFavoritos(): PeliculaDetalle[] {
    const favoritos = localStorage.getItem(this.STORAGE_KEY);
    return favoritos ? JSON.parse(favoritos) : [];
  }

  // Eliminar película de favoritos
  eliminarPelicula(id: number): void {
    let favoritos = this.obtenerFavoritos();
    favoritos = favoritos.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
  }

  // Verificar si una película está en favoritos
  existePelicula(id: number): boolean {
    const favoritos = this.obtenerFavoritos();
    return favoritos.some(p => p.id === id);
  }

  // Toggle: agregar o quitar de favoritos
  toggleFavorito(pelicula: PeliculaDetalle): boolean {
    if (this.existePelicula(pelicula.id)) {
      this.eliminarPelicula(pelicula.id);
      return false; // Ya no es favorito
    } else {
      this.guardarPelicula(pelicula);
      return true; // Ahora es favorito
    }
  }
}
