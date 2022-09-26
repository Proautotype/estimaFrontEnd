import { useState,useContext } from "react";
import { confirmAlert } from "react-confirm-alert";
import { createKey } from "../services/Utils";

export const ConfirmSubmit = (title, message, action, actionText, list) => {
   
    confirmAlert({
        customUI: ({ onClose }) => {            
            return (
                <div className="custom-ui">
                    <h1 className="title">{title}</h1>
                    <p>{message}</p>
                    <ul>
                        {list?.map((li) => (
                            <li>{li}</li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                action(onClose);                                
                            }}
                        >
                            {actionText}
                        </button>
                    </div>
                </div>
            );
        },
    });
};