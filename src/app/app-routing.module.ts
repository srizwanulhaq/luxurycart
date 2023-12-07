import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { FormLayoutDemoComponent } from './demo/view/formlayoutdemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MediaDemoComponent } from './demo/view/mediademo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { AppMainComponent } from './app.main.component';
import { InputDemoComponent } from './demo/view/inputdemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatlabeldemo.component';
import { InvalidStateDemoComponent } from './demo/view/invalidstatedemo.component';
import { ListDemoComponent } from './demo/view/listdemo.component';
import { AuthGuard } from './demo/service/authguardservice';
import { LoginMainComponent } from './demo/view/Login/login-main/login-main.component';



@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: '', component: DashboardDemoComponent, canActivate: [AuthGuard] },
                    { path: 'uikit/formlayout', component: FormLayoutDemoComponent },
                    { path: 'uikit/input', component: InputDemoComponent },
                    { path: 'uikit/floatlabel', component: FloatLabelDemoComponent },
                    { path: 'uikit/invalidstate', component: InvalidStateDemoComponent },
                    { path: 'uikit/list', component: ListDemoComponent },
                    { path: 'uikit/panel', component: PanelsDemoComponent },
                    { path: 'uikit/overlay', component: OverlaysDemoComponent },
                    { path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule) },
                    { path: 'uikit/media', component: MediaDemoComponent },
                    { path: 'uikit/message', component: MessagesDemoComponent },
                    { path: 'uikit/misc', component: MiscDemoComponent },
                    { path: 'uikit/file', component: FileDemoComponent },
                    { path: 'rides', loadChildren: () => import('./demo/view/Rides/ride-main/ride-main.module').then(m => m.RideMainModule), canActivate: [AuthGuard] },
                    { path: 'promotions', loadChildren: () => import('./demo/view/Promotions/promotion-main/promotion-main.module').then(m => m.PromotionMainModule), canActivate: [AuthGuard] },
                    { path: 'vehicles', loadChildren: () => import('./demo/view/Vehicles/vehicle-main/vehicle-main.module').then(m => m.VehicleMainModule), canActivate: [AuthGuard] },
                    { path: 'transactions', loadChildren: () => import('./demo/view/Transaction/transaction-main/transaction-main.module').then(m => m.TransactionMainModule), canActivate: [AuthGuard] },
                    { path: 'customers', loadChildren: () => import('./demo/view/Customers/customer-main/customer-main.module').then(m => m.CustomerMainModule), canActivate: [AuthGuard] },
                    { path: 'iot', loadChildren: () => import('./demo/view/IOT/manage-iot-main/manage-iot-main.module').then(m => m.ManageIotMainModule), canActivate: [AuthGuard] },
                    { path: 'report-problems', loadChildren: () => import('./demo/view/ReportProblems/reportp-main/reportp-main.module').then(m => m.ReportProblemMainModule), canActivate: [AuthGuard] },
                    { path: 'wallet-packages', loadChildren: () => import('./demo/view/WalletPackages/walletp-main/walletp-main.module').then(m => m.WalletPackageMainModule), canActivate: [AuthGuard] },
                    { path: 'support-tickets', loadChildren: () => import('./demo/view/SupportTickets/supportt-main/supportt-main.module').then(m => m.SupportTicketMainModule), canActivate: [AuthGuard] },
                    { path: 'users', loadChildren: () => import('./demo/view/Users/user-main/user-main.module').then(m => m.UserMainModule), canActivate: [AuthGuard] },
                    { path: 'roles', loadChildren: () => import('./demo/view/Roles/role-main/role-main.module').then(m => m.RoleMainModule), canActivate: [AuthGuard] },
                    { path: 'special-offer', loadChildren: () => import('./demo/view/SpecialOffer/special-offer-main/special-offer-main.module').then(m => m.SpecialOfferMainModule), canActivate: [AuthGuard] },
                    { path: 'stats-report/:type', loadChildren: () => import('./demo/view/StatsReport/statsr.module').then(m => m.StatsReportModule), canActivate: [AuthGuard] },
                    { path: 'zones', loadChildren: () => import('./demo/view/Zone/zone-main/zone-main.module').then(m => m.ZoneMainModule), canActivate: [AuthGuard] },
                    { path: 'notifications', loadChildren: () => import('./demo/view/Notifications/noti-main/noti-main.module').then(m => m.NotificationMainModule), canActivate: [AuthGuard] },
                    { path: 'push-notifications', loadChildren: () => import('./demo/view/PushNotifications/pnoti-main/pnoti-main.module').then(m => m.PushNotificationMainModule), canActivate: [AuthGuard] },
                    { path: 'pendingCommand', loadChildren: () => import('./demo/view/PendingCommand/pending-command-main/pending-command-main.module').then(m => m.PendingCommandMainModule), canActivate: [AuthGuard] },
                    { path: 'user-track', loadChildren: () => import('./demo/view/UserTrack/usert-main/usert-main.module').then(m => m.UserTrackMainModule), canActivate: [AuthGuard] },
                    { path: 'maintenance', loadChildren: () => import('./demo/view/Maintenance/maintenance-main/maintenance-main.module').then(m => m.MaintenanceMainModule), canActivate: [AuthGuard] },
                    { path: 'currency', loadChildren: () => import('./demo/view/Currencies/currency-main/currency-main.module').then(m => m.CurrencyMainModule), canActivate: [AuthGuard] },
                    { path: 'city', loadChildren: () => import('./demo/view/Cities/city-main/city-main.module').then(m => m.CityMainModule), canActivate: [AuthGuard] },
                    { path: 'country', loadChildren: () => import('./demo/view/Countries/country-main/country-main.module').then(m => m.CountryMainModule), canActivate: [AuthGuard] },
                    { path: 'rent-request', loadChildren: () => import('./demo/view/VehicleRentRequests/rent-request-main/rent-request-main.module').then(m => m.RentRequestMainModule), canActivate: [AuthGuard] },
                    { path: 'ride-scrutiny-templates', loadChildren: () => import('./demo/view/ScrutinyTemplates/stemplate-main/stemplate-main.module').then(m => m.ScrutinyTemplateMainModule), canActivate: [AuthGuard] },
                    { path: 'map', loadChildren: () => import('./demo/view/Maps/map-main/map-main.module').then(m => m.MapMainModule), canActivate: [AuthGuard] },
                    { path: 'visit-place', loadChildren: () => import('./demo/view/VisitPlace/visit-place-main/visit-place-main.module').then(m => m.VisitPlaceMainModule), canActivate: [AuthGuard] },
                    { path: 'vehicle-company', loadChildren: () => import('./demo/view/VehicleCompanies/vcompany-main/vcompany-main.module').then(m => m.VehicleCompanyMainModule), canActivate: [AuthGuard] },
                    { path: 'vehicle-type', loadChildren: () => import('./demo/view/VehicleTypes/vtype-main/vtype-main.module').then(m => m.VehicleTypeMainModule), canActivate: [AuthGuard] },
                    { path: 'vehicle-head-count', loadChildren: () => import('./demo/view/VehicleHeadCount/vehicle-hc-main/vehicle-hc-main.module').then(m => m.VehicleHeadCountMainModule) },
                    { path: 'survey', loadChildren: () => import('./demo/view/CustomerSurvey/survey-main/survey-main.module').then(m => m.SurveyMainModule),canActivate: [AuthGuard] },
                    { path: 'logs', loadChildren: () => import('./demo/view/Logs/logs-main/logs-main.module').then(m => m.LogsMainModule),canActivate: [AuthGuard] },

                    { path: 'partner', loadChildren: () => import('./demo/view/Partners/partner-main/partner-main.module').then(m => m.PartnerMainModule),canActivate: [AuthGuard] },
                    { path: 'partner-revenue', loadChildren: () => import('./demo/view/PartnerRevenue/partner-revenue-main/partner-revenue-main.module').then(m => m.PartnerRevenueMainModule),canActivate: [AuthGuard] },
                    { path: 'booths', loadChildren: () => import('./demo/view/Booths/booth-main/booth-main.module').then(m => m.BoothMainModule),canActivate: [AuthGuard] },
                    { path: 'concierge-request', loadChildren: () => import('./demo/view/ConciergeRequest/request-main/request-main.module').then(m => m.RequestMainModule),canActivate: [AuthGuard] },
                    { path: 'concierge-package', loadChildren: () => import('./demo/view/ConciergePackage/package-main/package-main.module').then(m => m.PackageMainModule),canActivate: [AuthGuard] },
                    { path: 'customer-ride', loadChildren: () => import('./demo/view/CustomerRide/customer-ride-main/customer-ride-main.module').then(m => m.CustomerRideMainModule),canActivate: [AuthGuard] },
                    { path: 'customer-insurance', loadChildren: () => import('./demo/view/CustomerInsurance/customer-insurance-main/customer-insurance-main.module').then(m => m.CustomerInsuranceMainModule),canActivate: [AuthGuard] },
                
                ]
            },
            { path: 'login', loadChildren: () => import('./demo/view/Login/login-main/login-main.module').then(m => m.LoginMainModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
