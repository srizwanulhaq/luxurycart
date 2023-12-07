import { Component, OnInit } from '@angular/core';
import { DashboardRidesDataDao } from '../domain/Dao/Dashboard/DashboardDataDao';
import { SimpleZoneDao } from '../domain/Dao/ParkingZone/ParkingZonedao';
import { DashboardService } from '../service/dashboardService';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../../assets/demo/badges.scss'],
    styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .fc-header-toolbar {
                display: flex;
                flex-wrap: wrap;
            }
        }
    `],
    providers: [DashboardService, DatePipe],
})
export class DashboardDemoComponent implements OnInit {
    startDate: string = this.setDateFormat(new Date((new Date()).setHours(0, 0, 0, 0)))
    endDate: string = this.setDateFormat(new Date((new Date()).setHours(23, 59, 59, 59)))
    _startDate:Date;
    _endDate:Date;
    zones: SimpleZoneDao[]
    selectedZone: SimpleZoneDao
    ridesDetails: DashboardRidesDataDao;
    currentUserName:string;
    date: Date[] | undefined;
    rideDialog: boolean;
    loading: boolean = true;
    selectedFilter: number = 0
    graphs: Array<{ key: string, title: string, data: object }> = []
    showHeaders = localStorage.getItem("userName") == "golfoperator@spiders.sa"
    graphLabels: Array<string> = [
        "packageStats",
        "peakHourStats",
        "vehicleTypeStats",
        "zoneStats",
        "companyStats",
        "zoneRevenue"
    ]
    colors: Array<string> = [
        "#99ca3c", "#0c30dc", "#91A9A6", "#42A5F5", "#FFA726", "#EC407A"
    ]
    graphOpts = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${(typeof context.parsed != "object" ? `${context.label}: ` : "") + context.formattedValue + " Ride" + (context.formattedValue == 1 ? "" : "s")}`;
                    }
                }
            }
        }
    }
    selectedStep: number = 0
    isShow: boolean;
    currentRoleName:string;
    zoneCount:string;
    constructor(private rDetailService: DashboardService, private datepipe: DatePipe) {
        this.initialData();
        this.currentUserName = localStorage.getItem("userName");
        this.currentRoleName = localStorage.getItem("roleName");
        this.zoneCount =       localStorage.getItem("zoneCount");
    }

    ngOnInit() {
     
    }

    splitCapitalize(val: string) {
        const arr = val.split(/(?=[A-Z])/);
        return arr.map(wd => (wd.charAt(0).toUpperCase() + wd.slice(1))).join(" ")
    }

    initialData() {
        this.rDetailService.getAllZones()
            .then(res => {
                this.zones
                this.zones = res
                if (res.length > 0) {
                    this.zones.find(z => z.id == "1001")["id"] = ""
                    this.selectedZone = res[0]
                    this.loadData()
                }
            })
    }

    changeZone(e) {
        this.selectedZone = this.zones.find(zone => zone.id == e.value)
        setTimeout(() => {
            this.loadData()
        }, 500)
    }

    loadData() {
        this.loading = true;
        this.rDetailService.getRidesDashboardData(this.selectedFilter + 1, this.selectedZone.id, !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "")
            .then(res => {
                this.ridesDetails = res.data
                this.userStats()
                this.loading = false
            })
    }
    userStats(){
        if (this.ridesDetails.modeRevenue.length > 0) {
            for (const userStats of this.ridesDetails.modeRevenue) {
              const mode = userStats.mode;
              switch (mode) {
                case 'BONUS':
                  this.ridesDetails.bonus = userStats.amount;
                  break;
                case 'Bank Transfer':
                  this.ridesDetails.bank_Transfer = userStats.amount;
                  break;
                case 'POS':
                  this.ridesDetails.pos = userStats.amount;
                  break;
                case 'CASH':
                  this.ridesDetails.cash = userStats.amount;
                  break;
                case 'APPLE PAY':
                  this.ridesDetails.apple_Pay = userStats.amount;
                  break;
                default:
                  break;
              }
            }
            this.ridesDetails.total_wallet = ( (this.ridesDetails.pos != undefined ? this.ridesDetails.pos  :  0 )     +  (this.ridesDetails.bank_Transfer != undefined  ?  this.ridesDetails.bank_Transfer : 0 ) + (this.ridesDetails.cash != undefined ? this.ridesDetails.cash : 0 )  + ( this.ridesDetails.apple_Pay != undefined ? this.ridesDetails.apple_Pay : 0 )  )
          }
    }
    setGraph() {
        this.graphs = Object.entries(this.ridesDetails).filter(([key, value]: [string, any]) => this.graphLabels.indexOf(key) >= 0)
            .map(([key, value]: [string, object[]]) => {
                let valIndex = 1
                let labels = value.map(obj => Object.values(obj)[0])
                if (key == "companyStats") {
                    labels = value.map(obj => {
                        const temp = Object.values(obj)
                        return `${temp[0]} (${temp[1]})`
                    })
                    valIndex = 2
                }
                return ({
                    key,
                    title: this.splitCapitalize(key),
                    data: {
                        labels,
                        datasets: [{
                            label: "",
                            backgroundColor: value.map((_, i) => this.colors[i]),
                            data: value.map(obj => Object.values(obj)[valIndex])
                        }]
                    }
                }) 
            })
    }
    dashboardFilter(filter){
        
        this.changeFilter(filter);
    }
    changeFilter(e) {
        this.selectedFilter = e
        if (e == 0) {
            this.startDate = this.setDateFormat(new Date((new Date()).setHours(0, 0, 0, 0)))
            this.endDate = this.setDateFormat(new Date((new Date()).setHours(23, 59, 59, 59)))
            if(this.selectedStep === 1)
            this.loadGraph();
            else
             this.loadData() 
        } else if (e == 1) {
            this.startDate = this.setDateFormat(new Date(new Date((new Date()).setDate((new Date()).getDate() - 1)).setHours(0, 0, 0, 0)))
            this.endDate = this.setDateFormat(new Date(new Date((new Date()).setDate((new Date()).getDate() - 1)).setHours(23, 59, 59, 59)))
            if(this.selectedStep === 1)
            this.loadGraph();
            else
             this.loadData() 
        
        } else if (e == 2) {
            this.startDate = this.setDateFormat(new Date(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1).setHours(0, 0, 0, 0)))
            this.endDate = this.setDateFormat(new Date(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0).setHours(23, 59, 59, 59)))
            if(this.selectedStep === 1)
            this.loadGraph();
            else
             this.loadData() 
        }
        else if(e == 4){
            this.startDate = ""
            this.endDate = ""
            if(this.selectedStep === 1)
            this.loadGraph();
            else
             this.loadData() 
           
        }
       
    }
    changeStep(e){
        this.selectedStep = e.index;
        // if(this.currentUserName  == 'h1110.fc01@millenniumhotels.com'){
        //     if(this.selectedStep === 1){
        //         this.loadGraph();
        //         this.selectedStep = 2;
        //     }
        //      else if(this.selectedStep === 0 ){
        //         this.loadData();

        //      }
        // }
            if(this.selectedStep === 1)
            this.loadGraph();
            else {
            this.loadData();
            } 
    }
    loadGraph(){
        this.loading = true;
        this.rDetailService.getGraphData(this.selectedFilter + 1, this.selectedZone.id, !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "")
        .then(res => {
            this.ridesDetails = res.data
            this.setGraph()
            this.loading = false
        })
    }
    loadUserStats(){
        this.rDetailService.getUserData(this.selectedFilter + 1, this.selectedZone.id, !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "")
        .then(res => {
            this.ridesDetails = res.data
            this.userStats();
            this.loading = false
        })
    }


    setDateFormat(date: Date): string {
        return this.datepipe.transform(date, "yyyy-MM-dd HH:mm:00")
    }

    setVehicleRouteParams(status: string): object {
        const temp = this.ridesDetails.vehicleStatusEnum.find(obj => obj.title == status)
        return !!temp ? { status: temp.number } : undefined
    }

    setRouteParams(status: number): object {
        return { status, ...(!!this.startDate ? { startDate: this.startDate, endDate: this.endDate } : undefined) }
    }

    onDateChange(data) {
     this[`${data.type}Date`] = data.date   
    }
    openNew() {
        this.rideDialog = true;
      }
      previousWeekData(){
        this.isShow = !this.isShow; 
      }

      onDateSelect(date: Date, type: string) {
        this.selectedFilter = 0
        if(type == 'start')
        this.startDate = this.setDateFormat(new Date((new Date().getFullYear(),date).setHours(0, 0, 0, 0)))
        else
        this.endDate = this.setDateFormat(new Date((new Date().getFullYear(),date).setHours(23, 59, 59, 59)))
        
        if (!!this.startDate && type == 'end' ) {
            
            if(this.selectedStep == 1)
            this.loadGraph()
            else
            this.loadData();
        
      }
    }
    dashboardReset(){
        this.selectedFilter = 0
        this.startDate = this.setDateFormat(new Date((new Date()).setHours(0, 0, 0, 0)))
        this.endDate = this.setDateFormat(new Date((new Date()).setHours(23, 59, 59, 59)))
        this._startDate = new Date();
        this._endDate = new Date();

        if(this.selectedStep == 1)
        this.loadGraph()
        else{
        this.loadData();
      }
    }
}
