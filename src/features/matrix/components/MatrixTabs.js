import React, {useEffect, useState} from 'react';
import {UTab} from "../model/UTab";
import {Button, CloseButton, Flex, Grid, GridItem, Heading, IconButton, Input, Tabs, Text} from "@chakra-ui/react";
import {LuCheck, LuPlus, LuTrash, LuX} from "react-icons/lu";
import {TabTitle} from "./TabTitle";
import {TabEdit} from "./TabEdit";


const MatrixTabs = (props) => {
    const [tabs, setTabs] = useState(props.tabs);
    const [activeTab, setActiveTab] = useState(props.tabs.length > 0 ? props.tabs[0].id : -1);
    const [editedTab, setEditedTab] = useState(undefined);

    useEffect(() => {
        props.onChangeData(tabs);
    }, [tabs.length]);

    const quadrantBg = 'gray.100';
    const quadrantBorder = 'gray.200';

    const addTab = () => {
        const newTab = new UTab(`Новая вкладка ${tabs.length + 1}`, `hsl(${Math.random() * 360}, 70%, 50%)`, tabs.length + 1);
        const newTabs = [...tabs, newTab];
        setTabs(newTabs);
        setActiveTab(newTab.id);
    };

    const removeTab = (id) => {
        const newTabs = [...tabs.filter((item) => item.id !== id)];
        setTabs(newTabs);

        setActiveTab(prevActive => {
            if (newTabs.length === 0) return 0; // Если вкладок не осталось
            if (prevActive === id) return Math.min(id, newTabs.length - 1);
            return prevActive > id ? prevActive - 1 : prevActive;
        });
    };

    return (

        <Flex
            direction="column"
            height="100vh" // Занимаем всю высоту viewport
            maxHeight="100vh"
            p={4}
            margin="0 auto"
        >
            <Tabs.Root
                key={tabs.length}
                value={activeTab}
                fitted
                flex="1"
                onValueChange={(e) => setActiveTab(e.value)}>
                <Tabs.List>
                    {
                        tabs.map((tab, index) => {
                            return <Tabs.Trigger
                                key={"tabs_trigger_" + tab.id}
                                value={tab.id}>
                                {
                                    editedTab === tab.id &&
                                    <TabEdit tab={tab}
                                             onConfirm={(value) => {
                                                 setEditedTab(undefined);
                                                 alert(value);
                                             }}
                                             onCancel={() => {
                                                setEditedTab(undefined);
                                             }}/>
                                }
                                {
                                    editedTab !== tab.id && <TabTitle tab={tab} onEdit={() => {
                                        setEditedTab(tab.id)
                                    }}
                                                                      onRemove={() => {
                                                                          removeTab(tab.id)
                                                                      }}/>
                                }
                            </Tabs.Trigger>
                        })
                    }
                    <Button
                        alignSelf="center"
                        ms="2"
                        size="2xs"
                        variant="ghost"
                        onClick={addTab}
                    >
                        <LuPlus/>
                    </Button>
                </Tabs.List>
                {
                    tabs.map((tab, index) => {
                        return <Tabs.Content
                            key={"tabs_content_" + tab.id}
                            asChild
                            value={tab.id}>
                            <Grid
                                key={"tabs_content_grid_" + tab.id}
                                templateColumns="repeat(2, 1fr)"
                                templateRows="repeat(2, 1fr)"
                                gap={4}
                                height="100%"
                                minHeight="0" // Важно для вложенных Grid
                            >
                                {['Срочно и важно', 'Не срочно, но важно', 'Срочно, но не важно', 'Не срочно и не важно'].map((title, idx) => (
                                    <GridItem
                                        key={"tabs_content_grid_item_" + tab.id + "_" + idx}
                                        bg={quadrantBg}
                                        borderWidth="1px"
                                        borderColor={quadrantBorder}
                                        borderRadius="md"
                                        p={4}
                                        overflow="auto" // Добавляем скролл при необходимости
                                    >
                                        <Heading size="md" mb={4}>{title} {tab.title}</Heading>
                                        {/* Место для будущих задач */}
                                    </GridItem>
                                ))}
                            </Grid>
                        </Tabs.Content>
                    })
                }
            </Tabs.Root>
        </Flex>
    );
};

export default MatrixTabs;