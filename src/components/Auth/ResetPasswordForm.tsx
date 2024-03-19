'use client'

import {Box, Heading, VStack} from "@chakra-ui/layout";
import {
  AbsoluteCenter, Alert, AlertIcon, Button,
  FormControl, FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import {useParams, useRouter} from "next/navigation";
import {Field, Form, Formik} from "formik";
import {useState} from "react";
import {Eye, EyeOff} from "react-feather";
import {BASE_API_URL} from "@/configs/constants";

export default function ResetPasswordForm(){

  const {resetToken} = useParams()

  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  console.log (resetToken)

  return(
    <Box position={'relative'} h={'calc(100vh - 140px)'}>
      <AbsoluteCenter bg={'background'} w={{base: '100%', md: '40%'}} p={'40px 40px 60px'} borderRadius={'12px'}>
        <Heading>Скидання Пароля</Heading>
        <Formik
          initialValues={{
            newPassword: '',
            reenterNewPassword: ''
          }}
          onSubmit={
            async (values) => {
              const res = await fetch(`${BASE_API_URL}/auth/reset-password/reset`, {
                method: 'POST',
                headers: {
                  "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                  resetPasswordToken: resetToken,
                  newPassword: values.newPassword
                })
              })

              const data = await res.json()

              if (res.status === 200){
                router.push('/auth/login')
              } else {
                console.log ('set error', data.message)
                setError(data.message)
              }
            }
          }
          validate={(values) => {
            let errors: any = {}
            console.log('validate', values)

            if (!values.newPassword) {
              errors.newPassword = 'Обов\'язково'
            } else if (!values.reenterNewPassword){
              errors.reenterNewPassword = 'Обов\'язково'
            } else if (values.newPassword !== values.reenterNewPassword) {
              errors.reenterNewPassword = 'Паролі мають співпадати'
            }

            return errors
          }}>
          {({isSubmitting}) => (
            <Form>
              <VStack spacing={4} align={'left'}>

                {error &&
                  <Alert status='error'>
                      <AlertIcon/>
                    {error}
                  </Alert>
                }
                <Field name='newPassword' type='password'>
                  {({field, form}) => (
                    <FormControl isInvalid={form.errors.newPassword && form.touched.newPassword}>
                      <FormLabel htmlFor="newPassword">Новий пароль</FormLabel>
                      <InputGroup size={'lg'}>
                        <Input {...field} placeholder={'Введіть новий пароль'} type={show ? 'text' : 'password'} id="password" pr={'5.5rem'} />
                        <InputRightElement width="4.5rem" pr={'1rem'}>
                          <IconButton onClick={() => setShow(!show)} aria-label={show ? 'Сховати' : 'Показати'}  icon={show ? <EyeOff/> : <Eye/>} />
                        </InputRightElement>
                      </InputGroup>

                      <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="reenterNewPassword" type="password">
                  {({field, form}) => (
                    <FormControl isInvalid={form.errors.reenterNewPassword && form.touched.reenterNewPassword}>
                      <FormLabel htmlFor="reenterNewPassword">Новий пароль повторно</FormLabel>
                      <InputGroup size={'lg'}>
                        <Input {...field} placeholder={'Повторно введіть новий пароль'} type={show ? 'text' : 'password'} id="password" pr={'5.5rem'} />
                        <InputRightElement width="4.5rem" pr={'1rem'}>
                          <IconButton onClick={() => setShow(!show)} aria-label={show ? 'Сховати' : 'Показати'}  icon={show ? <EyeOff/> : <Eye/>} />
                        </InputRightElement>
                      </InputGroup>

                      <FormErrorMessage>{form.errors.reenterNewPassword}</FormErrorMessage>
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
                  Скинути
                </Button>
              </VStack>
            </Form>
          )}

        </Formik>
      </AbsoluteCenter>
    </Box>
  )
}