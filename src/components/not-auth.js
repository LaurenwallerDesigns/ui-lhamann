import React from 'react';

export default function NotAuth(props) {
    return (
        <div>
            <h1>
                You are not authorized to be on this current page. 
                Please sign-in and try again. 
                <span> If this was a mistake please contact us below </span>
            </h1>
        </div>
    )
}