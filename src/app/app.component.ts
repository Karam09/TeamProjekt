import { Component } from '@angular/core'; 
import AOS from 'aos'; 
import Swiper, { Navigation, Pagination } from 'swiper';    
import { LangDefinition, TranslocoService } from "@ngneat/transloco";
import { Subscription } from "rxjs";
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public swiper : any;
  services : any;
  title = 'robot';
  displayStyle = "none";
  availableLangs: LangDefinition[];
  private subscription: Subscription = Subscription.EMPTY;


 
  constructor(private service: TranslocoService ) {  
    this.availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  }

  get activeLang() {
    return this.service.getActiveLang();
  }

  changeLang(lang: string) {
    // Ensure new active lang is loaded
    this.subscription.unsubscribe();
    this.subscription = this.service
      .load(lang) 
      .subscribe(() => {
        this.service.setActiveLang(lang);
      });
  }
 
  ngOnInit() {
    AOS.init();
    this.swiper =  new Swiper('.swiper', {
      spaceBetween: 30,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      modules: [Navigation, Pagination],
      loop: true,
      autoplay: true
   });
  }


  openPopup() {
   return this.displayStyle = "block";
   console.log("resres")
  }
  closePopup() {
   return this.displayStyle = "none";
  }
  ngAfterViewInit() {
    // this.swiper.swiperRef.autoplay.running = true;
  }
}
