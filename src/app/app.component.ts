import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-shopping-list-web';
  private _icons: string[] = [
    'msl-logo',
    'login-social-google',
    'login-social-apple',
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.addCustomIcons();
  }

  private addCustomIcons() {
    this._icons.forEach((iconName) => {
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `../assets/icons/custom/${iconName}.svg`,
        ),
      );
    });
  }
}
