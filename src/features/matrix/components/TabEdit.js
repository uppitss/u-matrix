import {Button, Input} from "@chakra-ui/react";
import {LuCheck, LuX} from "react-icons/lu";
import React, {useState} from "react";

export const TabEdit = (props) => {
    const [value, setValue] = useState(props.tab.title);
    return <>
        <Input placeholder={props.tab.title}
               variant="flushed"
               size="2xs"
               value={value}
               onChange={(e) => {
                   setValue(e.currentTarget.value);
               }}/>
        {" "}
        <Button
            as="span"
            size="2xs"
            me="-2px" variant="ghost"
            onClick={(e) => {
                e.stopPropagation()
                props.onConfirm(value);
            }}>
            <LuCheck/>
        </Button>
        {" "}
        <Button
            as="span"
            size="2xs"
            me="-2px" variant="ghost"
            onClick={(e) => {
                e.stopPropagation()
                props.onCancel();
            }}>
            <LuX/>
        </Button>
    </>
}