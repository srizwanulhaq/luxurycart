import { Injectable } from "@angular/core";
import { Children } from "preact/compat";

@Injectable({
    providedIn: 'root'
})

export class MenuSidebarService {
    menus: any[] =
        [
            { label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/'] },
            { label: 'Rides', icon: 'fa fa-motorcycle', routerLink: ['/rides/ride-main'] },
            { label: 'Vehicles', icon: 'fa fa-taxi', routerLink: ['/vehicles/vehicle-main'] },
            { label: 'Manage IoT', icon: 'fa fa-list', routerLink: ['/iot/manage-iot-main'] },
            { label: 'Zones', icon: 'pi pi-map', routerLink: ['/zones/zone-main'] },
            { label: 'Customers', icon: 'fa fa-users', routerLink: ['customers/customer-main'] },
            { label: 'Transactions', icon: 'pi pi-wallet', routerLink: ['transactions/transaction-main'] },
            { label: 'Vehicle Types', icon: 'pi pi-sitemap', routerLink: ['/vehicle-type/vehicle-type-main'] },
            { label: 'Projects', icon: 'pi pi-sitemap', routerLink: ['/projects/projects-main'] },
            { label: 'Ticket Type', icon: 'pi pi-ticket', routerLink: ['/ticket-type/ticket-type-main'] },
            { label: 'LC Tour Packages', icon: 'fa fa-gift', routerLink: ['/lc-tour-package/lc-tour-package-main'] },
            { label: 'Maps', icon: 'pi pi-sitemap', routerLink: ['/map/map-main'] },
            { label: 'Roles', icon: 'pi pi-fw pi-eye', routerLink: ['/roles/role-main'] },
            { label: 'Users', icon: 'fa fa-users', routerLink: ['/users/user-main'] },
            { label: 'User Track', icon: 'pi pi-user-plus', routerLink: ['/user-track/user-track-main'] },
            { label: 'Visit Place', icon: 'pi pi-sitemap', routerLink: ['/visit-place/visit-place-main'] },
            {
                label: 'Stats Report', icon: 'pi pi-chart-line',
                items: [
                    {
                        label: 'Simple',
                        icon: 'pi pi-chart-pie', routerLink: ['/stats-report/simple']
                    },
                    {
                        label: 'Quarterly',
                        icon: 'pi pi-chart-line', routerLink: ['/stats-report/quarterly']
                    },
                ]
            },
           // { label: 'Rent Request', icon: 'fa fa-taxi', routerLink: ['/rent-request/rent-request-main'] },
            { label: 'Wallet Packages', icon: 'fa fa-gift', routerLink: ['/wallet-packages/wallet-package-main'] },
            { label: 'Promotions', icon: 'fa fa-ticket', routerLink: ['/promotions/promotion-main'] },
            { label: 'Special Offers', icon: 'fa fa-gift', routerLink: ['/special-offer/special-offer-main'] },
            { label: 'Reported Problem', icon: 'fa fa-address-book', routerLink: ['/report-problems/report-problem-main'] },
            { label: 'Maintenance', icon: 'pi pi-cog', routerLink: ['/maintenance/maintenance-main'] },
           
            { label: 'Push Notification', icon: 'pi pi-send', routerLink: ['/push-notifications/push-notification-main'] },
            { label: 'Pending Commands', icon: 'pi pi-sort-alt-slash', routerLink: ['/pendingCommand/pending-command-main'] },
            // { label: 'Projects', icon: 'pi pi-sitemap', routerLink: ['/projects/projects-main'] },
            {
                label: 'Tours', icon: 'pi pi-chart-line',
                items: [
                    {
                        label: 'Tour Slots',
                        icon: 'pi pi-chart-line', routerLink: ['/tour-slots/tour-slots-main']
                    },
                    {
                        
                        label: 'Tour Points',
                        icon: 'pi pi-chart-line', routerLink: ['/tour-points/tour-points-main']
                    },
                    {
                        label: 'Tour Packages',
                        icon: 'pi pi-chart-line', routerLink: ['/tour-packages/tour-packages-main']
                    },
                    {
                        label: 'Tour Point Slots',
                        icon: 'pi pi-chart-line', routerLink: ['/points-slots/point-slots-main']
                    },
                    {
                        label: 'Tour Customer Purchase',
                        icon: 'pi pi-money-bill', routerLink: ['/tour-customer-purchase/tour-customer-purchase-main']
                    },
                  
                ]
            },
            { label: 'Country', icon: 'pi pi-flag-fill', routerLink: ['/country/country-main'] },
            { label: 'City', icon: 'pi pi-sitemap', routerLink: ['/city/city-main'] },
            { label: 'Currency', icon: 'pi pi-money-bill', routerLink: ['/currency/currency-main'] },
            { label: 'Vehicle Companies', icon: 'pi pi-sitemap', routerLink: ['/vehicle-company/vehicle-company-main'] },
            { label: 'Ride Scrutiny Templates', icon: 'pi pi-sitemap', routerLink: ['/ride-scrutiny-templates/ride-scrutiny-templates-main'] },
          
            { label: 'Vehicle Head Count', icon: 'pi pi-sitemap', routerLink: ['/vehicle-head-count'] },
            // { label: 'Hajj Survey', icon: 'pi pi-sitemap', routerLink: ['/survey/survey-main'] },
            // { label: 'Logs', icon: 'pi pi-sitemap', routerLink: ['/logs/logs-main'] },
       
           
            // {
            //     label: 'Partners', icon: 'pi pi-chart-line',
            //     items: [
            //         {
            //             label: 'Partner  List',
            //             icon: 'pi pi-chart-pie', routerLink: ['/partner/partner-main']
            //         },
            //         {
            //             label: 'Revenue',
            //             icon: 'pi pi-chart-line', routerLink: ['/partner-revenue/partner-revenue-main']
            //         },
            //     ]
            // },
            // { label: 'Booths', icon: 'pi pi-sitemap', routerLink: ['/booths/booth-main'] },
            // { label: 'Concierge Request', icon: 'pi pi-clone', routerLink: ['/concierge-request/concierge-request-main'] },
            // { label: 'Concierge Package', icon: 'pi pi-sitemap', routerLink: ['/concierge-package/concierge-package-main'] },
            // { label: 'Event', icon: 'pi pi-calendar-plus', routerLink: ['/event/event-main'] },
            // { label: 'Event Ticket Type', icon: 'pi pi-ticket', routerLink: ['/event-ticket-type/event-ticket-type-main'] },
            // //{ label: 'Event Ticket', icon: 'pi pi-ticket', routerLink: ['/eventTicket/eventTicket-main'] },
            // { label: 'Game', icon: 'pi pi-discord', routerLink: ['/game/game-main'] },
            // { label: 'Customer Ride', icon: 'fa fa-motorcycle', routerLink: ['/customer-ride/customer-ride-main'] },
            // { label: 'Customer Insurance', icon: 'fa fa-heart', routerLink: ['/customer-insurance/customer-insurance-main'] },
       
             
        ]
}
