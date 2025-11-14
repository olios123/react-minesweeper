import React, {ReactElement} from 'react';

export function Dropdown(children: Array<ReactElement>, id: string)
{
    return (
        <div className="dropdown" id={id}>
            {children}
        </div>
    )
}

export function DropdownHeader(children: Array<ReactElement>) {
    return (
        <div className="dropdown-header">
            {children}
            <i className="fi fi-rr-angle-small-down"></i>
        </div>
    )
}

export function DropdownContent(children: Array<ReactElement>) {
    return (
        <div className="dropdown-content">
            <ol>
                {children}
            </ol>
        </div>
    )
}

export function DropdownElement(value: string, children: Array<ReactElement>) {
    return (
        <li value={value}>
            {children}
        </li>
    )
}