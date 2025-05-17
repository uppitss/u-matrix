import React from 'react';
import {
    Flex,
    Spinner,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';

const LoadingSpinner = () => {
    // Адаптивный размер текста
    const textSize = useBreakpointValue({
        base: 'lg',
        sm: 'xl',
        md: '2xl',
        lg: '3xl'
    });

    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0, 0, 0, 0.1)" // Полупрозрачный фон
            zIndex="overlay" // Поверх других элементов
        >
            <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                height="20vh" // 20% высоты экрана
                gap={4}
            >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    width="50px"
                    height="50px"
                />
                <Text
                    fontSize={textSize}
                    fontWeight="semibold"
                    color="gray.600"
                >
                    Загрузка...
                </Text>
            </Flex>
        </Flex>
    );
};

export default LoadingSpinner;