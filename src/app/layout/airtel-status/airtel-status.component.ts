import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/shared/constant/Constant';
import { AirtelServices } from 'src/app/shared/services/AirtelServices';
import { DatePipe } from '@angular/common';
declare var $;

@Component({
  selector: 'app-airtel-status',
  templateUrl: './airtel-status.component.html',
  styleUrls: ['./airtel-status.component.css']
})
export class AirtelStatusComponent implements OnInit {

  filterSrNumber = "";
  airtelDetailsList = [];
  btsCabinetList = [];
  rruCabinetList = [];
  radioAntennaList = [];
  mwAntennaList = [];
  bscRncCabinetList = [];
  otherNodeList = [];
  mwIduList = [];
  mcbData = {};
  mcbList = [];
  fibreNodeList = [];
  remark = "";
  TOCO_Site_Id = "";
  Date_of_Proposal = "";
  Power_Rating = "";
  Site_Electrification_Distance = "";
  Tentative_EB_Availibility = "";
  Additional_Charge = "";
  Address1 = "";
  Head_Load_Charge = "";
  Electrification_Cost = "";
  Electrification_Line_Distance = "";
  Electricity_Connection_HT_LT = "";
  Infra_Details = "";
  Site_Classification = "";
  Expected_Rent_to_Landlord = "";
  Non_Refundable_Deposit = "";
  Estimated_Deployment_Time__in_days_ = "";
  Additional_Capex = "";
  Standard_Rates = "";
  Fiber_Charges = "";
  Rental_Threshold = "";
  Excess_Rent_beyond_Threshold = "";
  Tentative_Rental_Premium = "";
  Additional_Rent = "";
  IPFee = "";
  Field_Operation_Charges = "";
  Security_Guard_Charges = "";
  Mobilization_Charges = "";
  Erection_Charges = "";
  Battery_backup_Hrs = "";
  Land_Lord_Charges_or_Rent_Charges = "";
  Wind_Speed = "";
  TowerHeight = "";
  Recommended_Product_Type_by_Acquisition = "";
  Agl = "";
  Distance_from_P1_Lat_Long_in_meter = "";
  Rejection_Remarks = "";
  Difficult = "";
  PROPOSED = "Proposed";
  feasibilityArr = ["Yes","No","Proposed"];
 
  Tower_Completion = "";
  Shelter_Equipment_RoomReady = "";
  AirConditioner_Commissioned = "";
  DG_Commissioned = "";
  Acceptance_Testing_Of_Site_Infrastructure_Completed_Status = "";
  EB_Status = "";
  Created_By = "";
  OFC_Duct_Laying_Done = "";
  Access_To_Site_Available_Status = "";
  Engineer_Name = "";
  Engineer_Phone_Number = "";
  Notice_Form_Generation_Date = "";
  rfiDate = "";
  rfsDate = "";
  viewBTS : boolean = false;
  viewRRU : boolean = false;
  viewRadioAntenna : boolean = false;
  viewMwAntenna : boolean = false;
  viewBscRncCabinet : boolean = false;
  viewOtherNode : boolean = false;
  viewMwIdu : boolean = false;
  viewMCB : boolean = false;
  viewFibreNode : boolean = false;
  isActionPending : boolean = false;
  btsLocationList = ["Outdoor", "ID – Wall Mounted", "ID – Transmission Rack", "ID – Cable Tray", "ID – On BTS Top", 
  "ID – Existing BTS", "OD – Existing BTS", "OD – Transmission Rack", "On Floor", "Indoor", "Tower Top", "Tower Leg", 
  "Tower Base", "Tower middle", "Operator Transmission Rack"];
  btsMainUnit = ["Outdoor", "ID – Wall Mounted", "ID – Transmission Rack", "ID – Cable Tray", "ID – On BTS Top", 
  "ID – Existing BTS", "OD – Existing BTS", "OD – Transmission Rack", "On Floor", "Indoor", "Tower Top", "Tower Leg", 
  "Tower Base", "Tower middle", "Operator Transmission Rack"];
  btsType = ["Outdoor","Indoor","Towertop"];
  fibreNode_nodeLocationList = ["Indoor Floor space", "Indoor TOCO TX Rack", "Indoor Op-Co Tx Rack/Existing Equipment",
  "On Tower", "Outdoor Floor space", "Outdoor TOCO TX Rack", "Outdoor Op-Co Tx Rack/Existing Equipment"];
  typeOfFiberLaying = ["Over the Ground", "Under Ground", "Both"];
  typeOfFms = ["Rack Mounted", "Wall Mounted", "Not Applicable"];
  rruLocation = ["Indoor", "Tower Base", "Tower Top", "Tower Middle"];
  rruUnit = ["Indoor", "Tower Base", "Tower Top", "Tower Middle"];
  mwIduNodeLocation = ["Indoor TOCO TX Rack","On Tower"];

