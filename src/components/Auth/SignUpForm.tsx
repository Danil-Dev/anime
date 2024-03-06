'use client'
import {Field, Form, Formik} from "formik";
import {
    AbsoluteCenter,
    Button, Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input, Link,
    Spacer, VStack,
    Text, InputGroup, InputRightElement, Alert, AlertIcon, IconButton
} from "@chakra-ui/react";
import {Box} from "@chakra-ui/layout";
import Image from "next/image";
import NextLink from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";

import {BASE_API_URL} from "@/configs/constants";
import {Eye, EyeOff} from "react-feather";
export default function SignUpForm() {

    const [show, setShow] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    return (

        <Box position={'relative'} h={'calc(100vh - 140px)'}>
            <AbsoluteCenter bg={'background'} w={{base: '100%', md: '40%'}} p={'40px 40px 60px'} borderRadius={'12px'}>
                <Heading >Реєстрація</Heading>
                <Formik
                    initialValues={{
                        email: '',
                        name: '',
                        password: '',
                        reenterPassword: ''
                    }}
                    onSubmit={
                        async (values) => {
                            // console.log (`${process.env.BASE_API_URL}/auth/register`)
                            const res = await fetch(`${BASE_API_URL}/auth/register`, {
                                method: 'POST',
                                headers: {
                                    "Content-Type": 'application/json'
                                },
                                body: JSON.stringify({
                                    email: values.email,
                                    password: values.password,
                                    name: values.name
                                })
                            })

                            const data = await res.json()
                            console.log(data, res)

                            if (res.status === 200){
                                router.push('/auth/login')
                            }
                            else{
                                console.log('set error', data.message)
                                setError(data.message)
                            }

                        }
                    }
                    validate={(values) => {
                        let errors: any = {}

                        console.log('validate', values)

                        if (!values.email) {
                            errors.email = 'Обов\'язково'
                        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                            errors.email = 'Невірна адреса електронної пошти'
                        } else if(!values.name) {
                            errors.name = 'Обов\'язково'
                        } else if(values.name.length < 3) {
                            errors.name = 'Ім\'я повинно містити не меньше 3х символів'
                        }else if (!values.password) {
                            errors.password = 'Обов\'язково'
                        } else if (!values.reenterPassword) {
                            errors.reenterPassword = 'Обов\'язково'
                        } else if (values.password !== values.reenterPassword) {
                            errors.reenterPassword = 'Паролі мають співпадати'
                        }


                        return errors
                    }}
                >
                    {({
                          isSubmitting,
                      }) => (
                        <Form>
                            <VStack spacing={4} align={'left'}>
                                {error &&
                                  <Alert status="error">
                                    <AlertIcon/>
                                      {error}
                                  </Alert>
                                }
                                <Field name="email" type="email">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <Input {...field} id="email" placeholder="Введіть email" />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="name" type="text">
                                    {({field, form}) => (
                                      <FormControl isInvalid={form.errors.name && form.touched.name}>
                                          <FormLabel htmlFor="name">Нікнейм</FormLabel>
                                          <Input {...field} id="name" placeholder="Введіть нікнейм" />
                                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                      </FormControl>
                                    )}
                                </Field>
                                <Field name="password" type="password">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                                            <FormLabel htmlFor="password">Пароль</FormLabel>
                                            <InputGroup size={'lg'}>
                                                <Input {...field} placeholder={'Введіть пароль'} type={show ? 'text' : 'password'} id="password" pr={'5.5rem'} />
                                                <InputRightElement width="4.5rem" pr={'1rem'}>
                                                    <IconButton onClick={() => setShow(!show)} aria-label={show ? 'Сховати' : 'Показати'}  icon={show ? <EyeOff/> : <Eye/>} />
                                                </InputRightElement>
                                            </InputGroup>

                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="reenterPassword" type="password">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.reenterPassword && form.touched.reenterPassword}>
                                            <FormLabel htmlFor="reenterPassword">Пароль повторно</FormLabel>
                                            <InputGroup size={'lg'}>
                                                <Input {...field} placeholder={'Повторно введіть пароль'} type={show ? 'text' : 'password'} id="password" pr={'5.5rem'} />
                                                <InputRightElement width="4.5rem" pr={'1rem'}>
                                                    <IconButton onClick={() => setShow(!show)} aria-label={show ? 'Сховати' : 'Показати'}  icon={show ? <EyeOff/> : <Eye/>} />
                                                </InputRightElement>
                                            </InputGroup>

                                            <FormErrorMessage>{form.errors.reenterPassword}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    mt={4}
                                    variant={'primary'}
                                    colorScheme={'teal'}
                                    isLoading={isSubmitting}
                                    type={'submit'}
                                    // size={'fullW'}
                                >
                                    Реєстрація
                                </Button>
                                <Text color={'textSecondary'}>
                                    Вже маєте аккаунт? <Link fontWeight={'bold'} as={NextLink} href={'/auth/login'}>Вхід</Link>
                                </Text>

                            </VStack>


                        </Form>
                    )}
                </Formik>
                <Box
                    position={'absolute'}
                    bottom={'-155px'}
                    left={'0'}
                    w={'100%'}
                >
                    <Flex>
                        <Image src={'/assets/img/mouse.png'} alt={'mouse'} width={200} height={200}/>
                        <Spacer/>
                        <Image src={'/assets/img/mouse.png'} alt={'mouse'} width={200} height={200}/>
                    </Flex>

                </Box>
            </AbsoluteCenter>

        </Box>

    );
}
