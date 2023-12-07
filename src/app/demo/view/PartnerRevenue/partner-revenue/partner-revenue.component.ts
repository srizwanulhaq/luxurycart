import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PartnerZonesDao } from 'src/app/demo/domain/Dao/Partmers/PartnerDropDowndao';
import { PartnerRevenueDto } from 'src/app/demo/domain/Dto/Partner Revenue/PartnerRevenueDto';
import { PartnerService } from 'src/app/demo/service/partner.service';
import * as FileSaver from 'file-saver';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-partner-revenue',
  templateUrl: './partner-revenue.component.html',
  styleUrls: ['./partner-revenue.component.scss'],
  providers:[DatePipe]
})
export class PartnerRevenueComponent implements OnInit {
  partnerNames:SelectItem[] = [];
  loadPartnerZones:PartnerZonesDao[] = [];
  partnerZones:SelectItem[] = [];
  setStartDate: Date;
  setEndDate: Date;
  startDate: string;
  endDate: string;
  zone_Id:any;
  partner_Id:any;
  partnerRevenue:PartnerRevenueDto;
  total:number;
  amountVat:number;
  partnerShare:number;
  partnerAmount:number;
  setPeriodStart:Date;
  setPeriodEnd:Date
  dropDownPeriods:any;
  currentDate = new Date();
  year: number = this.currentDate.getFullYear()
  years: Array<Object> = []
  selectedPeriod:number = 3;
  revenueData: any;
  basicOptions:any;
  periodName:string;
  showYears:boolean;
  selectedYear:number = this.year;

  constructor(private partnerService:PartnerService,
    private datepipe: DatePipe) { 
    }

  ngOnInit(): void {
    this.loadDropdown();
    this.setPeriods();
  }

  setPeriods(){
    this.dropDownPeriods = [
      { label:'Yearly',value:3 },
      { label:'Monthly',value:2},
      { label:'Weekly', value:1},
      { label:'Quarterly' ,value:4}
    ]
  }
  loadDropdown() {

    this.partnerService.loadDropdown().then(res => {
      this.partnerNames = res.lstPartnerNames;
      this.loadPartnerZones = res.lstPartnerZones;
    })
  }
  onSelect(e){
    this.partnerZones = this.loadPartnerZones.filter(p => p.partner_Id == e.value.value);
  }


  onSearch() {
    if (this.setEndDate && this.setStartDate) {
       this.startDate = this.setDateFormat(new Date((new Date().getFullYear(),this.setStartDate).setHours(0, 0, 0, 0)))
       this.endDate = this.setDateFormat(new Date((new Date().getFullYear(),this.setEndDate).setHours(23, 59, 59, 59)))
    } else {
     const currentDate = new Date();
      this.startDate = this.setDateFormat(new Date(new Date((new Date()).getFullYear(), currentDate.getMonth(), 1).setHours(0, 0, 0, 0)))
      this.endDate = this.setDateFormat(new Date(new Date((new Date()).getFullYear(), currentDate.getMonth() + 1, 0).setHours(23, 59, 59, 59)))
    }
    this.loadRevenue();
    }

    loadRevenue(){
      this.partnerService.getPartnerRevenue(
        this.partner_Id.value,
        this.zone_Id.value,
        this.selectedPeriod,
        this.selectedYear,
        this.startDate,
        this.endDate,
      ).subscribe(res => {
       this.partnerRevenue = res.data;
       this.total = this.partnerRevenue.total_Amount;
       this.amountVat = this.partnerRevenue.amount_VAT;
       this.partnerShare = this.partnerRevenue.partner_Share;
       this.partnerAmount = this.partnerRevenue.partner_Amount;
       if(this.setStartDate && this.setEndDate){
        this.setPeriodStart =  this.setStartDate 
        this.setPeriodEnd   = this.setEndDate;
       }
       else
       {
        this.setPeriodStart = new Date(this.startDate)
        this.setPeriodEnd = new Date(this.endDate); 
       }
       let formateStart = this.datepipe.transform(this.setPeriodStart, 'yyyy-MMMM-dd');
       let formateEnd = this.datepipe.transform(this.setPeriodEnd, 'yyyy-MMMM-dd');
       this.partnerRevenue.period = formateStart  + " " + formateEnd;
       this.loadGraph(this.selectedPeriod);
      })
    }

    changePeriod(period: Dropdown){
  
      if(period.selectedOption.value == 4){
          this.loadYears()
          this.showYears = true;
      }
      else  {
        this.years = [];
        this.showYears = false;
        this.selectedYear = 0;
      }
   
      this.periodName = period.selectedOption.label
      this.selectedPeriod = period.selectedOption.value; 
    }
    setDateFormat(date: Date): string {
      return this.datepipe.transform(date, "yyyy-MM-dd HH:mm:00")
  }
  loadYears(){
    let year = 2021
        do {
            this.years.push({ label: year, value: year })
            year++
        } while (year <= this.year)
  }
  changeYear(e){
      this.selectedYear  = e.value;
      this.startDate = " ";
      this.endDate = " ";
  }
 
  exportExcel(){
    if(this.partnerRevenue != null ){
      import("xlsx").then(xlsx => {
        const  exportData = [{
          Total:this.partnerRevenue.total_Amount,
          AmountVAT:this.partnerRevenue.amount_VAT,
          Share:this.partnerRevenue.partner_Share,
          Amount:this.partnerRevenue.partner_Amount,
          Period:this.partnerRevenue.period
        }];
        const worksheet = xlsx.utils.json_to_sheet(exportData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Partner Revenue");
    });
    }

  }
  loadGraph(period:number){
    let labels = [];
    let data = [];
    switch(period){
      case 1:
        this.partnerRevenue.lstWeeklyRevenue.forEach(function (m, index) {
          labels.push(m.year + " " + m.monthName + " Week " + " " + m.week );
          data.push(m.total)
        });
        break;
      case 2:
        this.partnerRevenue.lstMonthlyRevenue.forEach(function (m, index) {
          labels.push( m.year + " " + m.monthName );
          data.push(m.total)
        });
        break
      case 3:
        this.partnerRevenue.lstYearlyRevenue.forEach(function (y) {
         labels.push(y.year);
         data.push(y.total);
        });
        break
        case 4:
          const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
          for (let q = 0; q < 4; q++) {
            const quarterData = this.partnerRevenue.quarterlyRevenue['q' + (q + 1)];
            if (quarterData.length === 0) {
              labels.push(quarters[q]);
              data.push(0);
            } else {
              quarterData.forEach(function (qData) {
                labels.push(qData.name);
                data.push(qData.total);
              });
            }
          }
          break;
    }
    this.revenueData = {
      labels:labels,
      datasets: [
          {
              label: this.periodName,
              backgroundColor: '#42A5F5',
              data: data
          },
      ]
  };
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
  Reset(){
    this.revenueData = null;
    this.showYears = false;
    this.total = null;
    this.amountVat = null;
    this.partnerShare = null;
    this.partnerAmount = null;
    this.setPeriodStart = null;
    this.setPeriodEnd = null;
    this.setStartDate = null
    this.setEndDate = null
    this.partnerZones = [];

 
}
}
