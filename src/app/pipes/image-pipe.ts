import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'image',
  standalone: false
})
export class ImagePipe implements PipeTransform {

  transform(img: string | null, size: string = 'w500'): string {
    if (!img) {
      return './assets/no-image-banner.jpg';
    }
    const imgURL = `${ URL }/${ size }${ img }`;
    // console.log('Image URL:', imgURL);
    // Se puede pasar un Width de tamaño opcional
    // https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

    return imgURL;
  }

}
