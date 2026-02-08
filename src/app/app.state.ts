



export interface Item {
    id: number;
    cuid: string;
    name: string;
    description: string;
    type: string;
    folder_id: number;
    etl_time_stmp: Date;
    analysys_mail: string;
    load_period: string;
    business_repherant_name: string;      
    tag: string;     
    tags: Array<string>;
}


export interface AnafData{
    anaf_Type: string;
    anaf_Global: string;    
    Anaf_Num: string;     
    anaf_Name: string;
    anaf_Name_Short: string;
    anaf_sivug: string;
    anaf_sivug2: number;
    anaf_Type_Id: number;
    anaf_Global_Id: number;
 }

export interface factData{
    year :number;
    anaf_sivug : string;
    anaf_Name: string;
    anaf_Global: string;
    anaf_Name_Short: string;
    givun_group: string;
    id_givun_group: number;
    anaf_Type_Id : number;
    anaf_Global_Id :number; 
    godel_id  :number; 
    leom_id:number;
    gender_id:number;
    kv_gil_id:number;
    ifAcademicid:number;
    count_emp:number;
    tziunei_yetzug:number;
    tziun_shivioniut_sahar:number;
    average_salary:number;
    
}
export interface homeData{
    madad_group: string;	
    description: string;	
    gender: string;	
    value:number;	
    year:number;	
    madad_group_id:number;	
    description_id:number;	
    gender_id:number;
}

export interface homeSumData{
    IfAcademic: string;
    value:number;
    year:number;
    IfAcademic_id:number;
}
export interface homeSumAllData{
    value :number;
    year:number;
}

export interface academicPrcnt{
    anaf_Global: string;
    anaf_sivug: string;	
    anaf_Name: string;	
    anaf_Global_Id: number;	
    anaf_Type_Id: number;	
    anaf_Name_Short: string;	
    academic_prcnt_2020	: number;
    non_academic_2020: number;	
    year: number;
}
export interface FilterData{
    value :number;
    name : string;
    
}

export interface FilterStrData{
    value :string;
    name : string;
    
}

export interface DataByGivunGroup{
    value : number;
    givun: number;
    anaf_sivug: string;
    givunName: string;
    anaf_Name_Short: string;
    nameMdd: string;
}
export interface tag{
    type : string;
    value : FilterData;
    
}

export interface datareport2{
    value :number;
    name : string;
    
}

export interface chartData{
    data : Array<factData>;
    name : string;
    chart : object;
    
}
export interface CountEmpSum{
    godel : string;	
    kv_gil: string;	
    year: number;	
    IfAcademic: string;		
    anaf_type: string;		
    count_emp: number;	
    anaf_sivug: string;	
    anaf_Type_Id: number;	
    anaf_Global_Id: number;	
    anaf_Global: string;	
    anaf_Name: string;		
    anaf_Name_Short: string;	
    godel_id: number;	
    kv_gil_id: number;
    IfAcademic_id: number;    
}

export class AppState {
    factAllData:Array<factData>;
    factAll:Array<factData>;
    factFilterData:any;
    yearFilterData:Array<FilterData>;
    academicFilterData:Array<FilterData>;
    anafGlobalFilterData:Array<FilterData>;
    ganderFilterData:Array<FilterData>;
    gilFilterData:Array<FilterData>;
    godelFilterData:Array<FilterData>;
    leomFilterData:Array<FilterData>;
    mddFilterData:Array<any>;
    sektorFilterData:Array<FilterData>;
    anafFilterData:Array<FilterStrData>;    
    givunGroupFilterData:Array<FilterData>;
    grafData: chartData;
    grafData2: chartData;
    grafData3: chartData;
    grafData4: chartData;
    grafData5: chartData;
    grafData6: chartData;
    pieChartNoAcademi1: object;
    pieChartNoAcademi2: object;
    pieChartNoAcademi3: object;
    pieChartNoAcademi4: object;
    pieChartNoAcademi5: object;
    pieChartAcademi1: object;
    pieChartAcademi2: object;
    pieChartAcademi3: object;
    pieChartAcademi4: object;
    pieChartAcademi5: object;
    catalogDataSearch: Array<Item>;
    catalogData: Array<Item>;
    selectgil: FilterData;
    selectgodel: FilterData;
    selectleom: FilterData;
    selectanafGlobal: FilterData;
    selectanaf: FilterStrData;
    selectgivunGroup: FilterData;
    selectacademic: FilterData;
    selectyear: FilterData;
    selectmdd: any;
    selectsektor: FilterData;
    selectgander: FilterData;
    homePageData:Array<homeData>;
    homePageSumData:Array<homeSumData>;
    BoUrl: string;
    filterStr: string;
    tags: Array<tag>;
    disableGander: boolean;
    disableGil: boolean;
    homePageSumAllData: Array<homeSumAllData>;
    isReady :boolean;
    academicPrcnt: Array<academicPrcnt>;
    givunGroupData0: Array<DataByGivunGroup>;
    givunGroupData1: Array<DataByGivunGroup>;
    givunGroupData2: Array<DataByGivunGroup>;
    givunGroupData3: Array<DataByGivunGroup>;
    countEmpSum :Array<CountEmpSum>;
    countEmpSumData:Array<CountEmpSum>;
    tokenCaptcha: string;
  }



export class AppStateError {
    factAllData: string;
    catalogData: string;
}
