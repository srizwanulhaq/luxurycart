import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatsReportService } from '../../service/StatsReportService';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StatsModalComponent } from './statsr-modal.component';

type RangeType = { startDate: string; endDate: string } | { month?: number; year: number }

@Component({
    selector: 'app-statsr',
    templateUrl: './statsr.component.html',
    styleUrls: ['./statsr.component.scss'],
    providers: [DatePipe]
})

export class StatsReportComponent implements OnInit {
    type: "simple" | "quarterly"
    selectedTab = "ride"
    tabs: string[] = ["ride", "customer", "vehicle", "walletPackage", "zone", "transaction"]
    currentDate = new Date()
    month: number = this.currentDate.getMonth() + 1
    year: number = this.currentDate.getFullYear()
    dateRange: [Date, Date]
    showReportBtn = (): boolean => !!this.month && !!this.year && this.month <= (new Date()).getMonth() + 1 && this.year <= (new Date()).getFullYear()
    reports: object = {}
    loading: boolean = true
    range: RangeType | ""
    graphTypes: object = {
        sellingPackage: { type: "column", x: "Package Name", y: "Purchase Count" },
        revenuePackage: { type: "column", x: "Package Name", y: "Revenue (in SAR)" },
        purchaseRate: { type: "pie", x: "Package Name", y: "Revenue (in SAR)", suffix: "%" },
        ridesRating: { type: "column", x: "Rating", y: "No Of Rides" },
        mostRevenuePackageRate: { type: "pie", x: "Package Name", y: "Revenue (in SAR)", suffix: "%" },
        companyRevenue: { type: "bar", x: "Scooter Company", y: "Revenue (in SAR)" },
        platform: { type: "column", x: "Platform", y: "No Of Rides" },
        platformCompany: { type: "stackedBar", x: "Scooter Company", y: "No Of Rides", by: "platform", name: true },
        platformCustomers: { type: "column" },
        mostRevenuePackageQuarterly: { type: "column" },
        totalPurchasedPackageQuarterly: { type: "column" },
        quarterlyWalletRevenue: { type: "column" },
        quarterlyRideRevenue: { type: "column" },
        packagePurchase: { type: "column" },
        packageRevenue: { type: "column" },
        zoneRevenue: { type: "column" },
        walletRevenueSummary: { type: "column" },
        zoneRidePlatform: { type: "line", x: "Zone Name", y: "No Of Rides" },
        zoneTopUpBurned: { type: "line", x: "Zone Name", y: "Topup Amount" },
        zoneTopUpRatio: { type: "pie", x: "Zone Name", y: "Topup Percent", suffix: "%" },
        transactionAmount: { type: "column", x: "Transaction Mode", y: "Amount (in SAR)" },
        transactionCount: { type: "column", x: "Transaction Mode", y: "Transaction Count" },
        transactionPercent: { type: "pie", x: "Transaction Mode", y: "Transaction Percent", suffix: "%" },
    }
    display: boolean = false
    stats: string[] = [
        "nonRatedRides",
        "ratedRides",
        "rideCount",
        "rideHoursCompleted",
        "customerCount",
        "avgVehicleCount",
        "quarterlyRideHours",
        "quarterlyRideCount",
        "customerSignUp",
        "activeVehicles",
        "activeZones",
        "rideCost",
        "zoneCount",
        "bonusRevenue",
        "customerTopUp",
        "debt",
        "totalTopUp",
        "walletRevenue",
        "adminTopUp",
        "activeScooterCount"
    ]
    tables = {
        vehicleRides: {
            columns: ["vehicleNumber", "vehicleCompany", "rideCount"]
        },
        vehicleTrips: {
            columns: ["vehicleNumber", "tripId", "rideDate", "lastRideDaysAgo"]
        },
        zoneAge: {
            columns: ["zoneTitle", "age"]
        }
    }
    seperateGraphs: Array<String> = [
        "walletRevenueSummary",
    ]

    months: Array<Object> = []

    years: Array<Object> = []

    ref: DynamicDialogRef

