import {Box, Container, Heading, Text, VStack, Link} from "@chakra-ui/layout";
import NextLink from "next/link";


export default function PrivacyPage() {



  return(
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
          <Link as={NextLink} href={'/privacy-police'}>Політика Конфіденційності</Link>
        </Box>
        <VStack align={'left'} spacing={6} mb={6}>
          <Box>
            <Heading>Політика Конфіденційності Aniverse</Heading>
            <Text fontStyle={'italic'}>Дата останнього оновлення: [21.03.2024].</Text>
          </Box>
          <Box>
            <Heading mb={4}>1. Огляд</Heading>
            <Text fontSize={'18px'}>Aniverse (далі &apos;ми&apos;, &apos;наш&apos;) поважає вашу конфіденційність і прагне захистити ваші персональні дані. Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо, розкриваємо, зберігаємо і захищаємо вашу інформацію.</Text>
          </Box>
          <Box>
            <Heading mb={4}>2. Збір і використання даних</Heading>
            <Text fontSize={'18px'}>Ми збираємо персональні дані, такі як ваше ім&lsquo;я, адреса електронної пошти, інформація про пристрій та IP-адреса. Ці дані використовуються для поліпшення нашого сервісу, аналітики і маркетингових цілей. IP-адреси також використовуються для визначення вашого географічного розташування.</Text>
          </Box>
          <Box>
            <Heading mb={4}>3. Cookies і технології відстеження</Heading>
            <Text fontSize={'18px'}>Ми використовуємо cookies та аналогічні технології для поліпшення вашого користувацького досвіду на нашому сайті. Ви можете контролювати й обмежувати використання cookies через налаштування вашого браузера.</Text>
          </Box>
          <Box>
            <Heading mb={4}>4. Надання даних третім сторонам</Heading>
            <Text fontSize={'18px'}>Ваша IP-адреса може бути надана сервісу <Link target={'_blank'} href={'https://versel.com'}>Versel.com</Link> для визначення вашого географічного розташування. Ми не надаємо ваші персональні дані іншим третім сторонам без вашої згоди.
            </Text>
          </Box>
          <Box>
            <Heading mb={4}>5. Захист і безпека даних</Heading>
            <Text fontSize={'18px'}>Ми вживаємо заходів для захисту ваших персональних даних від несанкціонованого доступу, використання або розкриття. Ваші дані зберігаються на захищених серверах з використанням сучасних методів хешування та безпеки.
            </Text>
          </Box>
          <Box>
            <Heading mb={4}>6. Ваші права</Heading>
            <Text fontSize={'18px'}>Ви маєте право запросити доступ до ваших персональних даних, їх виправлення або видалення. Для цього зверніться до нас за адресою електронної пошти <a href={'mailto:help@aniverse.com.ua'}>help@aniverse.com.ua</a> або через Телеграм (<a target={'_blank'} href={'https://t.me/aniverse_admin'}>Aniverse Admin</a>).</Text>
          </Box>
          <Box>
            <Heading mb={4}>7. Контакти</Heading>
            <Text fontSize={'18px'}>Якщо у вас є питання або зауваження щодо нашої політики конфіденційності, будь ласка, зв&lsquo;яжіться з нами за адресою <a href={'mailto:help@aniverse.com.ua'}>help@aniverse.com.ua</a> або в Телеграм (<a target={'_blank'} href={'https://t.me/aniverse_admin'}>Aniverse Admin</a>).</Text>
          </Box>

        </VStack>

      </Box>

    </Container>
  )
}