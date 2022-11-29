import { useState } from "react";
import { FaArrowCircleUp, FaDotCircle, FaMinusCircle, FaPen, FaPlay, FaPlusCircle, FaShieldAlt, FaTrashAlt } from "react-icons/fa";
import { RTCircularLoader } from "./CustomElements";
import { animate, motion } from 'framer-motion'


export const ProjectItem = ({ project, estimates, deleteMe, selectEstimate }) => {
    const [edit, setEdit] = useState(false);
    const [projectName, setProjectName] = useState(project?.name);
    function selectProject({ currentTarget }, identifier) {
        const _currentActive = document.querySelector(".project-item.active");
        if (!_currentActive) {
            currentTarget.classList.add('active');
            selectEstimate(identifier);
            return;
        }
        _currentActive.classList.remove("active");
        currentTarget.classList.add('active');
        selectEstimate(identifier);
    }
    return <div className={`project-item`}
        onClick={(event) => {
            selectProject(event, project.name);
        }}>
        <div className='identifier'>
            {edit ? <input type={'text'}
                value={projectName}
                onClick={(event) => {
                    selectProject(event, project.name);
                }}
                onChange={({ target }) => {
                    setProjectName(target.value)
                }}
            /> :
                <p>{projectName}</p>}
            <div>{project?.sprints?.length}</div>
        </div>
        <div className={`actions`}>
            <FaPen onClick={() => {
                if (project.name === estimates.name) {
                    setEdit(!edit);
                }
            }} />
            <FaTrashAlt onClick={() => {
                if (project.name === estimates.name) {
                    deleteMe(project);
                }
            }} />
        </div>
    </div>
}

export const EstimateItem = ({ estimate, estimates, deleteMe }) => {
    function selectEstimate({ currentTarget }, identifier) {
        const _currentActive = document.querySelector(".estimate-item.active");
        if (!_currentActive) {
            currentTarget.classList.add('active');
            return;
        }
        _currentActive.classList.remove("active");
        currentTarget.classList.add('active');

    }
    return <div className={`estimate-item`}
        onClick={(event) => {
            selectEstimate(event, estimate);
        }}>
        <div className='identifier'>
            <p>{estimate}</p>
        </div>
        <div className={`actions`}>
            <FaPen onClick={() => {
                // if (project.name === estimates.name) {
                //     setEdit(!edit);
                // }
            }} />
            <FaTrashAlt onClick={() => {
                // if (project.name === estimates.name) {
                //     deleteMe(project);
                // }
            }} />
        </div>
    </div>
}

export const PlayCard = ({ value, username, hide }) => {
    return <div className='playcard'>
        <div className='number-card'>
            <div className='number'>{value}</div>
            <p className='name'>{username}</p>
            {hide && <div className='cover'>
                <FaShieldAlt color="tomato" />
            </div>}
        </div>
    </div>
}

export function Step({ title, placeholder, hasInput, setDataValue, expandable, clickExpand, expand }) {
    const [startEntry, setstartEntry] = useState(false)
    const expandVariant = {
        initial: {
            rotateZ: "0deg"
        },
        animate: {
            rotateZ: "45deg"
        },
        animate1: {
            rotateZ: "135deg"
        }
    }
    return <div className="steps">
        {expandable && <motion.div
            variants={expandVariant}
            animate={expand ? "animate1" : "initial"}
        >
            <FaArrowCircleUp onClick={clickExpand} />
        </motion.div>}
        <p>{title}</p>
        {startEntry && <div className='input-element'>
            <input placeholder={placeholder} type={'text'} onChange={({ target }) => {
                setDataValue(target.value);
            }} />
            <FaPlay onClick={() => {

            }} />
        </div>}
        {hasInput && !startEntry && <FaPlusCircle onClick={() => {
            setstartEntry(!startEntry);
        }} />}
        {hasInput && startEntry && <FaMinusCircle onClick={() => {
            setstartEntry(!startEntry);
        }} />}
        {false && <RTCircularLoader size={15} />}
    </div>
}

export function StepDrawer({ title, placeholder, hasInput, setDataValue, expandable, data }) {
    const [expand, setExpand] = useState(false);

    function clickExpand() {
        setExpand(!expand);
    }
    return (<div className="step-drawer">
        <Step expandable={expandable}
            title={title}
            placeholder={placeholder}
            hasInput={hasInput}
            setDataValue={setDataValue}
            clickExpand={clickExpand}
            expand={expand}
        />
        {expandable && expand &&
            <motion.div
                layoutScroll
                className="drawer">
                {data?.map((estima, idx) =>
                    <div className="estimate-item">
                        <FaDotCircle />
                        <p>{estima}</p>
                        <div className="actions">
                            <FaPen />
                            <FaTrashAlt />
                        </div>
                    </div>
                )}
            </motion.div>}
    </div>)
}
