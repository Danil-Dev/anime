'use client'


import {Box, Center, Container, Flex, Heading, Text} from "@chakra-ui/layout";
import {Field, Form, Formik} from "formik";
import {UserServices} from "@/services/User";
import {Avatar, Button, FormControl, FormErrorMessage, FormLabel, Input, Link, Textarea} from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import {AnimeService} from "@/services/Anime";
import {useMemo} from "react";
import buildDateString from "@/utils/buildDateString";
import NextLink from "next/link";

export default function Comments({user, id}: {user: string | null, id: string}) {

  const {data: commentPage, setSize, isValidating, error} = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null

      return `comments/${id}?page=${pageIndex+1}`
    },
    AnimeService.getComments,
    {
      initialSize: 1
    }
  )

  const hasNextPage = useMemo(() => {
    if (!commentPage) return false
    return commentPage[commentPage.length - 1].length !== 0
  }, [commentPage])

  const onLoadMore = () => {
    setSize(prev => prev + 1)
  }

  const comments = commentPage ? commentPage.flat(): []


  return<>
    <Container maxW={'container.xl'}>
      <Box mt={'75px'} pb={'75px'}>
        <Heading mb={4}>Коментарі</Heading>
        {/*<Flex justifyContent={'space-between'} mt={'40px'} mb={'24px'}>*/}
        {/*  */}
        {/*</Flex>*/}

        <Box width={{ base: '100%', md: '65%' }}>

          { user === null ?
            <>
              <Box>
                <Text fontSize={24}>Щоб залишити коментар, <Link as={NextLink} color={'accentAction'} textDecoration={'underline'} href={'/auth/login'}>авторизуйтесь на сайті</Link></Text>
              </Box>
            </>
             :
            <Formik
              initialValues={{
                content: ''
              }}
              onSubmit={
                async (values) => {
                  const res = await UserServices.addComment(user, 'Episode', id, values.content)
                  console.log (res)
                }
              }
              validate={(values) => {

                let errors: any = {}
                if (!values.content) {
                  errors.content = 'Обов\'язково'
                } else if (values.content.length < 10) {
                  errors.content = "Комментар повинен містити не меньш 10 символів"
                }
                return errors
              }}
            >
              {({isSubmitting}) => (
                <Form>
                  <Field name="content" type={'textarea'}>
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.content && form.touched.content}>
                        <FormLabel fontSize={'16px'} mb={2} display={'block'} htmlFor={'content'}>Додати коментар до епізоду</FormLabel>
                        {/*<Input {...field} type={'textarea'} id={'content'} placeholder={'Залишити коментар...'}/>*/}
                        <Textarea {...field} id={'content'} placeholder={'Залишити коментар...'}/>
                        <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex justifyContent={'flex-end'}>
                    <Button
                      mt={4}
                      variant={'primary'}
                      colorScheme={'teal'}
                      isLoading={isSubmitting}
                      type={'submit'}
                    >
                      Залишити
                    </Button>
                  </Flex>

                </Form>
              )}
            </Formik>
          }


          {comments.map((comment, index) => (

              <Flex gap={4} mb={4} key={index}>
                <Box>
                  {
                    comment.user.image ?
                        <Avatar name={comment.user.name} src={`https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/${comment.user.image}/avatar`}/>:
                        <Avatar bg='teal.500'/>
                  }

                </Box>
                <Box>
                  <Heading fontSize={16}>{comment.user.name}</Heading>
                  <Text fontSize={'sm'} mb={2} color={'textSecondary'}>{new Date(comment.date).toDateString()}</Text>
                  <Text>{comment.content}</Text>

                </Box>
              </Flex>

          ))}

          <Center>
            {(isValidating || hasNextPage) && (
              <Button isLoading={isValidating} onClick={onLoadMore}>
                {isValidating? 'Завантаження...': 'Більше коментарів'}
              </Button>
              )
            }
          </Center>
        </Box>

      </Box>
    </Container>

  </>
}