'use client'
import {Box, Heading, Grid, GridItem, Center} from "@chakra-ui/layout";
import {useSession} from "next-auth/react";
import {
  Avatar, Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {UserServices} from "@/services/User";
import {useState} from "react";
import {Eye, EyeOff} from "react-feather";

export  default function ChangePasswordPage() {

  const session = useSession()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)


  return (
    <>
      <Box px={10} textAlign={'center'}>
        <Heading>Змінити пароль</Heading>

        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            repeatPassword: ''
          }}
          onSubmit={
            async (values) => {
              const res = await UserServices.changePassword(
                session.data.user.id,
                values.currentPassword,
                values.newPassword,
                session.data.user.accessToken
              )
            }
          }
          validate={(values) => {
            let errors: any = {}

            if(!values.currentPassword){
              errors.currentPassword = 'Обов\'язково'
            } else if ( !values.newPassword ){
              errors.newPassword = 'Обов\'язково'
            } else if (!values.repeatPassword){
              errors.repeatPassword = 'Обов\'язково'
            } else if (values.newPassword !== values.repeatPassword){
              errors.repeatPassword = 'Паролі мають співпадати'
            }

            return errors
          }
          }
        >
          {({
              isSubmitting
            }) => (
            <Form>
              <Field name={'currentPassword'} type={'password'}>
                {({field, form}) => (
                  <FormControl mb={4} isInvalid={form.errors.currentPassword && form.touched.currentPassword}>
                    <FormLabel htmlFor={'currentPassword'}>Діючий пароль</FormLabel>
                    <InputGroup size={'lg'}>
                      <Input {...field} id={'currentPassword'} type={showCurrentPassword ? 'text' : 'password'} placeholder={'Введіть свій пароль'}/>
                      <InputRightElement width={'4.5rem'} pr={'1rem'}>
                        <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} aria-label={showCurrentPassword ? 'Сховати' : 'Показати'}  icon={showCurrentPassword ? <EyeOff/> : <Eye/>} />
                      </InputRightElement>
                    </InputGroup>

                    <FormErrorMessage>{form.errors.currentPassword}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Grid templateColumns={'1fr 1fr'} gap={4}>
                <GridItem>
                  <Field name={'newPassword'} type={'password'}>
                    {({field, form}) => (
                      <FormControl mb={4} isInvalid={form.errors.newPassword && form.touched.newPassword}>
                        <FormLabel htmlFor={'newPassword'}>Новий пароль</FormLabel>
                        <InputGroup size={'lg'}>
                          <Input {...field} id={'newPassword'} type={showNewPassword ? 'text' : 'password'} placeholder={'Введіть новий пароль'}/>
                          <InputRightElement width={'4.5rem'} pr={'1rem'}>
                            <IconButton onClick={() => setShowNewPassword(!showNewPassword)} aria-label={showNewPassword ? 'Сховати' : 'Показати'}  icon={showNewPassword ? <EyeOff/> : <Eye/>} />
                          </InputRightElement>
                        </InputGroup>

                        <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <Field name={'repeatPassword'} type={'password'}>
                    {({field, form}) => (
                      <FormControl mb={4} isInvalid={form.errors.repeatPassword && form.touched.repeatPassword}>
                        <FormLabel htmlFor={'newPassword'}>Повторіть пароль</FormLabel>
                        <InputGroup size={'lg'}>
                          <Input {...field} id={'newPassword'} type={showNewPassword ? 'text' : 'password'} placeholder={'Повторіть новий пароль'}/>
                          <InputRightElement width={'4.5rem'} pr={'1rem'}>
                            <IconButton
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              aria-label={showNewPassword ? 'Сховати' : 'Показати'}
                              icon={showNewPassword ? <EyeOff/> : <Eye/>}
                            />
                          </InputRightElement>
                        </InputGroup>

                        <FormErrorMessage>{form.errors.repeatPassword}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>


              </Grid>

              <Center mb={10}>
                <Button
                  mt={4}
                  variant={'primary'}
                  colorScheme={'teal'}
                  isLoading={isSubmitting}
                  type={'submit'}
                  size={'fullW'}
                >
                  Змінити
                </Button>
              </Center>

            </Form>
          )}
        </Formik>
      </Box>


    </>
  );
}