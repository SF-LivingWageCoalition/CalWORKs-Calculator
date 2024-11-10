import React from "react";
import $ from "jquery";

let region = () =>{
    let countySelection = $("#county-selection").val();
    //just have to check for region 1; all the counties in region 2 are chosen by the other option in form selection
    let region1Bool = false;

    //list of all counties that are considered cities
    let region1Array = ["alameda", "contra costa", "los angeles", "marin", "monterey", "napa", "orange", "san diego", "san francisco"
        , "san luis obispo", "san mateo", "santa barbara", "santa clara", "santa cruz", "solano", "sonoma", "ventura"
    ]

    for(let i =0; i<region1Array.length; i++){
        if(countySelection===region1Array[i]){
            // console.log("I'm region 1");
            // console.log(region1Array[i]);
            region1Bool = true;
        }
        
    }

    return region1Bool;
}

//things to know. If a family member has SSI (Supplemental Security Income),CalWORKs does not
//count them as family. So you have to subtract the familyNumber by SSIFamilyNumber. So even if 
// a person is disabled, if they already have SSI, don't count them and it doesn't make the 
//family exempt (being exempt means they receive more aid). Only families where every adult
//member is disabled and receieve either SSI,HSS or SDI are considered exempt
let CalcuateMAPBenefits = () =>{
    
    let familyNumber = Number($("#family-num").val());
    let SSIFamilyNumber = Number($("#ssi-num").val());
    let disabilitesBoolean = $("#disability-query").val();
    let earnedIncome = Number($("#monthly-earned-income").val());
    let unearnedIncome = Number($("#monthly-unearned-income").val());
    let disabilitiesBenefit = Number($("#monthly-disabilities-benefit").val());
    let region1Bool = region();
    let finalFamilyNumber = Number(familyNumber - SSIFamilyNumber);


    let totalIncome = 0;
    let maxBenefit = 0;
    let region1MAPArray = [
        //row 0 is list of nonexempt MAP for region 1 [city counties]
        [734, 930, 1175, 1416, 1659, 1902, 2145, 2389, 2631, 2876],
        //row1 is list of exempt MAP for region 1 [urban counties]
        [809, 1039, 1314, 1579, 1850, 2123, 2395, 2669, 2939, 3215]
    ];

    let region2MAPArray = [
        //row 0 is list of nonexempt MAP for region 2
        [695, 884, 1115, 1346,  1578, 1808, 2039, 2271, 2501, 2731],
        //row1 is list of exempt MAP for region 2
        [770, 987, 1248, 1498, 1758, 2018,  2274, 2537, 2791, 3054]
    ];

    if(disabilitiesBenefit >= 600){
        totalIncome = (disabilitiesBenefit-600) + unearnedIncome + (earnedIncome/2);
        // console.log("Disabilities Benefit is more than or equal to 600: ", totalIncome);
    }
    else if(disabilitiesBenefit < 600){
        totalIncome = unearnedIncome + (earnedIncome - (600 - disabilitiesBenefit))/2;
        // console.log("Disabilities Benefit is less than 600: ", totalIncome);
    }
    if(totalIncome < 0){
        totalIncome = 0;
        // console.log("Disabilities Benefit is less than 600: ", totalIncome);
    }

    // console.log("Disabilities boolean: ", disabilitesBoolean);
    if(region1Bool === true){
        if(disabilitesBoolean === "true"){
            if(finalFamilyNumber>10){
                maxBenefit = region1MAPArray[1][10-1];
                // console.log("R1 Exempted MAP Benefit: ", maxBenefit);
            }
            else{
                maxBenefit = region1MAPArray[1][finalFamilyNumber-1];
                // console.log("R1 Exempted MAP Benefit: ", maxBenefit);
            }
            
        }
        else{
            if(finalFamilyNumber> 10){
                maxBenefit = region1MAPArray[0][10-1];
                // console.log("R1 NOT exempted MAP Benefit: ", maxBenefit);
            }
            else{
                maxBenefit = region1MAPArray[0][finalFamilyNumber-1];
                // console.log("R1 NOT exempted MAP Benefit: ", maxBenefit);
            }
      
        }
        
    }
    if(region1Bool === false){
        if(disabilitesBoolean === "true"){
            if(finalFamilyNumber>10){
                maxBenefit = region2MAPArray[1][10-1];
                // console.log("R2 Exempted MAP Benefit: ", maxBenefit);
            }else{
                maxBenefit = region2MAPArray[1][finalFamilyNumber-1];
                // console.log("R2 Exempted MAP Benefit: ", maxBenefit);
            }
        }
        else{
            if(finalFamilyNumber> 10){
                maxBenefit = region2MAPArray[0][10-1];
                // console.log("R2 NOT exempted MAP Benefit: ", maxBenefit);
            }
            else{
                maxBenefit = region2MAPArray[0][finalFamilyNumber-1];
                // console.log("R2 NOT exempted MAP Benefit: ", maxBenefit);
            }
            
        }
        
    }
    console.log(maxBenefit);
    console.log(totalIncome);
    let totalCashBenefit = maxBenefit - totalIncome;
    console.log("totalCashBenefit: ", totalCashBenefit)

    return totalCashBenefit;
}

