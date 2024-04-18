'use client'


import {Flag} from "react-feather";
import {
    Button,
    IconButton,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Text, Select, FormLabel, FormControl, FormErrorMessage, Textarea, Alert, AlertIcon
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";

import {Heading, VStack} from "@chakra-ui/layout";
import {useParams} from "next/navigation";
import {BASE_API_URL} from "@/configs/constants";
import {useState} from "react";

export function ReportModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const params = useParams();
    const [status, setStatus] = useState<string | null>(null);

    console.log(params)

    return(
        <>
            <IconButton onClick={onOpen} aria-label={'Повідомити про помилку'} size={'lg'} icon={<Flag/>}/>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bug Report</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{
                                description: '',
                                error_type: ''
                            }}
                            onSubmit={
                            async (values) => {

                                try {
                                    const res = await fetch(`${BASE_API_URL}/send-error-report`, {
                                        method: 'POST',
                                        headers: {"Content-Type": "application/json"},
                                        body: JSON.stringify({
                                            error_type: values.error_type,
                                            description: values.description,
                                            link: `https://aniverse.com.ua/anime/${params.id}/${params.episode}/watch`
                                        }),
                                    })

                                    console.log(res)
                                    if (res.status === 202){
                                        setStatus('success')
                                    }
                                    else{
                                        setStatus('error')
                                    }
                                }
                                catch (e) {
                                    console.log(e)
                                }

                            }}
                            validate={(values) => {
                                let errors: any = {}

                                console.log('validate', values)

                                if (values.error_type === ''){
                                    errors.error_type = 'Оберіть тип помилки';
                                }
                                if (!values.description) {
                                    errors.description = 'Будь-ласка опишіть знайдену помилку';
                                }

                                console.log(errors)

                                return errors
                            }}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <VStack spacing={4} align={'left'}>
                                        {status === 'success' &&
                                            <Alert status={'success'}>
                                                <AlertIcon/>
                                                Звіт успішно відравлено. Дякуємо!
                                            </Alert>
                                        }
                                        {status === 'error' &&
                                            <Alert status={'error'}>
                                                <AlertIcon/>
                                                При відправленні звіту виникла помилка. Спробуте пізніше або напишіть в тг <a
                                                href="https://t.me/aniverse_admin">@aniverse_admin</a>
                                            </Alert>
                                        }
                                        <Field name={'error_type'} type={'select'}>
                                            {({field, form}) => (
                                                <FormControl isInvalid={form.errors.error_type && form.touched.error_type}>
                                                    <FormLabel htmlFor="error_type">Тип помилки</FormLabel>
                                                    <Select {...field} placeholder={'Оберіть тип помилки'} id={'error_type'}>
                                                        <option value='no_load'>Плеєр не грузиться</option>
                                                        <option value='content_error'>Помилка в контенті</option>
                                                        <option value='audio_error'>Відсутня озвучка</option>
                                                        <option value='other'>Інше</option>
                                                    </Select>
                                                    <FormErrorMessage>{form.errors.error_type}</FormErrorMessage>
                                                </FormControl>
                                            )}

                                        </Field>
                                        <Field name={'description'} type={'textarea'}>
                                            {({field, form}) => (
                                                <FormControl isInvalid={form.errors.description && form.touched.description}>
                                                    <FormLabel htmlFor={'description'}>Опис помилки</FormLabel>
                                                    <Textarea {...field} placeholder={'Опишіть помилку яку ви знайшли, додайте посилання на скріншоти, то що.'}/>
                                                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button
                                            variant={'primary'}
                                            colorScheme={'teal'}
                                            isLoading={isSubmitting}
                                            type={'submit'}
                                            mb={4}
                                        >
                                            Відправити
                                        </Button>
                                    </VStack>


                                </Form>
                            )}
                        </Formik>
                    </ModalBody>

                    {/*<ModalFooter>*/}
                    {/*    <Button colorScheme='blue' mr={3} onClick={onClose}>*/}
                    {/*        Close*/}
                    {/*    </Button>*/}
                    {/*    <Button variant='ghost'>Secondary Action</Button>*/}
                    {/*</ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
}