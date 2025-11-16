import {
    useState,
    cloneElement,
    ReactNode,
    ReactElement
} from "react";

/* --------------------------------------------------------
   DROPDOWN
-------------------------------------------------------- */

interface DropdownProps {
    id: string;
    value: string;
    onChange: (value: string, label: string) => void;
    children: ReactNode;
}

export function Dropdown({ id, value, onChange, children }: DropdownProps) {
    const [open, setOpen] = useState(false);

    const handleSelect = (newValue: string, label: string) => {
        onChange(newValue, label);
        setOpen(false);
    };

    const arrayChildren = Array.isArray(children) ? children : [children];

    return (
        <div id={id} className="dropdown">
            {arrayChildren.map((child: ReactElement) =>
                cloneElement(child as ReactElement<any>, {
                    open,
                    setOpen,
                    onSelect: handleSelect,
                    selectedValue: value
                })
            )}
        </div>
    );
}

/* --------------------------------------------------------
   DROPDOWN HEADER
-------------------------------------------------------- */

interface DropdownHeaderProps {
    children: ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

export function DropdownHeader({ children, open, setOpen }: DropdownHeaderProps) {
    return (
        <div
            className="dropdown-header"
            onClick={() => setOpen?.(!open)}
        >
            {children}
            <i className="fi fi-rr-angle-small-down"></i>
        </div>
    );
}

/* --------------------------------------------------------
   DROPDOWN CONTENT
-------------------------------------------------------- */

interface DropdownContentProps {
    children: ReactNode;
    open?: boolean;
    onSelect?: (value: string, label: string) => void;
    selectedValue?: string;
}

export function DropdownContent({
                                    children,
                                    open,
                                    onSelect,
                                    selectedValue
                                }: DropdownContentProps) {
    const arrayChildren = Array.isArray(children) ? children : [children];

    return (
        <div className={`dropdown-content ${open ? "open" : ""}`}>
            <ol>
                {arrayChildren.map((child: ReactElement) =>
                    cloneElement(child as ReactElement<any>, {
                        onSelect,
                        selectedValue
                    })
                )}
            </ol>
        </div>
    );
}

/* --------------------------------------------------------
   DROPDOWN ELEMENT
-------------------------------------------------------- */

interface DropdownElementProps {
    value: string;
    children: ReactNode;
    selectedValue?: string;
    onSelect?: (value: string, label: string) => void;
}

export function DropdownElement({
                                    value,
                                    children,
                                    selectedValue,
                                    onSelect
                                }: DropdownElementProps) {
    const label =
        typeof children === "string"
            ? children
            : (children as any)?.props?.children?.toString() ?? "";

    return (
        <li
            className={`dropdown-element ${selectedValue === value ? "active" : ""}`}
            onClick={() => onSelect?.(value, label)}
        >
            {children}
        </li>
    );
}
