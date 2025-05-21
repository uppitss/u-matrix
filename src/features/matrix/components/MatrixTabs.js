import React, {useEffect, useMemo, useState} from 'react';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Box,
    Grid,
    GridItem,
    Heading,
    Text,
    IconButton,
    useColorModeValue,
    Flex, Button
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {readAppData, saveAppData} from "../services/ioService";
import {UTab} from "../model/UTab";

const MatrixTabs = (props) => {

    const [appData, setAppData] = useState(props.appData);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        console.log("EFFECT APPDATA");
        //saveAppData(appData);
    }, [appData,appData.tabs]);

    const quadrantBg = useColorModeValue('gray.100', 'gray.700');
    const quadrantBorder = useColorModeValue('gray.200', 'gray.600');

    const addTab = () => {
        const newTab = new UTab(`Новая вкладка ${appData.tabs.length + 1}`,`hsl(${Math.random() * 360}, 70%, 50%)`, appData.tabs.length+1);
        console.log("newTab");
        console.log(newTab);
         setAppData(prevState => {
             prevState.tabs = [...prevState.tabs, newTab];
         return prevState;});


        setActiveTab(appData.tabs.length);
    };

    const removeTab = (index) => {
        console.log("RemoveTab Index="+index);
        setAppData(prevState => {
            prevState.tabs = [...prevState.tabs.filter((_, i) => i !== index)];
            return prevState;
        });
        setActiveTab(Math.min(activeTab, appData.tabs.length - 2));
    };

    return (
        <Flex
            direction="column"
            height="100vh" // Занимаем всю высоту viewport
            maxHeight="100vh"
            p={4}
            margin="0 auto"
        >
            {/* Панель вкладок */}
            <Tabs
                index={activeTab}
                onChange={setActiveTab}
                variant="enclosed-colored"
                isLazy
                display="flex"
                flexDirection="column"
                flex="1"
                overflow="hidden"
            >
                <TabList overflowX="auto" overflowY="hidden">
                    {appData.tabs.map((tab, index) => (
                        <Tab
                            key={tab.id}
                            _selected={{ color: 'white', bg: tab.color }}
                            minWidth="150px"
                            position="relative"
                        >
                            <Text isTruncated>{tab.title}</Text>
                            <IconButton
                                aria-label="Удалить вкладку"
                                icon={<CloseIcon boxSize={2.5} />}
                                size="xs"
                                ml={2}
                                borderRadius="full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeTab(index);
                                }}
                                _hover={{ bg: 'rgba(0,0,0,0.1)' }}
                            />
                        </Tab>
                    ))}
                    <Tab onClick={addTab} _hover={{ bg: 'gray.100' }}>
                        <AddIcon boxSize={3} />
                    </Tab>
                </TabList>

                {/* Контент вкладок - теперь растягивается */}
                <TabPanels
                    flex="1"
                    minHeight="0" // Важно для корректного растягивания в Flex
                    overflow="hidden"
                >
                    {appData.tabs.map((tab) => (
                        <TabPanel
                            key={tab.id}
                            p={0}
                            height="100%"
                            overflow="hidden"
                        >
                            {/* Компонент матрицы - теперь занимает всю высоту */}
                            <Grid
                                templateColumns="repeat(2, 1fr)"
                                templateRows="repeat(2, 1fr)"
                                gap={4}
                                height="100%"
                                minHeight="0" // Важно для вложенных Grid
                            >
                                {['Срочно и важно', 'Не срочно, но важно', 'Срочно, но не важно', 'Не срочно и не важно'].map((title, idx) => (
                                    <GridItem
                                        key={idx}
                                        bg={quadrantBg}
                                        borderWidth="1px"
                                        borderColor={quadrantBorder}
                                        borderRadius="md"
                                        p={4}
                                        overflow="auto" // Добавляем скролл при необходимости
                                    >
                                        <Heading size="md" mb={4}>{title}</Heading>
                                        {/* Место для будущих задач */}
                                    </GridItem>
                                ))}
                            </Grid>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Flex>
    );
};

export default MatrixTabs;