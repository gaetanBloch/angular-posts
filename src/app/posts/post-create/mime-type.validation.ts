import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

export const mimeType = (control: AbstractControl)
  : Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {

  if (typeof control.value === 'string') {
    return of(null);
  }

  const file = control.value as File;
  const fileReader = new FileReader();
  return new Observable(observer => {
    fileReader.onloadend = () => {
      // Extract the mime-type
      const array = new Uint8Array(fileReader.result as ArrayBuffer)
        .subarray(0, 4);
      let header = '';
      let isValid: boolean;
      array.forEach(chunk => {
        // Convert to an hexadecimal string
        header += chunk.toString(16);
      });
      switch (header) {
        // Allow .png and .jpg / .jpeg
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          // Other mime types are not allowed
          isValid = false;
          break;
      }
      if (isValid) {
        // Emmit null if it is valid
        observer.next(null);
      } else {
        // Validation error
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    };
    // Read the file to extract the mime-type
    fileReader.readAsArrayBuffer(file);
  });
};