export let MBSACEligibility = () =>{  
    let familyNumber = Number($("#family-num").val());
    let workingFamilyNumber = Number($("#working-family-num").val());
    let SSIFamilyNumber = Number($("#ssi-num").val());
    let earnedIncome = Number($("#monthly-earned-income").val());
    let unearnedIncome = Number($("#monthly-unearned-income").val());
    //region 1 are the city counties, they're all listed under the dropdown, the urban counties are
    // considered as the option other in the dropdown.
    let region1MBSAC = [894, 1467, 1817, 2156, 2460, 2768, 3041, 3310, 3591, 3898];
    let region2MBSAC = [848, 1392, 1725, 2050, 2345, 2633, 2885, 3151, 3405, 3707];
    let region1Bool = region();

    let totalIncome = Number((earnedIncome - (workingFamilyNumber * 450)) + unearnedIncome);
    if(totalIncome < 0 ){
        totalIncome = 0;
        
    }
    // console.log("total Income: ", totalIncome);

    let finalFamilyNumber = familyNumber - SSIFamilyNumber;
    let expandedMBSACLimit = 0;
    // console.log("Final Family Number: ", finalFamilyNumber);

    if(region1Bool === true){
        //if there are more than 10 family members, they receive a custom exanded MBSAC limit
        //which is adding $35 per extra family past 10
        if(finalFamilyNumber > 10){
            expandedMBSACLimit += region1MBSAC[10-1] + ((finalFamilyNumber -10) * 35);
            // console.log("expanded mbsac limit: ", expandedMBSACLimit);
            // console.log("eligibile: ", totalIncome<= expandedMBSACLimit);
            return totalIncome <= expandedMBSACLimit;
        }
        else if(totalIncome <= region1MBSAC[finalFamilyNumber - 1]){
            // console.log("mbsac amount: ", region1MBSAC[finalFamilyNumber - 1]);
            // console.log("eligibile: ", totalIncome<= region1MBSAC[finalFamilyNumber - 1]);
            return true;
        }
        else{
            return false;
        }
        
    }
    //if county is in region 2
    if(region1Bool === false){
        //if there are more than 10 family members, they receive a custom exanded MBSAC limit
        //which is adding $35 per extra family past 10
        if(finalFamilyNumber > 10){
            expandedMBSACLimit += region2MBSAC[10-1] + ((finalFamilyNumber - 10) * 35);
            // console.log("expanded mbsac limit: ", expandedMBSACLimit);
            // console.log("eligibile: ", totalIncome<= expandedMBSACLimit)
            return totalIncome <= expandedMBSACLimit;
        }
        else if(totalIncome <= region2MBSAC[finalFamilyNumber - 1]){
            // console.log("mbsac amount: ", region2MBSAC[finalFamilyNumber - 1]);
            // console.log("eligibile: ", totalIncome<= region2MBSAC[finalFamilyNumber - 1])
            return true;
        }
        else{
            return false;
        }
        
    }
    // console.log("FamilY Number: ", typeof familyNumber);
    // console.log("Working Family Num: ", typeof workingFamilyNumber);
    // console.log("SSI Family Num: ", typeof SSIFamilyNumber);
    // console.log("Earned Income: ", typeof earnedIncome);
   
}



export let isNull = () =>{
    let familyNumber = $("#family-num").val();
    let workingFamilyNumber = $("#working-family-num").val();
    let SSIFamilyNumber = $("#ssi-num").val();
    let county = $("#county-selection").val();
    let monthlyEarnedIncome = $("#monthly-earned-income").val();
    let monthlyUnearnedIncome = $("#monthly-unearned-income").val();
    let monthlyDisabilityBenefit = $("#monthly-disabilities-benefit").val();
    let disabilitesBoolean = $("#disability-query").val();
   

    if(familyNumber === "" || workingFamilyNumber === "" || SSIFamilyNumber ==="" || county === "" ||
        monthlyEarnedIncome === "" || monthlyUnearnedIncome === "" || monthlyDisabilityBenefit=== "" || disabilitesBoolean === "" ){
            // console.log("Null is true;");
        return true;
    }
    else{
        // console.log("Null is false;");
        return false;
    }

}


export default CalcuateMAPBenefits;