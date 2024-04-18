import { BrowserModule, Title, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashbordComponent } from './layout/dashbord/dashbord.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { HttpModule } from '@angular/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { LoginService } from './shared/services/loginService';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CreateNbsComponent } from './layout/create-nbs/create-nbs.component';
import { NbsStatusComponent } from './layout/nbs-status/nbs-status.component';
import { CreateNBSService } from './shared/services/createNBSService';
import { OpcoStatusComponent } from './layout/admin/opco-status/opco-status.component';
import { EmployeeStatusComponent } from './layout/admin/employee-status/employee-status.component';
import { EmployeeStatusService } from './layout/admin/employee-status/service/EmployeeStatusService';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { CommonService } from './shared/services/CommonService';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OnlyNumber } from './shared/Validations/OnlyNumber';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NbsStatusService } from './layout/nbs-status/service/NbsStatusService';
import { OdscAnchorComponent } from './layout/odsc-anchor/odsc-anchor.component';
import { OdscSharingComponent } from './layout/odsc-sharing/odsc-sharing.component';
import { OdcSmartSplitSharingComponent } from './layout/odc-smart-split-sharing/odc-smart-split-sharing.component';
import { CowComponent } from './layout/cow/cow.component';
import { MassiveMimoSharingComponent } from './layout/massive-mimo-sharing/massive-mimo-sharing.component';
import { NbsSharingComponent } from './layout/nbs-sharing/nbs-sharing.component';
import { NbsComponent } from './layout/nbs/nbs.component';
import { OnlyAlphanumeric } from './shared/Validations/OnlyAlphanumeric';
import { OnlyNumberWithDecimal } from './shared/Validations/OnlyNumberWithDecimal';
import { OnlyAlphanumericWithDecimalAndHyphen } from './shared/Validations/OnlyAlphanumericWithDecimalAndHyphen';
import { DatePipe } from '@angular/common';
import { CowSharingComponent } from './layout/cow-sharing/cow-sharing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewTenencyComponent } from './layout/new-tenency/new-tenency.component';
import { SiteUpgradeComponent } from './layout/site-upgrade/site-upgrade.component';
import { IWanComponent } from './layout/i-wan/i-wan.component';
import { HpscComponent } from './layout/hpsc/hpsc.component';
import { McuComponent } from './layout/mcu/mcu.component';
import { UbrComponent } from './layout/ubr/ubr.component';
import { FibreTerminationComponent } from './layout/fibre-termination/fibre-termination.component';
import { TclRedwinComponent } from './layout/tcl-redwin/tcl-redwin.component';
import { HexOltComponent } from './layout/hex-olt/hex-olt.component';
import { ForthSectorAdditionComponent } from './layout/forth-sector-addition/forth-sector-addition.component';
import { ReportComponent } from './layout/report/report.component';
import { EmployeeComponent } from './layout/admin/employee/employee.component';
import { LengthValidater } from './shared/Validations/LengthValidater';
import { BulkUploadComponent } from './layout/bulk-upload/bulk-upload.component';
import { ComplainComponent } from './layout/complain/complain.component';
import { SmartSplitComponent } from './layout/smart-split/smart-split.component';
import { TcuComponent } from './layout/tcu/tcu.component';
import { AirtelStatusComponent } from './layout/airtel-status/airtel-status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashbordComponent,
    CreateNbsComponent,
    NbsStatusComponent,
    OpcoStatusComponent,
    EmployeeStatusComponent,
    OnlyNumber,
    OnlyAlphanumeric,
    OnlyNumberWithDecimal,
    OnlyAlphanumericWithDecimalAndHyphen,
    LengthValidater,
    NbsSharingComponent,
    OdscAnchorComponent,
    OdscSharingComponent,
    OdcSmartSplitSharingComponent,
    CowComponent,
    MassiveMimoSharingComponent,
    NbsComponent,
    CowSharingComponent,
    PageNotFoundComponent,
    NewTenencyComponent,
    SiteUpgradeComponent,
    IWanComponent,
    HpscComponent,
    McuComponent,
    UbrComponent,
    FibreTerminationComponent,
    TclRedwinComponent,
    HexOltComponent,
    ForthSectorAdditionComponent,
    ReportComponent,
    EmployeeComponent,
    BulkUploadComponent,
    ComplainComponent,
    SmartSplitComponent,
    TcuComponent,
    AirtelStatusComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    Ng2SmartTableModule,
    NgMultiSelectDropDownModule.forRoot(),
    AutocompleteLibModule
  ],
  providers: [AuthGuard,Title,CommonService,NbsStatusService,
    LoginService,CreateNBSService,DatePipe,
    EmployeeStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
