import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoaderService } from './demo/service/loaderservice';
import { Subject } from 'rxjs';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    theme = 'noir';

    layoutMode = 'static';

    megaMenuMode = 'gradient';

    menuMode = 'light';

    profileMode = 'inline';

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig, private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
    }
}
