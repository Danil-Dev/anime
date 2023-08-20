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
    Text, InputGroup, InputRightElement, Alert, AlertIcon
} from "@chakra-ui/react";
import {Box} from "@chakra-ui/layout";
import Image from "next/image";
import NextLink from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
export default function SignInForm() {

    const [show, setShow] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    return (

        <Box position={'relative'} h={'calc(100vh - 140px)'}>
            <AbsoluteCenter bg={'background'} w={'40%'} p={'40px 40px 60px'} borderRadius={'12px'}>
                <Heading >Sign In</Heading>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={
                        async (values) => {
                            console.log(values)
                            const res = await signIn('credentials', {
                                email: values.email,
                                password: values.password,
                                redirect: false
                            })

                            if (res && !res.error){
                                router.push('/')
                            }
                            else{
                                setError(res.error)
                                console.log(res)
                            }
                        }
                    }
                    validate={(values) => {
                        let errors: any = {}

                        console.log('validate', values)

                        if (!values.email) {
                            errors.email = 'Required'
                        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                            errors.email = 'Invalid email address'
                        }
                        else if (!values.password) {
                            errors.password = 'Required'
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
                                      {error === 'CredentialsSignin' ? 'Invalid email or password' : 'Something went wrong'}
                                  </Alert>
                                }
                                <Field name="email" type="email">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <Input {...field} id="email" placeholder="Enter email" />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password" type="password">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <InputGroup size={'lg'}>
                                                <Input {...field} placeholder={'Enter password'} type={show ? 'text' : 'password'} id="password" pr={'5.5rem'} />
                                                <InputRightElement width="4.5rem" pr={'1rem'}>
                                                    <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                                        {show ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>

                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
                                    Submit
                                </Button>
                                <Text color={'textSecondary'}>
                                    Don't have an account? <Link fontWeight={'bold'} as={NextLink} href={'/auth/register'}>Sign Up</Link>
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
