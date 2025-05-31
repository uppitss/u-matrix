import React, {useEffect, useState} from 'react';
import {UTab} from "../domain/entities/UTab";
import {Button, CloseButton, Flex, Grid, GridItem, Heading, IconButton, Input, Tabs, Text} from "@chakra-ui/react";
import {LuCheck, LuPlus, LuTrash, LuX} from "react-icons/lu";
import {TabTitle} from "./TabTitle";
import {TabEdit} from "./TabEdit";
import {useTabs} from "../hooks/useTabs";


const MatrixTabs = ({service}) => {
    const {
        tabs,
        activeTabId,
        editedTabId,
        addTab,
        removeTab,
        renameTab,
        changeTab,
        editTab
    } = useTabs(service)

    const quadrantBg = 'gray.100';
    const quadrantBorder = 'gray.200';

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
                value={activeTabId}
                fitted
                flex="1"
                onValueChange={(e) => changeTab(e.value)}>
                <Tabs.List>
                    {
                        tabs.map((tab, index) => {
                            return <Tabs.Trigger
                                colorPalette={tab.color}
                                key={"tabs_trigger_" + tab.id}
                                value={tab.id}>
                                {
                                    editedTabId === tab.id &&
                                    <TabEdit tab={tab}
                                             onConfirm={(value) => {
                                                 renameTab(tab.id, value);
                                                 editTab(undefined);
                                             }}
                                             onCancel={() => {
                                                 editTab(undefined);
                                             }}/>
                                }
                                {
                                    editedTabId !== tab.id &&
                                    <TabTitle tab={tab}
                                              onEdit={() => {
                                                  editTab(tab.id)
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