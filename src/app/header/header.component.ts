import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { LangDefinition, TranslocoService } from "@ngneat/transloco";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private subscription: Subscription = Subscription.EMPTY;
  public services : any;


  constructor(private service: TranslocoService ) { }

 

  changeLang(lang: string) {
    // Ensure new active lang is loaded
    localStorage.setItem('selectedLanguage', JSON.stringify(lang))
    this.subscription.unsubscribe();
    this.subscription = this.service
      .load(lang) 
      .subscribe(() => {
        this.service.setActiveLang(lang);
      });
  }
}
