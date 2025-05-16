import React, { useState } from 'react';
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
    Flex
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

const MatrixTabs = () => {
    const [tabs, setTabs] = useState([
        { id: '1', title: 'Работа', color: 'blue.500' },
        { id: '2', title: 'Личное', color: 'green.500' }
    ]);
    const [activeTab, setActiveTab] = useState(0);

    const quadrantBg = useColorModeValue('gray.100', 'gray.700');
    const quadrantBorder = useColorModeValue('gray.200', 'gray.600');

    const addTab = () => {
        const newTab = {
            id: Date.now().toString(),
            title: `Новая вкладка ${tabs.length + 1}`,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
        };
        setTabs([...tabs, newTab]);
        setActiveTab(tabs.length);
    };

    const removeTab = (index) => {
        const newTabs = tabs.filter((_, i) => i !== index);
        setTabs(newTabs);
        setActiveTab(Math.min(activeTab, newTabs.length - 1));
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
                    {tabs.map((tab, index) => (
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
                    {tabs.map((tab) => (
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