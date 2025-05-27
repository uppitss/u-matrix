import React from "react";
import {Button, Text} from "@chakra-ui/react";
import {LuTrash} from "react-icons/lu";

export const TabTitle = (props) =>{
    return <>
        <Text onDoubleClick={(e) => {
            e.stopPropagation();
            props.onEdit();
        }}>{props.tab.title}</Text>
        {" "}
        <Button
            as="span"
            size="2xs"
            me="-2px" variant="ghost"
            onClick={(e) => {
                e.stopPropagation()
                props.onRemove();
            }}>
            <LuTrash/>
        </Button>
    </>
}