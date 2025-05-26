import React, {useEffect, useState} from 'react';
import {saveAppData} from "../services/ioService";
import {UTab} from "../model/UTab";
import {Button, Flex, Tabs} from "@chakra-ui/react";
import {LuPlus} from "react-icons/lu";


const MatrixTabs = (props) => {

    const [appData, setAppData] = useState(props.appData);
    const [activeTab, setActiveTab] = useState(props.appData.tabs.length >0 ? props.appData.tabs[0].id : -1);

    useEffect(() => {
        console.log("Change APPDATA START");
        console.log(appData);
        console.log("Change APPDATA END")
        if (process.env.NODE_ENV !== 'development') {
            saveAppData(appData);
        }
    }, [appData.tabs.length]);

    const quadrantBg = 'gray.100';
    const quadrantBorder = 'gray.200';

    const addTab = () => {
        console.log("AddTab Start");
        const newTab = new UTab(`Новая вкладка ${appData.tabs.length + 1}`, `hsl(${Math.random() * 360}, 70%, 50%)`, appData.tabs.length + 1);
        console.log(newTab)
        console.log(appData.tabs);
        setAppData(prevState => {
            console.log("PrevState")
            console.log(prevState);

            prevState.tabs = [...prevState.tabs, newTab];
            console.log("PrevState NEW")
            console.log(prevState);
            return prevState;
        });


        setActiveTab(appData.tabs.length);

        console.log("AddTab End")
    };

    const removeTab = (index) => {
        console.log("removeTab");
        console.log("oldTabs");
        console.log(appData.tabs);
        console.log("index "+index);
        const newTabs =[...appData.tabs.filter((_, i) => i !== index)];
        console.log("newTabs");
        console.log(newTabs);

        setAppData(prevState => {
            prevState.tabs = newTabs;
            return prevState;
        });

        setActiveTab(prevActive => {
            if (newTabs.length === 0) return 0; // Если вкладок не осталось
            if (prevActive === index) return Math.min(index, newTabs.length - 1);
            return prevActive > index ? prevActive - 1 : prevActive;
        });
        //setActiveTab(Math.min(activeTab, appData.tabs.length - 2));
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
                 key={appData.tabs.length}
                 value={activeTab}
                 onValueChange={(e) => setActiveTab(e.value)}>
                 <Tabs.List>
                     {
                         appData.tabs.map((tab, index) => {
                             return <Tabs.Trigger value={tab.id}>{tab.title}</Tabs.Trigger>
                         })
                     }
                     <Button
                         alignSelf="center"
                         ms="2"
                         size="2xs"
                         variant="ghost"
                         onClick={()=>{

                             addTab()}}
                     >
                         <LuPlus />
                     </Button>
                 </Tabs.List>
                 {
                     appData.tabs.map((tab,index)=>{
                         return <Tabs.Content value={tab.id}>
                             Content TAB={tab.title}
                         </Tabs.Content>
                     })
                 }
             </Tabs.Root>
             {/* Панель вкладок */}
             {/*<Tabs*/}
             {/*    key={appData.tabs.length}*/}
             {/*    index={activeTab}*/}
             {/*    onChange={setActiveTab}*/}
             {/*    variant="enclosed-colored"*/}
             {/*    isLazy*/}
             {/*    display="flex"*/}
             {/*    flexDirection="column"*/}
             {/*    flex="1"*/}
             {/*    overflow="hidden"*/}
             {/*>*/}
                 {/*<TabList overflowX="auto" overflowY="hidden">*/}
                 {/*    {appData.tabs.map((tab, index) => (*/}
                 {/*        <Tab*/}
                 {/*            key={tab.id}*/}
                 {/*            _selected={{color: 'white', bg: tab.color}}*/}
                 {/*            minWidth="150px"*/}
                 {/*            position="relative"*/}
                 {/*        >*/}
                 {/*            <Text isTruncated>{tab.title}</Text>*/}
                 {/*            <IconButton*/}
                 {/*                aria-label="Удалить вкладку"*/}
                 {/*                icon={<CloseIcon boxSize={2.5}/>}*/}
                 {/*                size="xs"*/}
                 {/*                ml={2}*/}
                 {/*                borderRadius="full"*/}
                 {/*                onClick={(e) => {*/}
                 {/*                    e.stopPropagation();*/}
                 {/*                    removeTab(index);*/}
                 {/*                }}*/}
                 {/*                _hover={{bg: 'rgba(0,0,0,0.1)'}}*/}
                 {/*            />*/}
                 {/*        </Tab>*/}
                 {/*    ))}*/}
                 {/*    <Tab onClick={addTab} _hover={{bg: 'gray.100'}}>*/}
                 {/*        <AddIcon boxSize={3}/>*/}
                 {/*    </Tab>*/}
                 {/*</TabList>*/}

                 {/*/!* Контент вкладок - теперь растягивается *!/*/}
                 {/*<TabPanels*/}
                 {/*    flex="1"*/}
                 {/*    minHeight="0" // Важно для корректного растягивания в Flex*/}
                 {/*    overflow="hidden"*/}
                 {/*>*/}
                 {/*    {appData.tabs.map((tab) => (*/}
                 {/*        <TabPanel*/}
                 {/*            key={tab.id}*/}
                 {/*            p={0}*/}
                 {/*            height="100%"*/}
                 {/*            overflow="hidden"*/}
                 {/*        >*/}
                 {/*            /!* Компонент матрицы - теперь занимает всю высоту *!/*/}
                 {/*            <Grid*/}
                 {/*                templateColumns="repeat(2, 1fr)"*/}
                 {/*                templateRows="repeat(2, 1fr)"*/}
                 {/*                gap={4}*/}
                 {/*                height="100%"*/}
                 {/*                minHeight="0" // Важно для вложенных Grid*/}
                 {/*            >*/}
                 {/*                {['Срочно и важно', 'Не срочно, но важно', 'Срочно, но не важно', 'Не срочно и не важно'].map((title, idx) => (*/}
                 {/*                    <GridItem*/}
                 {/*                        key={idx}*/}
                 {/*                        bg={quadrantBg}*/}
                 {/*                        borderWidth="1px"*/}
                 {/*                        borderColor={quadrantBorder}*/}
                 {/*                        borderRadius="md"*/}
                 {/*                        p={4}*/}
                 {/*                        overflow="auto" // Добавляем скролл при необходимости*/}
                 {/*                    >*/}
                 {/*                        <Heading size="md" mb={4}>{title}</Heading>*/}
                 {/*                        /!* Место для будущих задач *!/*/}
                 {/*                    </GridItem>*/}
                 {/*                ))}*/}
                 {/*            </Grid>*/}
                 {/*        </TabPanel>*/}
                 {/*    ))}*/}
                 {/*</TabPanels>*/}
             {/*</Tabs>*/}
         </Flex>
    );
};

export default MatrixTabs;