import React, {useState} from "react";
import $ from "jquery";

import CalcuateMAPBenefits, {isNull, MBSACEligibility} from "./CalculateBenefits";
// import SubmitButton from "./SubmitButton"

const handleSubmit = (e) =>{
    e.preventDefault();
}

let Form = () =>{
    const [eligibilityMessage, setMessage] = useState([""]);

    const appendMessage = () =>{
 
        let y = CalcuateMAPBenefits();
        console.log(CalcuateMAPBenefits())
        if((isNull() === false && MBSACEligibility() === false) || CalcuateMAPBenefits() <0){
            setMessage(
                <h3 className="result-message">
                    You are not eligible for cash benefits, but you are eligible for other <a href="https://www.cdss.ca.gov/inforesources/calworks">CalWORKs benefits.</a>
                </h3>
            )
        }
        else if(isNull() === false && MBSACEligibility()===true){
            setMessage(
                <>
                    <h3 className="result-message">
                        Total Eligible Cash Benefit: ${y}
                    </h3>
                    <div>Apply online at <a href="https://benefitscal.com/ApplyForBenefits/begin/ABOVR?lang=en">BenefitsCal.com</a> or <a href="https://www.cdss.ca.gov/county-offices">contact your county social services agency</a> in your county</div>
                </>
                
            )

        }

        
    }

    const removeMessage = () =>{
        setMessage("")
    }

    const restrictNumberInput = () =>{
        let maxValue = $("#family-num").val();
        $("#ssi-num").attr("max", maxValue);
        $("#working-family-num").attr("max", maxValue);
    }

    return(
        <div id="flex-wrapper">
            {eligibilityMessage}
            <form onSubmit={handleSubmit}>
            {/* flexbox 1 */}
            <div className="flexbox-rows">
                <label>How many members are in your family including yourself?</label>
                <input onChange={restrictNumberInput} type='number' min="1" className="form-control numeric-input" id="family-num" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            {/* flexbox 2 */}
            <div className="flexbox-rows">
                <label>How many working family members are in your family?</label>
                <input type='number' min="0" className="form-control numeric-input" id="working-family-num" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            {/* flexbox 3 */}
            <div className="flexbox-rows">
                <label>How many family members recieve <span className="disability-tooltip" data-toggle="tooltip" data-placement="top" title="Supplemental Security Income">SSI</span> funds?</label>
                <input type='number' min="0" className="form-control numeric-input" id="ssi-num" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            {/* flexbox 4 */}
            <div className="flexbox-rows">
                <label>Which county do you live in?</label>
                <select id="county-selection" className="form-select" aria-label="Default select example" required>
                    <option value="">Default</option>
                    <option value="alameda" className="county">Alameda</option>
                    <option value="contra costa" className="county">Contra Costa</option>
                    <option value="los angeles" className="county">Los Angeles</option>
                    <option value="marin" className="county">Marin</option>
                    <option value="monterey" className="county">Monterey</option>

                    <option value="napa" className="county">Napa</option>
                    <option value="orange" className="county">Orange</option>
                    <option value="san diego" className="county">San Diego</option>
                    <option value="san francisco" className="county">San Francisco</option>
                    <option value="san luis obispo" className="county">San Luis Obispo</option>

                    <option value="san mateo" className="county">San Mateo</option>
                    <option value="santa barbara" className="county">Santa Barbara</option>
                    <option value="santa clara" className="county">Santa Clara</option>
                    <option value="santa cruz" className="county">Santa Cruz</option>
                    <option value="solano" className="county">Solano</option>

                    <option value="sonoma" className="county">Sonoma</option>
                    <option value="ventura" className="county">Ventura</option>
                    <option value="other" className="county">Other</option>
                </select>
            </div>
            {/* flexbox 5 */}
            <div className="flexbox-rows">
                <label>What is your monthly earned income?</label>
                <input type="number" min="0" className="form-control" id="monthly-earned-income" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            {/* flexbox 6 */}
            <div className="flexbox-rows">
                <label>What is your monthly unearned income?</label>
                <input type="number" min="0" className="form-control" id="monthly-unearned-income" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            {/* flexbox 7 */}
            <div className="flexbox-rows">
                <label>What is your monthly disability benefits income (excluding SSI)?</label>
                <input type="number" min="0" className="form-control" id="monthly-disabilities-benefit" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            {/* flexbox 8 */}
            <div className="flexbox-rows">
                <label>Does every adult family member have disabilites and receive  
                    either <span className="disability-tooltip" data-toggle="tooltip" data-placement="top" title="Supplemental Security Income">SSI</span>
                    , <span className="disability-tooltip" data-toggle="tooltip" data-placement="top" title="Home Supportive Services"> HSS</span>, or  <span className="disability-tooltip" data-toggle="tooltip" data-placement="top" title="State Disability Insurance">SDI</span>,
                    or Workers Compensation?</label>
                <select id="disability-query" className="form-select" aria-label="Default select example" required>
                <option value="">Default</option>
                <option value="false" className="county">No</option>
                <option value="true" className="county">Yes</option>
                </select>
            </div>
            
            <div id="flex-buttons">
                <button id="submit-button" onClick={appendMessage}>Submit</button>
                <button id="reset-button" type="reset" onClick={removeMessage}>Reset</button>
                
            </div>
            
            </form>
            
        </div>
    )
}

export default Form