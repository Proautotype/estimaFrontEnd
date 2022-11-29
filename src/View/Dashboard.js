import React, { useState } from 'react';
import { FaArrowCircleDown, FaArrowCircleUp, FaArrowRight, FaMinusCircle, FaPen, FaPlay, FaPlus, FaPlusCircle } from 'react-icons/fa';
import "../assets/scss/dashboard.scss";
import { EstimateItem, ProjectItem, Step, StepDrawer } from '../components/DashboardSnipets';
import projectLogo from "../assets/images/mask-transparent.png"
import { RTCircularLoader } from '../components/CustomElements';

const Dashboard = () => {
    const [startProject, setStartProject] = useState(false);
    const [startEstimates, setStartEstimates] = useState(false);
    const [projects, setProjects] = useState([
        { name: "Magnolia", sprints: ["MC-1 Sprint 1", "MC-2 Sprint 2", "MC-3 Sprint 3"] },
        { name: "Market Place", sprints: ["Sprint 1"] },
        { name: "Aegis", sprints: ["Sprint 1", "Sprint 2"] },
    ]);
    const [project, setproject] = useState("");
    const [estimates, setEstimates] = useState({ name: "Magnolia", sprints: ["MC-1 Authentication", 
    "MC-2 Sprint 2", "MC-2 Sprint 3"] });
    const [estimate, setestimate] = useState("");
    const [inGameParticipants, setInGameParticipants] = useState([
        { name: "luke", value: 5, hide: true },
        { name: "Ramsaey", value: 13, hide: false },
        { name: "Kwaku", value: 5, hide: true },
        { name: "kwabena", value: 55, hide: false },
        { name: "Jones", value: 75, hide: true },
        { name: "Kali", value: 75, hide: true },
        { name: "Opo", value: 75, hide: true },
        { name: "Opo", value: 75, hide: false },
        { name: "Opo", value: 75, hide: false },
        { name: "Opo", value: 75, hide: false },
    ])
    //
    const [createMember, setCreateMember] = useState(false);
    //events    
    function reselectActive() {
        const _currentActive = document.querySelector(".project-item");
        _currentActive.classList.add("active");
    }
    //methods
    function selectEstimate(project) {
        setEstimates(projects.filter(val => val.name === project)[0]);
    }
    function deleteProject(project) {
        setProjects(prev => prev.filter(val => val.name !== project.name));
        reselectActive();
    }

    return (
        <div className='wrapper'>
            <div className='navbar'>
                <h1>~ESTIMA~</h1>
            </div>
            <div className='dashboard'>
                <div className='left'>
                    <div className='profile'>
                        <p className='title'>Profile</p>
                        <div className='profile-index'>
                            <div className='profile-image'>
                                <img alt='profile' src='/cuteness.jfif' />
                                <div className='pencil'>
                                    <FaPen />
                                </div>
                            </div>
                            <div className='profile-name'>
                                <p className='name'>Company</p>
                            </div>
                        </div>
                    </div>
                    <div className='portion projects'>
                        <div className='heading'>
                            <p className='title'>Projects</p>
                            {!startProject && <FaPlusCircle onClick={() => {
                                setStartProject(!startProject);
                            }} />}
                            {startProject && <FaMinusCircle onClick={() => {
                                setStartProject(!startProject);
                            }} />}
                        </div>
                        {startProject &&
                            <div className='input-element'>
                                <input placeholder='Enter Project Name'
                                    type={'text'}
                                    onChange={({ target }) => {
                                        setproject(target.value);
                                    }} />
                                <FaPlay onClick={() => {
                                    if (project) {
                                        const _newProject = {
                                            name: project,
                                            sprints: []
                                        }
                                        setProjects((prev) => [...prev, _newProject]);
                                        setStartProject(!startProject)
                                    }
                                }} />
                            </div>}
                        <div className='list'>
                            {projects.map((project) =>
                                <ProjectItem
                                    project={project}
                                    deleteMe={deleteProject}
                                    estimates={estimates}
                                    selectEstimate={selectEstimate}
                                />
                            )}
                        </div>
                    </div>
                    <div className='portion estimates'>
                        <div className='heading'>
                            <p className='title' style={{ width: '110px' }}>Sprint Estimates</p>
                        </div>
                        <div className='list'>
                            {estimates['sprints'].map((estima, idx) =>
                                <EstimateItem
                                    estimate={estima}
                                    deleteMe={deleteProject}
                                    estimates={estimates}
                                    selectEstimate={selectEstimate}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className='center'>
                    <Step title={estimates['name']} />
                    <div className="content">
                        <div className='top'>
                            <div className='title'>
                                <p className="project">{estimates['name']}</p>
                                <div className='item-image'>
                                    <img alt='profile' src={projectLogo} />
                                    <div className='pencil'>
                                        <FaPen />
                                    </div>
                                </div>
                            </div>
                            <div className='description'>
                                <p>Project ID</p>
                                <p>Moderator</p>
                                <p>Project Lead</p>
                            </div>
                            <div className='description about'>
                                <p>#00123</p>
                                <div>
                                    <p>Winston</p>
                                    <FaPen />
                                </div>
                                <div>
                                    <p>ProCode</p>
                                    <FaPen />
                                </div>
                                <div className='actions'>
                                    <button>Change Moderator</button>
                                    <button>Change Lead</button>
                                </div>
                            </div>
                        </div>
                        <div className='members'></div>
                    </div>
                    <StepDrawer title={"Estimates"}
                        placeholder={"Create estimate"}
                        setDataValue={setestimate}
                        hasInput={true}
                        expandable={true}
                        data={estimates['sprints']}
                    />
                    <StepDrawer title={"Members"} placeholder={"Search member by mail"}
                        setDataValue={setproject} hasInput={true}
                        expandable={true}
                    />
                    <StepDrawer title={"Operations"} hasInput={false} expandable={true} />
                </div>
                <div className='right'>
                    <p className='title'>
                        All Members</p>
                    <div className='content'>
                        <div className='member'>
                            <div className='indicator offline'></div>
                            <p className='name'>Luke</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

{/* {inGameParticipants.map((_value,idx)=>
                        <PlayCard 
                            username={_value.name}
                            value={_value.value}
                            hide={_value.hide}
                            key={idx}
                        />)}                    
                         */}