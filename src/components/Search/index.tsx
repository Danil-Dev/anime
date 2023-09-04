import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AnimeService, IAnimeData } from '@/services/Anime';
import SearchCard from '@/components/Search/SearchCard';
import { Search } from 'react-feather';
import { Scrollbar } from 'react-scrollbars-custom';
import {
    Button,
    Text,
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Kbd,
    Modal,
    useDisclosure,
    ModalContent,
    ModalOverlay,
    Fade,
    AbsoluteCenter,
    IconButton,
} from '@chakra-ui/react';
import { useHotkeys } from '@mantine/hooks';

export default function SearchComponent() {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchAnime, setSearchAnime] = useState<IAnimeData[]>([]);
    const [searchResultHeight, setSearchResultHeight] = useState<number>(1);

    useHotkeys([['ctrl+k', () => onToggle()]]);

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setSearch(target.value);
    };

    useEffect(() => {
        if (search.length >= 3) {
            if (!isLoading) {
                setIsLoading(true);
                AnimeService.searchAnime(search).then((data) => {
                    console.log('Searched', data);
                    setSearchAnime(data);
                    setIsLoading(false);
                    setSearchResultHeight(data.length >= 1 ? 380 : 80);
                });
            }
        } else {
            setSearchAnime([]);
            setSearchResultHeight(1);
        }
    }, [search]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, inputRef]);

    return (
      <>
          <Box borderRadius={12} display={{ base: 'inline-block', md: 'block' }}>
              <Button
                variant={'outlined'}
                onClick={onToggle}
                leftIcon={<Search size={16} />}
                position={'relative'}
                size={'xl'}
                color={'textSecondary'}
                w={'100%'}
                colorScheme={'search'}
                justifyContent={'flex-start'}
                display={{ base: 'none', md: 'flex' }}
              >
                  <Text m={0}>Search the anime...</Text>
                  <Box position={'absolute'} right={'16px'} top={'50%'} transform={'translateY(-65%)'}>
                      <Kbd>Ctrl</Kbd>
                      <Kbd>K</Kbd>
                  </Box>
              </Button>
              <IconButton
                onClick={onToggle}
                aria-label='Search database'
                icon={<Search size={16} />}
                size='lg'
                display={{ base: 'flex', md: 'none' }}
              />
          </Box>
          <Modal size={{ base: 'sm', md: '3xl' }} onClose={onClose} isOpen={isOpen}>
              <ModalOverlay />
              <ModalContent>
                  <InputGroup>
                      <InputLeftElement pointerEvents='none'>
                          <Search size={24} />
                      </InputLeftElement>
                      <Input
                        type='text'
                        outline={'none'}
                        color={'white'}
                        size={'lg'}
                        variant={'unstyled'}
                        onChange={handleChangeSearch}
                        placeholder={'Start typing anime...'}
                        ref={inputRef}
                        h={'42px'}
                        _placeholder={{
                            color: 'white',
                        }}
                      />
                  </InputGroup>
                  <Box display={{ base: 'none', md: 'block' }} position={'relative'} h={`${searchResultHeight}px`}>
                      {search.length >= 3 && searchAnime.length === 0 && <AbsoluteCenter><Text>Anime not found.</Text></AbsoluteCenter>}
                      {!isLoading && searchAnime.length > 0 && (
                        <Scrollbar>
                            {searchAnime.map((anime, idx) => (
                              <SearchCard onClick={onClose} key={idx} data={anime} />
                            ))}
                        </Scrollbar>
                      )}
                  </Box>
                  <Box display={{ base: 'block', md: 'none' }} position={'relative'} h={`${searchResultHeight}px`}>
                      {search.length >= 3 && searchAnime.length === 0 && <AbsoluteCenter><Text>Anime not found.</Text></AbsoluteCenter>}
                      {!isLoading && searchAnime.length > 0 && (
                        <Scrollbar>
                            {searchAnime.map((anime, idx) => (
                              <SearchCard onClick={onClose} key={idx} data={anime} />
                            ))}
                        </Scrollbar>
                      )}
                  </Box>
              </ModalContent>
          </Modal>
      </>
    );
}