import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export const mimeType = (control: AbstractControl)
  : Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = new Observable(observer => {
    fileReader.onloadend(() => {

    });
    // Read the file to extract the mime-type
    fileReader.readAsArrayBuffer(file);
  });
};
