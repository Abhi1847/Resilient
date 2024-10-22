import React from 'react';
import CustomAnalysis from "../components/timeline/CustomAnalysis";
import PlanPermit from "../components/timeline/PlanPermit";
import $ from "jquery";
import smartWizard from 'smartwizard';

const UserTimeline = () => {

    $(function () {

        $('#smartwizard').smartWizard({
            selected: 1,
            theme: 'arrows',
        });
    });

    return (
        <div className={'container-fluid'}>
            <div className={'tab-header'} style={{marginTop: '1rem'}}>
                <h4>Project Timeline</h4>
                <span>Keep track of your progress details</span>
            </div>
            <div className={'row'}>
                <div id="smartwizard" className={'mb-5'}>
                    <ul className="nav tab-header">
                        <li className="nav-item">
                            <a className="nav-link" href="#step-1">
                                Start
                            </a>
                            <div className={'active_header first_header'}/>
                            <div className="arrow-up"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#step-2">
                                Custom <br/> Analysis
                            </a>
                            <div className={'active_header second_header'}/>
                            <div className="arrow-up"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#step-3">
                                Plan & <br/> Permit
                            </a>
                            <div className={'active_header third_header'}/>
                            <div className="arrow-up"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#step-4">
                                Connect <br/> Offtaker
                            </a>
                            <div className={'active_header fourth_header'}/>
                            <div className="arrow-up"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#step-5">
                                Clear <br/> Biomass
                            </a>
                            <div className={'active_header fifth_header'}/>
                            <div className="arrow-up"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#step-6">
                                Project <br/> Close
                            </a>
                            <div className={'active_header sixth_header'}/>
                            <div className="arrow-up"/>
                        </li>
                    </ul>
                    <div className="tab-content h-auto">
                        <div id="step-1" className="tab-pane" role="tabpanel" aria-labelledby="step-1">
                            Step Start
                        </div>
                        <div id="step-2" className="tab-pane" role="tabpanel" aria-labelledby="step-2">
                            <CustomAnalysis/>
                        </div>
                        <div id="step-3" className="tab-pane" role="tabpanel" aria-labelledby="step-3">
                            <PlanPermit/>
                        </div>
                        <div id="step-4" className="tab-pane" role="tabpanel" aria-labelledby="step-4">
                            Coming soon...
                        </div>
                        <div id="step-5" className="tab-pane" role="tabpanel" aria-labelledby="step-5">
                            Coming soon...
                        </div>
                        <div id="step-6" className="tab-pane" role="tabpanel" aria-labelledby="step-6">
                            Coming soon...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTimeline;
