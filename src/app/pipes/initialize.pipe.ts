import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
  name: 'initialize'
})
export class InitializePipe implements PipeTransform{

  transform(name: string){
    let initialsObj = name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    let initials = initialsObj.join('');
    return initials;
  }

}