    constructor(private service: StatsReportService, public dialogService: DialogService, public datepipe: DatePipe, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            .map((m, k) => ({ label: m, value: k + 1 }))
        this.months.unshift({ label: "All", value: "" })
        let year = 2015
        do {
            this.years.push({ label: year, value: year })
            year++
        } while (year <= this.year)
        this.years.unshift({ label: "All", value: "" })
        this.route.params.subscribe(params => {
            this.type = params.type
            this.reports = {}
            this.range = { month: this.month, year: this.year }
            this.loadReport()
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    splitCapitalize(val: string | number) {
        const arr = val.toString().split(/(?=[A-Z])/);
        return arr.map(wd => (wd.charAt(0).toUpperCase() + wd.slice(1))).join(" ")
    }

    addSuffix = (e: any) => {
        const suffixes = ["", "K", "M", "B"];
        let order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
        if (order > suffixes.length - 1) order = suffixes.length - 1;
        return (e.value / Math.pow(1000, order) + suffixes[order]);
    }

    loadReport() {
        setTimeout(() => {
            this.loading = true;
            if (this.type != "simple") {
                delete this.range["months"]
            }
            const type = this.type[0].toUpperCase() + this.type.slice(1)
            this.service.getReports(this.selectedTab, this.type, this.range).then(reportResp => {
                if (reportResp.status) {
                    this.reports[this.selectedTab] = { stats: [], graphs: [], tables: [] }
                    Object.entries(reportResp.data).forEach(([key, value]: [string, any]) => {
                        if (this.stats.indexOf(key) >= 0) {
                            if (typeof value == "object") {
                                value = Object.values(value).map((v, k) => ({ title: `Q${k + 1}`, data: v }))
                            }
                            this.reports[this.selectedTab].stats.push({ title: this.splitCapitalize(key), data: value })
                        } else if ((Object.keys(this.graphTypes).indexOf(key) >= 0)) {
                            if (this.seperateGraphs.indexOf(key) >= 0) {
                                Object.values(value).forEach((subVal, index) => {
                                    this.reports[this.selectedTab].graphs.push(this.setGraph(`${key} -Q${index + 1}`, subVal))
                                })
                            } else {
                                this.reports[this.selectedTab].graphs.push(this.setGraph(key, value))
                            }
                        } else if (Object.keys(this.tables).indexOf(key) >= 0) {
                            this.reports[this.selectedTab].tables.push({
                                title: this.splitCapitalize(key),
                                columns: this.tables[key].columns,
                                data: value
                            })
                        }
                    })
                }
                if (!this.range.hasOwnProperty("startDate")) {
                    this.dateRange = undefined
                } else {
                    this.month = this.year = undefined
                }
            }).finally(() => {
                this.loading = false;
            })
        }, 500);
    }

    setGraph(mKey, data) {
        let isArray = Array.isArray(data)
        if (isArray && data.length > 0 && data.every((ar: any) => ar.hasOwnProperty("title"))) {
            data = data.reduce((obj, cV) => {
                const temp = cV["title"]
                delete cV.title
                obj[temp] = cV
                return obj
            }, {})
            isArray = false
        } else if (!!this.graphTypes[mKey].by) {
            const by = this.graphTypes[mKey].by
            const types = data.map(d => d[by]).filter((value, index, self) => self.indexOf(value) === index)
            data = types.reduce((obj, cV) => {
                obj[cV] = data.filter(i => i[by] == cV).map(i => {
                    delete i[by]
                    return i
                })
                return obj
            }, {})
            isArray = false
        }

        data = !isArray ? Object.entries(data).map(([key, value]) => {
            if (Array.isArray(value)) {
                value = value.reduce((obj, cV) => {
                    const temp: string[] = Object.values(cV)
                    obj[temp[0]] = temp[1]
                    return obj
                }, {})
            }
            return ({
                type: this.graphTypes[mKey].type,
                ...(!!this.graphTypes[mKey]?.name ? { name: key } : undefined),
                showInLegend: true,
                legendText: key,
                dataPoints: Object.entries(value).map(([subKey, subValue]) => (
                    { y: subValue, label: this.splitCapitalize(subKey) }
                ))
            })
        }) : [{
            type: this.graphTypes[mKey].type,
            dataPoints: data.map(obj => {
                let extra: object
                if (obj.hasOwnProperty("extra")) {
                    extra = obj.extra
                    delete obj.extra
                }
                const temp: Array<any> = Object.values(obj)
                if (temp.length > 2) {
                    temp[0] += ` (${temp[1]})`
                    temp[1] = temp[2]
                }
                return {
                    label: temp[0], y: temp[1], ...(!!extra ? {
                        click: (e) => {
                            this.ref = this.dialogService.open(StatsModalComponent, {
                                header: `Zone: ${e.dataPoint.label}`,
                                baseZIndex: 10000,
                                data: { extra }
                            })
                        }
                    } : undefined)
                }
            })
        }]
        return {
            title: {
                text: this.splitCapitalize(mKey),
                fontColor: "#495057",
                fontSize: 18,
                horizontalAlign: "left",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                padding: {
                    top: 5,
                    right: 0,
                    bottom: 10,
                    left: 0
                },
            },
            ...(!!this.graphTypes[mKey].name || !!this.graphTypes[mKey].suffix ? {
                toolTip: {
                    contentFormatter: (e) => {
                        const labeled = [!!this.graphTypes[mKey].name ? "dataSeries" : "dataPoint", !!this.graphTypes[mKey].name ? "name" : "label",]
                        return e.entries.map(entry => (`<span data-color="${entry.dataSeries._colorSet[0]}" style="color: ${entry.dataSeries._colorSet[0]};">${entry[labeled[0]][labeled[1]]}:</span> ${entry.dataPoint.y + (this.graphTypes[mKey].suffix || "")}`))
                    }
                }
            } : undefined),
            animationEnabled: true,
            axisX: {
                ...(!!this.graphTypes[mKey]?.x ? {
                    title: this.graphTypes[mKey]?.x,
                    titleFontColor: "#495057",
                    titleFontSize: 18,
                    titleFontWeight: "normal",
                    titleFontFamily: "sans-serif",
                } : undefined),
                interval: 1,
                labelAngle: -70
            },
            axisY: {
                ...(!!this.graphTypes[mKey]?.y ? {
                    title: this.graphTypes[mKey]?.y,
                    titleFontColor: "#495057",
                    titleFontSize: 18,
                    titleFontWeight: "normal",
                    titleFontFamily: "sans-serif",
                } : undefined),
                includeZero: true,
                labelFormatter: this.addSuffix,
                gridThickness: 0
            },
            legend: {
                cursor: "pointer",
                itemclick: (e: any) => {
                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    } else {
                        e.dataSeries.visible = true;
                    }
                    e.chart.render();
                }
            },
            dataPointWidth: 30,
            data
        }
    }

    changeRange(event, type = "") {
        let range: RangeType | ""
        if (!event.hasOwnProperty("value") && !this.dateRange.includes(null)) {
            range = {
                startDate: this.datepipe.transform(this.dateRange[0], "yyyy-MM-dd"),
                endDate: this.datepipe.transform(this.dateRange[1], "yyyy-MM-dd"),
            }
        } else if (event.hasOwnProperty("value") && ((type == "month" && !!this.year) || !!this.year)) {
            range = { year: this.year }
            if (this.type == "simple") {
                this.month = range["month"] = type == "month" ? event.value : this.month
            }
        } else if (!this.dateRange && (type != "month" || this.type == 'quarterly') && !this.year) {
            range = ""
        }
        if (range != undefined) {
            this.reports = {}
            this.range = range
            this.loadReport()
        }
    }

    changeTab(e) {
        this.selectedTab = this.tabs[e.index]
        if (!this.reports.hasOwnProperty(this.selectedTab)) {
            this.loadReport()
        }
    }

    resetRange() {
        this.month = this.currentDate.getMonth() + 1
        this.year = this.currentDate.getFullYear()
        this.range = this.type == 'simple' ? { month: this.month, year: this.year } : { year: this.year }
        this.loadReport()
        this.dateRange = undefined
    }

    setTableBodyData(data) {
        return (/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/).test(data) ? this.datepipe.transform(data, "medium") : data
    }

    generateReport() {
        setTimeout(() => {
            this.loading = true;
            if (this.type != "simple") {
                delete this.range["months"]
            }
            this.service.generateReport(this.month, this.year).then(resp => {
                if (resp.status) {
                    // Create a temporary anchor element
                    var link = document.createElement("a");
                    link.href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + resp.fileData;
                    link.download = "reprot.xlsx";
                    // Programmatically trigger the click event to initiate the download
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }).finally(() => {
                this.loading = false
            })
        }, 500);
    }
}
