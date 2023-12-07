import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class LoaderService {
    isLoading = new Subject<boolean>();
    bodyCLass = false;
    show() {
        document.body.style.cssText = `overflow: hidden`;
        this.isLoading.next(true);
    }
    hide() {
        this.isLoading.next(false);
        document.body.style.cssText = `overflow: auto`;

    }
}