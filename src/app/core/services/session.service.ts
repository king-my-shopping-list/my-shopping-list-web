import { Injectable } from '@angular/core';
import { ICurrentUser } from '../../modules/login/interfaces/current-user.interface';
import { BehaviorSubject } from 'rxjs';
import { StoreFactory } from '../store/store.factory';

export interface ISession {
  currentUser: ICurrentUser;
  lang: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService extends BehaviorSubject<ISession> {
  constructor(appStorage: StoreFactory) {
    super(appStorage.get('TOKEN') ?? ({} as ISession));
    this.subscribe((state) => appStorage.set('TOKEN', state));
  }

  update(session: ISession): void {
    if (this.value) {
      this.next({ ...this.value, ...session });
    }
  }

  updateLanguage(languageInput: string) {
    if (this.value) {
      this.next({ ...this.value, lang: languageInput });
    }
  }

  clear(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lang');
  }
}
