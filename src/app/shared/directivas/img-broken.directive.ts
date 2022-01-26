import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') handleError():void{
    const elnative = this.elHost.nativeElement
    console.log('Esta imagen no pudo cargar ', this.elHost)
    elnative.src = 'https://th.bing.com/th/id/R.e37a9d1380d55f6467ca3f5bb488ceac?rik=e%2bRWsp%2fGtB8%2bog&pid=ImgRaw&r=0'
  }
  constructor(private  elHost:ElementRef) { }

}
