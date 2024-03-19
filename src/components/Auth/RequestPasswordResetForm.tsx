'use client'
import {useState} from "react";
import {Box, Heading, VStack} from "@chakra-ui/layout";
import {
  AbsoluteCenter,
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {BASE_API_URL} from "@/configs/constants";


export default function RequestPasswordResetForm(){
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)



  return(
    <Box position={'relative'} h={'calc(100vh - 140px)'}>
      <AbsoluteCenter bg={'background'} w={{base: '100%', md: '40%'}} p={'40px 40px 60px'} borderRadius={'12px'}>
        <Heading>Забули пароль</Heading>
        <Formik
          initialValues={{
            email: ''
          }}
          onSubmit={ async (values) => {
            const res = await fetch(`${BASE_API_URL}/auth/reset-password/request`, {
              method: 'POST',
              headers: {
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({
                email: values.email
              })
            })

            const data = await res.json()

            if (res.status === 202){
              setError(null)
              setMessage(data.message)
            } else {
              setMessage(null)
              setError(data.message)
            }
          }}
          validate={(values) => {
            let errors: any = {}
            console.log('validate', values)

            if (!values.email) {
              errors.email = 'Обов\'язково'
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
              errors.email = 'Невірна адреса електронної пошти'
            }

            return errors
          }}
        >
          {({isSubmitting}) => (
            <Form>
              <VStack spacing={4} align={'left'}>
                {error &&
                    <Alert status="error">
                        <AlertIcon/>
                      {error}
                    </Alert>
                }
                { message &&
                  <Alert status='info'>
                      <AlertIcon/>
                    {message}
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
                <Button
                  mt={4}
                  variant={'primary'}
                  colorScheme={'teal'}
                  isLoading={isSubmitting}
                  type={'submit'}
                  // size={'fullW'}
                >
                  Відновити
                </Button>
              </VStack>
            </Form>
          )}

        </Formik>
      </AbsoluteCenter>
    </Box>
  )
}