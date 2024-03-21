import {Box, Container, Heading, Text, VStack} from "@chakra-ui/layout";
import {Link} from "@chakra-ui/layout";
import NextLink from "next/link";


export default function AbusePage() {


  return (

    <>

      <Container maxW={'container.lg'}>
        <Box mt={'100px'}>
          <Box mb={6}>
            <Link
              as={NextLink}
              href={'/'}
              _hover={{
                color: '#DBBC19'
              }}
            >Головна</Link>
            <span> &gt; </span>
            <Link as={NextLink} href={'/abuse'}>Правовласникам</Link>
          </Box>
          <VStack align={'left'} spacing={3} mb={6}>
            <Heading>Правовласникам</Heading>
            <Text fontSize={'18px'}>
              Інформація, що опублікована на нашому сайті, є загальнодоступною та може бути знайдена в інтернеті.
            </Text>
            <Text fontSize={'18px'}>
              Ми категорично проти розповсюдження нелегального чи піратського контенту, що охороняється авторським правом та публікує на сайті тільки ті матеріали, які вже доступні в мережі на вільних основах, використовуючи при цьому тільки відкриті джерела.
            </Text>
            <Heading fontSize={'18px'}>Якщо ви є власником контенту, що був неправомірно розміщений на нашому ресурсі, просимо зв&lsquo;язатися з нами, надавши:</Heading>
            <Text fontSize={'18px'}>
              1. Докази ваших прав на матеріал, що охороняється законом про авторські права (відскановану копію документа з печаткою, електронний лист з офіційної адреси компанії-правовласника тощо).

            </Text>
            <Text fontSize={'18px'}>
              2. Посилання на сторінки нашого сайту, де розміщено контент, що порушує ваші права.
            </Text>

            <Text fontSize={'18px'}>
              У випадку отримання офіційного запиту, ми оперативно видалимо контент, що охороняється авторським правом, або замінимо його на матеріали з вашого ресурсу, якщо ви цього бажаєте.
            </Text>
            <Text fontSize={'18px'}>
              З цих питань просимо Вас звертатися на пошту <a href={'mailto:abuse@aniverse.com.ua'}>abuse@aniverse.com.ua</a>
            </Text>
          </VStack>
        </Box>
      </Container>
    </>

  )
}