  currentDate = "";
  previousDate = "";
  loginEmpId = "";
  loginEmpRole = "";
  circleName = "";
  operator = "";
  isHoUser = "";
  constructor(private airtelService : AirtelServices, 
    private spinner: NgxSpinnerService,
    private toastr: ToastrService, private datePipe : DatePipe) { 
    this.loginEmpId = localStorage.getItem("empId");
    this.loginEmpRole = localStorage.getItem("empRole")
    this.circleName = localStorage.getItem("circleName");
    this.operator = localStorage.getItem("operator");
    this.isHoUser = localStorage.getItem("isHoUser");
  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    let curDate = new Date();
    curDate.setDate(curDate.getDate() - 3)
    this.previousDate = this.datePipe.transform(curDate,'yyyy-MM-dd');
    this.getAirtetDetails();
  }

  getAirtetDetails(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      circleName : this.circleName,
      operator : this.operator,
      isHoUser : this.isHoUser,
      filterSrNumber : this.filterSrNumber
    }
    this.spinner.show();
    this.airtelService.anyPostRequest('getAirtelDetails',jsonData)
    .subscribe(
      (response)=>{
        if(response.responseCode == Constant.SUCCESSFUL_RESPONSE){
          this.airtelDetailsList = response.wrappedList;
        }
        else if(response.responseCode == Constant.NO_RECORDS_FOUND_CODE){

        }
        else{

        }
        this.spinner.hide();
      },
      (error)=>{
        this.spinner.hide();
      }
    )
  }

  viewSrNumber = "";
  viewSpNumber = "";
  viewSoNumber = "";
  viewRfiDate = "";
  buttonList = [];
  currentStatus = "";
  tabName = "";
  airtelDataObj : any = {};
  srViewObj : any = {};
  viewAirtelSrDetails(srNumber){
    this.buttonList = [];
    this.viewBTS = false;
    this.viewRRU = false;
    this.viewRadioAntenna = false;
    this.viewMwAntenna = false;
    this.viewBscRncCabinet = false;
    this.viewOtherNode = false;
    this.viewMwIdu = false;
    this.viewMCB = false;
    this.viewFibreNode = false;
    this.isActionPending = false;
    this.Date_of_Proposal = this.currentDate
    this.rfiDate = this.currentDate;
    this.rfsDate = this.currentDate;
    this.remark = "";
    this.viewSrNumber = srNumber;
    this.airtelDataObj = this.airtelDetailsList.filter(x => x.srNumber == srNumber)[0];
    this.currentStatus = this.airtelDataObj.status;
    this.viewSpNumber = this.airtelDataObj.spNumber;
    this.viewSoNumber = this.airtelDataObj.soNumber;
    this.viewRfiDate = this.airtelDataObj.rfiDate;
    this.tabName = this.airtelDataObj.currentTab;
    let jsonData = {
      srNumber : this.viewSrNumber,
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      circleName : this.circleName,
      operator : this.operator,
      isHoUser : this.isHoUser,
      tabName : this.tabName,
      currentStatus : this.currentStatus
    }
    this.spinner.show();
    this.airtelService.anyPostRequest('viewAirtelSrDetails',jsonData)
    .subscribe(
      (response)=>{
        let wrappedList = response.wrappedList[0];
        this.srViewObj = wrappedList;
        //console.log(JSON.stringify(this.srViewObj));
        // this.Power_Rating = this.srViewObj.Total_Rated_Power_In_Watt;
        this.Power_Rating = this.srViewObj.Total_Rated_Power_In_KW;
        let buttonAfterStatus = wrappedList.buttonAfterStatus;
        if(buttonAfterStatus !=""){
          let splitList = buttonAfterStatus.split(",");
          let tempList = [];
          for(let i=0;i<splitList.length;i++){
            let actionObj = {
              button : splitList[i].split(":")[0],
              afterStatus : splitList[i].split(":")[1]
            }
            tempList.push(actionObj);
          }
          this.buttonList = tempList;
          this.isActionPending = true;
        }
        else{
          this.viewBTS = true;
          this.viewRRU = true;
          this.viewRadioAntenna = true;
          this.viewMwAntenna = true;
          this.viewBscRncCabinet = true;
          this.viewOtherNode = true;
          this.viewMwIdu = true;
          this.viewMCB = true;
          this.viewFibreNode = true;
          this.isActionPending = false;
        }
        
        this.btsCabinetList = wrappedList.BTS_Cabinet;
        this.rruCabinetList = wrappedList.RRU_Cabinet;
        this.radioAntennaList = wrappedList.Radio_Antenna;
        this.mwAntennaList = wrappedList.MW_Antenna;
        this.bscRncCabinetList = wrappedList.BSC_RNC_Cabinets;
        this.otherNodeList = wrappedList.Other_Node;
        this.mwIduList = wrappedList.MW_IDU;
        this.mcbList = wrappedList.MCB;
        this.mcbData = this.mcbList[0];
        this.fibreNodeList = wrappedList.Fibre_Node;

        this.spinner.hide();

        $("#viewAirtelSrModal").modal({
          backdrop : 'static',
          keyboard : false
        });

      },
      (error)=>{

      }
    )
  }

  validBtsList = [];
  validateBtsData() : any{
    this.validBtsList = [];
    for(let i=0;i<this.btsCabinetList.length;i++){
      let typeNo = this.btsCabinetList[i].typeNo;
      let feas = $("#btsFeas"+typeNo).val();
      if($("#btsFeas"+typeNo).val() == ''){
        alert("Please select `BTS feasibility` of "+typeNo);
        $("#btsFeas"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#btsMainUnit"+typeNo).val() == ''){
        alert("Please select `Main Unit incase of TT Split Version` of "+typeNo);
        $("#btsMainUnit"+typeNo).focus();
        return false;
      }
      else{
        let json = {
          typeNo : typeNo,
          Feasibility : $("#btsFeas"+typeNo).val(),
          NetWork_Type : $("#btsNetworkType"+typeNo).val(),
          BTS_Type : $("#btsType"+typeNo).val(),
          Band : $("#btsBand"+typeNo).val(),
          Manufacturer : $("#btsManufacturer"+typeNo).val(),
          Make_of_BTS : $("#btsMakeOfBts"+typeNo).val(),
          Length_Mtrs : $("#btsLengthMtrs"+typeNo).val(),
          Width_Mtrs : $("#btsWidthMtrs"+typeNo).val(),
          Height_Mtrs : $("#btsHeightMtrs"+typeNo).val(),
          BTS_Power_Rating_KW : $("#btsBtsPowerRaingKW"+typeNo).val(),
          BTS_Location : $("#btsLocation"+typeNo).val(),
          BTS_Voltage : $("#btsVoltage"+typeNo).val(),
          Main_Unit_incase_of_TT_Split_Version : $("#btsMainUnit"+typeNo).val(),
          Space_Occupied_in_Us_incase_of_TT_Split_Version : $("#btsSpaceOccupied"+typeNo).val(),
          Location_Of_RRU : $("#btsRruUnit"+typeNo).val(),
          No_of_RRU_Units_incase_of_TT_Split_Version : $("#btsNoOfRru"+typeNo).val(),
          Combined_wt_of_RRU_Unit_incase_of_TT_Split_Version : $("#btsCombinedWt"+typeNo).val(),
          AGL_of_RRU_unit_in_M : $("#btsAgl"+typeNo).val(),
          Weight_of_BTS_including_TMA_TMB_Kg : $("#btsWeight"+typeNo).val(),
          Billable_Weigtht : $("#btsBillingWeight"+typeNo).val()
        }
        this.validBtsList.push(json);
      }
    }
    return true;
  }

  validRruList = [];
  validateRruData() : any{
    this.validRruList = [];
    for(let i=0;i<this.rruCabinetList.length;i++){
      let typeNo = this.rruCabinetList[i].typeNo;
      let feas = $("#rruFeas"+typeNo).val();
      if($("#rruFeas"+typeNo).val() == ''){
        alert("Please select `RRU feasibility` of "+typeNo);
        $("#rruFeas"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#rruRruUnit"+typeNo).val() == ''){
        alert("Please select `RRU Location` of "+typeNo);
        $("#rruRruUnit"+typeNo).focus();
        return false;
      }
      else{
        let json = {
          typeNo : typeNo,
          Feasibility : $("#rruFeas"+typeNo).val(),
          NetWork_Type : $("#rruNetworkType"+typeNo).val(),
          BTS_Type : $("#rruType"+typeNo).val(),
          Band : $("#rruBand"+typeNo).val(),
          Manufacturer : $("#rruManufacturer"+typeNo).val(),
          Make_of_BTS : $("#rruMakeOfBts"+typeNo).val(),
          Length_Mtrs : $("#rruLengthMtrs"+typeNo).val(),
          Width_Mtrs : $("#rruWidthMtrs"+typeNo).val(),
          Height_Mtrs : $("#rruHeightMtrs"+typeNo).val(),
          BTS_Power_Rating_KW : $("#rruBtsPowerRaingKW"+typeNo).val(),
          BTS_Location : $("#rruLocation"+typeNo).val(),
          BTS_Voltage : $("#rruVoltage"+typeNo).val(),
          Main_Unit_incase_of_TT_Split_Version : $("#rruMainUnit"+typeNo).val(),
          Space_Occupied_in_Us_incase_of_TT_Split_Version : $("#rruSpaceOccupied"+typeNo).val(),
          Location_Of_RRU : $("#rruRruUnit"+typeNo).val(),
          No_of_RRU_Units_incase_of_TT_Split_Version : $("#rruNoOfRru"+typeNo).val(),
          Combined_wt_of_RRU_Unit_incase_of_TT_Split_Version : $("#rruCombinedWt"+typeNo).val(),
          AGL_of_RRU_unit_in_M : $("#rruAgl"+typeNo).val(),
          Weight_of_BTS_including_TMA_TMB_Kg : $("#rruWeight"+typeNo).val(),
          Billable_Weigtht : $("#rruBillingWeight"+typeNo).val()
        }
        this.validRruList.push(json);
      }
    }
    return true;
  }

  validRadioAntennaList = [];
  validateRadioAntennaData() : any{
    this.validRadioAntennaList = [];
    for(let i=0;i<this.radioAntennaList.length;i++){
      let typeNo = this.radioAntennaList[i].typeNo;
      let feas = $("#radioAntennaFeas"+typeNo).val();
      if($("#radioAntennaFeas"+typeNo).val() == ''){
        alert("Please select `Radio Antenna feasibility` of "+typeNo);
        $("#radioAntennaFeas"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#radAntHeightAgl"+typeNo).val() == ''){
        alert("Please select `Height AGL_m` of "+typeNo);
        $("#radAntHeightAgl"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#radAntAziDeg"+typeNo).val() == ''){
        alert("Please select `Azimuth Degree` of "+typeNo);
        $("#radAntAziDeg"+typeNo).focus();
        return false;
      }
      else{
        let json = {
          typeNo : typeNo,
          Feasibility : $("#radioAntennaFeas"+typeNo).val(),
          RadioAntenna_i_WAN : $("#radAntIwan"+typeNo).val(),
          Height_AGL_m : $("#radAntHeightAgl"+typeNo).val(),
          Azimuth_Degree : $("#radAntAziDeg"+typeNo).val(),
          Length_m : $("#radAntLenthM"+typeNo).val(),
          Width_m : $("#radAntWidthM"+typeNo).val(),
          Depth_m : $("#radAntDepthM"+typeNo).val(),
          No_of_Ports : $("#radAntNoOfPorts"+typeNo).val(),
          RadioAntenna_Type : $("#radAntType"+typeNo).val(),
          BandFrequencyMHz_FrequencyCombination : $("#radAntBandFreq"+typeNo).val()
        }
        this.validRadioAntennaList.push(json);
      }
    }
    return true;
  }

  validMwAntennaList = [];
  validateMwAntennaData() : any{
    this.validMwAntennaList = [];
    for(let i=0;i<this.mwAntennaList.length;i++){
      let typeNo = this.mwAntennaList[i].typeNo;
      let feas = $("#mwAntennaFeas"+typeNo);
      if($("#mwAntennaFeas"+typeNo).val() == ''){
        alert("Please select `MW Antenna feasibility` of "+typeNo);
        $("#mwAntennaFeas"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#mwH"+typeNo).val() == ''){
        alert("Please select `Height in Mtrs` of "+typeNo);
        $("#mwH"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#mwA"+typeNo).val() == ''){
        alert("Please select `Azimuth Degree` of "+typeNo);
        $("#mwA"+typeNo).focus();
        return false;
      }
      else{
        let json = {
          typeNo : typeNo,
          Feasibility : $("#mwAntennaFeas"+typeNo).val(),
          MWAntenna_i_WAN : $("#mwI"+typeNo).val(),
          Size_of_MW : $("#mwS"+typeNo).val(),
          Height_in_Mtrs : $("#mwH"+typeNo).val(),
          Azimuth_Degree : $("#mwA"+typeNo).val()
        }
        this.validMwAntennaList.push(json);
      }
    }
    return true;
  }

  validBscRncList = [];
  validateBscRncData() : any{
    this.validBscRncList = [];
    for(let i=0;i<this.bscRncCabinetList.length;i++){
      let typeNo = this.bscRncCabinetList[i].typeNo;
      if($("#bscRncFeas"+typeNo).val() == ''){
        alert("Please select `BSC RNC feasibility` of "+typeNo);
        $("#bscRncFeas"+typeNo).focus();
        return false;
      }
      else{
        let json = {
          typeNo : typeNo,
          Feasibility : $("#bscRncFeas"+typeNo).val(),
          NetWork_Type : $("#bscRncA"+typeNo).val(),
          BSC_RNC_Type : $("#bscRncB"+typeNo).val(),
          BSC_RNC_Manufacturer : $("#bscRncC"+typeNo).val(),
          BSC_RNC_Make : $("#bscRncD"+typeNo).val(),
          Length_Mtrs : $("#bscRncE"+typeNo).val(),
          Breadth_Mtrs : $("#bscRncF"+typeNo).val(),
          Height_AGL : $("#bscRncG"+typeNo).val(),
          BSC_RNC_Power_Rating : $("#bscRncH"+typeNo).val()
        }
        this.validBscRncList.push(json);
      }
    }
    return true;
  }
  validOtherNodeList = [];
  validateOtherNodeData() : any{
    this.validOtherNodeList = [];
    for(let i=0;i<this.otherNodeList.length;i++){
      let typeNo = this.otherNodeList[i].typeNo;
      if($("#otherNodeFeas"+typeNo).val() == ''){
        alert("Please select `Other node feasibility` of "+typeNo);
        $("#otherNodeFeas"+typeNo).focus();
        return false;
      }
      else{
        let json = {
          typeNo : typeNo,
          Feasibility : $("#otherNodeFeas"+typeNo).val(),
          Node_Type : $("#otherNodeA"+typeNo).val(),
          Node_Location : $("#otherNodeB"+typeNo).val(),
          Node_Manufacturer : $("#otherNodeC"+typeNo).val(),
          Node_Model : $("#otherNodeD"+typeNo).val(),
          Length_Mtrs : $("#otherNodeE"+typeNo).val(),
          Breadth_Mtrs : $("#otherNodeF"+typeNo).val(),
          Height_Mtrs : $("#otherNodeG"+typeNo).val(),
          Weight_Kg : $("#otherNodeH"+typeNo).val(),
          Node_Voltage : $("#otherNodeI"+typeNo).val(),
          Power_Rating_in_Kw : $("#otherNodeJ"+typeNo).val(),
          FullRack : $("#otherNodeK"+typeNo).val(),
          Tx_Rack_Space_Required_In_Us : $("#otherNodeL"+typeNo).val(),
          Remarks : $("#otherNodeM"+typeNo).val()
        }
        this.validOtherNodeList.push(json);
      }
    }
    return true;
  }

  validMwIduList = [];
  validateMwIduData() : any{
    this.validMwIduList = [];
    for(let i=0;i<this.mwIduList.length;i++){
      let typeNo = this.mwIduList[i].typeNo;
      let feas = $("#mwIduFeas"+typeNo).val();
      if($("#mwIduFeas"+typeNo).val() == ''){
        alert("Please select `MW IDU feasibility` of "+typeNo);
        $("#mwIduFeas"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#mwIduB"+typeNo).val() == ''){
        alert("Please select `Node Location` of "+typeNo);
        $("#mwIduB"+typeNo).focus();
        return false;
      }
      else{
        let json = {
          typeNo : typeNo,
          Feasibility : $("#mwIduFeas"+typeNo).val(),
          Node_Type : $("#mwIduA"+typeNo).val(),
          Node_Location : $("#mwIduB"+typeNo).val(),
          Node_Manufacturer : $("#mwIduC"+typeNo).val(),
          Node_Model : $("#mwIduD"+typeNo).val(),
          Length_Mtrs : $("#mwIduE"+typeNo).val(),
          Breadth_Mtrs : $("#mwIduF"+typeNo).val(),
          Height_Mtrs : $("#mwIduG"+typeNo).val(),
          Weight_Kg : $("#mwIduH"+typeNo).val(),
          Node_Voltage : $("#mwIduI"+typeNo).val(),
          Power_Rating_in_Kw : $("#mwIduJ"+typeNo).val(),
          FullRack : $("#mwIduK"+typeNo).val(),
          Tx_Rack_Space_Required_In_Us : $("#mwIduL"+typeNo).val(),
          Remarks : $("#mwIduM"+typeNo).val()
        }
        this.validMwIduList.push(json);
      }
    }
    return true;
  }
  
  validMcbList = [];
  validateMcbData() : any{
    this.validMcbList = [];
    let feas = $("#mcbFeas"+this.viewSrNumber).val();
    if($("#mcbFeas"+this.viewSrNumber).val() == ''){
      alert("Please select `MCB feasibility`");
      $("#mcbFeas"+this.viewSrNumber).focus();
      return false;
    }
    else if(feas == this.PROPOSED && $("#mcb6").val() == ''){
      alert("Please enter `06A` value");
      $("#mcb6").focus();
      return false;
    }
    else if(feas == this.PROPOSED && $("#mcb10").val() == ''){
      alert("Please enter `10A` value");
      $("#mcb10").focus();
      return false;
    }
    else if(feas == this.PROPOSED && $("#mcb16").val() == ''){
      alert("Please enter `16A` value");
      $("#mcb16").focus();
      return false;
    }
    else if(feas == this.PROPOSED && $("#mcb24").val() == ''){
      alert("Please enter `24A` value");
      $("#mcb24").focus();
      return false;
    }
    else if(feas == this.PROPOSED && $("#mcb32").val() == ''){
      alert("Please enter `32A` value");
      $("#mcb32").focus();
      return false;
    }
    else if(feas == this.PROPOSED && $("#mcb40").val() == ''){
      alert("Please enter `40A` value");
      $("#mcb40").focus();
      return false;
    }
    else if(feas == this.PROPOSED && $("#mcb63").val() == ''){
      alert("Please enter `63A` value");
      $("#mcb63").focus();
      return false;
    }
    else if(feas == this.PROPOSED && $("#mcb80").val() == ''){
      alert("Please enter `80A` value");
      $("#mcb80").focus();
      return false;
    }
    else{
      let json = {
        Feasibility : $("#mcbFeas"+this.viewSrNumber).val(),
        Total_No_of_MCB_Required : $("#mcbTotalNo").val(),
        _06A : $("#mcb6").val(),
        _10A : $("#mcb10").val(),
        _16A : $("#mcb16").val(),
        _24A : $("#mcb24").val(),
        _32A : $("#mcb32").val(),
        _40A : $("#mcb40").val(),
        _63A : $("#mcb63").val(),
        _80A : $("#mcb80").val()
      }
      this.validMcbList.push(json);
    }
    return true;
  }

  validFibreNodeList = [];
  validateFibreNodeData() : any{
    this.validFibreNodeList = [];
    for(let i=0;i<this.fibreNodeList.length;i++){
      let typeNo = this.fibreNodeList[i].typeNo;
      let feas = $("#fibreFeas"+typeNo).val();
      if($("#fibreFeas"+typeNo).val() == ''){
        alert("Please select `Fibre node feasibility` of "+typeNo);
        $("#fibreFeas"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#fibreNodeB"+typeNo).val() == ''){
        alert("Please select `Node Location` of "+typeNo);
        $("#fibreNodeB"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#fibreNodeM"+typeNo).val() == ''){
        alert("Please select `Is Right Of Way ROW Required Inside The TOCO Premises` of "+typeNo);
        $("#fibreNodeM"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#fibreNodeN"+typeNo).val() == ''){
        alert("Please select `Type Of Fiber Laying` of "+typeNo);
        $("#fibreNodeN"+typeNo).focus();
        return false;
      }
      else if(feas == this.PROPOSED && $("#fibreNodeO"+typeNo).val() == ''){
        alert("Please select `Type Of FMS` of "+typeNo);
        $("#fibreNodeO"+typeNo).focus();
        return false;
      }
      else{
        let json = {
          typeNo : typeNo,
          Feasibility : $("#fibreFeas"+typeNo).val(),
          Node_Type : $("#fibreNodeA"+typeNo).val(),
          Node_Location : $("#fibreNodeB"+typeNo).val(),
          Node_Manufacturer : $("#fibreNodeC"+typeNo).val(),
          Node_Model : $("#fibreNodeD"+typeNo).val(),
          Length_Mtrs : $("#fibreNodeE"+typeNo).val(),
          Breadth_Mtrs : $("#fibreNodeF"+typeNo).val(),
          Height_Mtrs : $("#fibreNodeG"+typeNo).val(),
          Weight_Kg : $("#fibreNodeH"+typeNo).val(),
          Node_Voltage : $("#fibreNodeI"+typeNo).val(),
          Power_Rating_in_Kw : $("#fibreNodeJ"+typeNo).val(),
          FullRack : $("#fibreNodeK"+typeNo).val(),
          Tx_Rack_Space_required_in_Us : $("#fibreNodeL"+typeNo).val(),
          Is_Right_Of_Way_ROW_Required_Inside_The_TOCO_Premises : $("#fibreNodeM"+typeNo).val(),
          Type_Of_Fiber_Laying : $("#fibreNodeN"+typeNo).val(),
          Type_Of_FMS : $("#fibreNodeO"+typeNo).val(),
          Remarks : $("#fibreNodeP"+typeNo).val(),
          Full_Rack : $("#fibreNodeQ"+typeNo).val()
        }
        this.validFibreNodeList.push(json);
      }
    }
    return true;
  }

  spValidateValidation() : any{
    return true;
  }

  changeAirtelSrStatus(afterStatus){
    if((this.tabName == "CreateNBS" && afterStatus == "NB08") ||  
    (this.tabName == "Site_Upgrade" && afterStatus == "NB02") || 
    (this.tabName == "New_Tenency" && afterStatus == "NB03")){
      if(!this.validateBtsData()){
        return;
      }
      else if(!this.validateRruData()){
        return;
      }
      else if(!this.validateRadioAntennaData()){
        return;
      }
      else if(!this.validateMwAntennaData()){
        return;
      }
      else if(!this.validateBscRncData()){
        return;
      }
      else if(!this.validateOtherNodeData()){
        return;
      }
      else if(!this.validateMwIduData()){
        return;
      }
      else if(!this.validateMcbData()){
        return;
      }
      else if(!this.validateFibreNodeData()){
        return;
      }
      else if($("#mcbTotalNo").val() > 50){
        alert("`Total No of MCB Required` should be not more than 50");
        return;
      }
    }
    else if((this.tabName == "CreateNBS" && afterStatus == "NB18") ||  
    (this.tabName == "Site_Upgrade" && afterStatus == "NB07") || 
    (this.tabName == "New_Tenency" && afterStatus == "NB09")){
      if(this.Tower_Completion == ""){
        alert("Please select Tower_Completion ");
        $("#rfai1").focus();
        return false;
      }
      else if(this.Shelter_Equipment_RoomReady == ""){
        alert("Please select Shelter_Equipment_RoomReady ");
        $("#rfai2").focus();
        return false;
      }
      else if(this.AirConditioner_Commissioned == ""){
        alert("Please select AirConditioner_Commissioned ");
        $("#rfai3").focus();
        return false;
      }
      else if(this.DG_Commissioned == ""){
        alert("Please select DG_Commissioned ");
        $("#rfai4").focus();
        return false;
      }
      else if(this.Acceptance_Testing_Of_Site_Infrastructure_Completed_Status == ""){
        alert("Please select Acceptance_Testing_Of_Site_Infrastructure_Completed_Status ");
        $("#rfai5").focus();
        return false;
      }
      else if(this.EB_Status == ""){
        alert("Please select EB_Status ");
        $("#rfai6").focus();
        return false;
      }
      else if(this.Created_By == ""){
        alert("Please select Created_By ");
        $("#rfai7").focus();
        return false;
      }
      else if(this.OFC_Duct_Laying_Done == ""){
        alert("Please select OFC_Duct_Laying_Done ");
        $("#rfai8").focus();
        return false;
      }
      else if(this.Access_To_Site_Available_Status == ""){
        alert("Please select Access_To_Site_Available_Status ");
        $("#rfai9").focus();
        return false;
      }
      else if(this.Engineer_Name == ""){
        alert("Please select Engineer_Name ");
        $("#rfai10").focus();
        return false;
      }
      else if(this.Engineer_Phone_Number == ""){
        alert("Please select Engineer_Phone_Number ");
        $("#rfai11").focus();
        return false;
      }
      else if(this.Notice_Form_Generation_Date == ""){
        alert("Please select Notice_Form_Generation_Date ");
        $("#rfai12").focus();
        return false;
      }
      else if(this.rfiDate == ""){
        alert("Please select RFI Date ");
        $("#rfai13").focus();
        return false;
      }
    }

    else if(this.tabName == "CreateNBS" && this.rfsDate == "" && afterStatus == "NB19"){
      alert("Please select RFS Date");
      return false;
    }

    else if(this.tabName == "New_Tenency" && this.rfsDate == "" && afterStatus == "NB10"){
      alert("Please select RFS Date");
      return false;
    }

    else if(this.tabName == "Site_Upgrade" && this.rfsDate == "" && afterStatus == "NB08"){
      alert("Please select RFS Date");
      return false;
    }

    this.TowerHeight = this.TowerHeight == "" ? "0" : this.TowerHeight;
    this.Agl = this.Agl == "" ? "0" : this.Agl;
    this.Distance_from_P1_Lat_Long_in_meter = this.Distance_from_P1_Lat_Long_in_meter == "" ? "0" : this.Distance_from_P1_Lat_Long_in_meter;
    this.Site_Electrification_Distance = this.Site_Electrification_Distance == "" ? "0" : this.Site_Electrification_Distance;
    this.Additional_Charge = this.Additional_Charge == "" ? "0" : this.Additional_Charge;
    this.Head_Load_Charge = this.Head_Load_Charge == "" ? "0" : this.Head_Load_Charge;
    this.Electrification_Line_Distance = this.Electrification_Line_Distance == "" ? "0" : this.Electrification_Line_Distance;
    this.Electrification_Cost = this.Electrification_Cost == "" ? "0" : this.Electrification_Cost;
    
  
    if(this.remark == ""){
      alert("Enter remark");
      return;
    }
    if(this.validRruList.length !=0){
      for(let i=0;i<this.validRruList.length;i++){
        let ob = this.validRruList[i];
        this.validBtsList.push(ob);
      }
    }
    if(this.validMwIduList.length !=0){
      for(let i=0;i<this.validMwIduList.length;i++){
        let ob = this.validMwIduList[i];
        this.validOtherNodeList.push(ob);
      }
      
    }
    let jsonData = {
      srNumber : this.viewSrNumber,
      currentStatus : this.currentStatus,
      afterStatus : afterStatus,
      remark : this.remark,
      validBtsList : this.validBtsList,
      validRadioAntennaList : this.validRadioAntennaList,
      validMwAntennaList : this.validMwAntennaList,
      validBscRncList : this.validBscRncList,
      validOtherNodeList : this.validOtherNodeList,
      validMcbList : this.validMcbList,
      validFibreNodeList : this.validFibreNodeList,
      tabName : this.tabName,
      TOCO_Site_Id : this.TOCO_Site_Id,
      Date_of_Proposal : this.Date_of_Proposal,
      Power_Rating : this.Power_Rating,
      Site_Electrification_Distance : this.Site_Electrification_Distance,
      Tentative_EB_Availibility : this.Tentative_EB_Availibility,
      Additional_Charge : this.Additional_Charge,
      Address1 : this.Address1,
      Head_Load_Charge : this.Head_Load_Charge,
      Electrification_Cost : this.Electrification_Cost,
      Electrification_Line_Distance : this.Electrification_Line_Distance,
      Electricity_Connection_HT_LT : this.Electricity_Connection_HT_LT,
      Infra_Details : this.Infra_Details,
      Site_Classification : this.Site_Classification,
      Expected_Rent_to_Landlord : this.Expected_Rent_to_Landlord,
      Non_Refundable_Deposit: this.Non_Refundable_Deposit,
      Estimated_Deployment_Time__in_days_: this.Estimated_Deployment_Time__in_days_,
      Additional_Capex: this.Additional_Capex,
      Standard_Rates: this.Standard_Rates,
      Fiber_Charges: this.Fiber_Charges,
      Rental_Threshold: this.Rental_Threshold,
      Excess_Rent_beyond_Threshold: this.Excess_Rent_beyond_Threshold,
      Tentative_Rental_Premium: this.Tentative_Rental_Premium,
      Additional_Rent: this.Additional_Rent,
      IPFee: this.IPFee,
      Field_Operation_Charges: this.Field_Operation_Charges,
      Security_Guard_Charges: this.Security_Guard_Charges,
      Mobilization_Charges: this.Mobilization_Charges,
      Erection_Charges: this.Erection_Charges,
      Battery_backup_Hrs: this.Battery_backup_Hrs,
      Land_Lord_Charges_or_Rent_Charges: this.Land_Lord_Charges_or_Rent_Charges,
      Wind_Speed: this.Wind_Speed,
      TowerHeight: this.TowerHeight,
      Recommended_Product_Type_by_Acquisition:this.Recommended_Product_Type_by_Acquisition,
      Agl: this.Agl,
      Distance_from_P1_Lat_Long_in_meter: this.Distance_from_P1_Lat_Long_in_meter,
      Rejection_Remarks : this.Rejection_Remarks,
      Difficult : this.Difficult,
      Tower_Completion : this.Tower_Completion,
      Shelter_Equipment_RoomReady : this.Shelter_Equipment_RoomReady,
      AirConditioner_Commissioned : this.AirConditioner_Commissioned,
      DG_Commissioned : this.DG_Commissioned,
      Acceptance_Testing_Of_Site_Infrastructure_Completed_Status : this.Acceptance_Testing_Of_Site_Infrastructure_Completed_Status,
      EB_Status : this.EB_Status,
      Created_By : this.Created_By,
      OFC_Duct_Laying_Done : this.OFC_Duct_Laying_Done,
      Access_To_Site_Available_Status : this.Access_To_Site_Available_Status,
      Engineer_Name : this.Engineer_Name,
      Engineer_Phone_Number : this.Engineer_Phone_Number,
      Notice_Form_Generation_Date : this.Notice_Form_Generation_Date,
      rfiDate : this.rfiDate,
      rfsDate: this.rfsDate
    }
    this.spinner.show();
    this.airtelService.anyPostRequest('changeAirtelSrStatus',jsonData)
    .subscribe(
      (response)=>{
        if(response.responseCode == Constant.SUCCESSFUL_RESPONSE){
          this.closeAnyModal('viewAirtelSrModal');
          $(".forMakeBlank").val("");
          this.getAirtetDetails();
          this.toastr.success(response.responseDesc,"Alert !");
        }
        else{
          this.toastr.warning(response.responseDesc,"Alert !");
        }
        
        this.spinner.hide();
      },
      (error)=>{
        this.spinner.hide()
      }
    )
  }

  closeAnyModal(modalName){
    $("#"+modalName).modal("hide");
  }

  changeFeasibility(evt,notEdit,edit,typeNo){
    let value = evt.target.value;
    if(value == "Proposed"){
      $("."+notEdit+typeNo).hide();
      $("."+edit+typeNo).show();
    }
    else{
      $("."+edit+typeNo).hide();
      $("."+notEdit+typeNo).show();
    }  
  }

  totalMcb(evt){
    let value = evt.target.value;
    // console.log(value)
    let mcb6 = parseInt($("#mcb6").val() == "" ? "0" : $("#mcb6").val());
    let mcb10 = parseInt($("#mcb10").val() == "" ? "0" : $("#mcb10").val());
    let mcb16 = parseInt($("#mcb16").val() == "" ? "0" : $("#mcb16").val());
    let mcb24 = parseInt($("#mcb24").val() == "" ? "0" : $("#mcb24").val());
    let mcb32 = parseInt($("#mcb32").val() == "" ? "0" : $("#mcb32").val());
    let mcb40 = parseInt($("#mcb40").val() == "" ? "0" : $("#mcb40").val());
    let mcb63 = parseInt($("#mcb63").val() == "" ? "0" : $("#mcb63").val());
    let mcb80 = parseInt($("#mcb80").val() == "" ? "0" : $("#mcb80").val());
    let curTotal = mcb6 + mcb10 + mcb16 + mcb24 + mcb32 + mcb40 + mcb63 + mcb80;
    if(curTotal > 50){
      alert("`Total No of MCB Required` should be not more than 50");
    }
    $("#mcbTotalNo").val(curTotal);
  }

}
