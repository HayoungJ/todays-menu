import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import HeaderTemplate from '../../components/templates/HeaderTemplate';
import PickerTemplate from '../../components/templates/PickerTemplate';
import LocationList from '../../components/organisms/LocationList';
import BaseModal from '../../components/atoms/BaseModal';

import { googleLogout } from '../../api/auth';
import { getLocationByKeyword } from '../../api/map';

import { useUser } from '../../contexts/UserContext';
import { useModal } from '../../contexts/ModalContext';

import { ISearchResult } from '../../types/types';

import styled, { css } from 'styled-components';

const StyledMain = styled.main`
  display: flex;
  flex-flow: column nowrap;

  width: 100vw;
  height: 100vh;
`;

const StyledPicker = styled(PickerTemplate)`
  flex: 1;

  margin: 1rem auto 2.5rem;
`;

const ModalTitle = styled.h3`
  ${({ theme }) => {
    const { fontSize } = theme;
    return css`
      font-size: ${fontSize.md};

      margin: 0;
      padding: 0.7rem ;
    `;
  }}
`;

const ModalContent = styled.div`
  padding: 0.7rem;
`;

const MainPage: FC = () => {
  const router = useRouter();
  const locationOptions = ['회사', '집'];
  const userMenus = [
    {
      label: '위치 등록',
      onClick: () => {
        openModal({
          onClose: () => {
            setSearchResult([]);
            setSelectedResult(null);
          }
        });
      },
    },
    {
      label: '로그아웃',
      onClick: async () => {
        await googleLogout();
        router.push('/login');
      },
    },
  ];

  const user = useUser();
  const { isOpen, openModal } = useModal();

  const [location, setLocation] = useState(locationOptions[0]);
  const [searchResult, setSearchResult] = useState<ISearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<ISearchResult | null>(null);

  const onLocationSelect = (option: string, index: number) => {
    setLocation(option);
  };

  const handleSubmit = (name: string, address: string) => {
    console.log(name, address);
    setSearchResult([]);
    setSelectedResult(null);
  }

  const handleSearch = async (keyword: string) => {
    if (keyword === '') {
      setSearchResult([]);
      setSelectedResult(null);
      return;
    }
    const data = await getLocationByKeyword({ keyword, size: 5 }).then((res) => res.data.documents); // debouce 처리 해야함
    const result = data.map((el) => {
      return {
        name: el.place_name,
        address: el.address_name,
        longitude: el.x,
        latitude: el.y,
      }
    });
    setSearchResult(result);
  }

  const handleSearchSelect = (value: ISearchResult) => {
    setSelectedResult(value);
  }

  return (
    <StyledMain>
      <HeaderTemplate
        logoURL="/assets/images/text_logo.png"
        profileURL={user?.photoURL ?? 'https://via.placeholder.com/80'}
        location={location}
        locationOptions={locationOptions}
        userMenus={userMenus}
        handleLocationSelect={(option, index) =>
          onLocationSelect(option, index)
        }
      />
      <StyledPicker />
      <BaseModal
        Title={<ModalTitle>위치 등록</ModalTitle>}
        Content={
          <ModalContent>
            <LocationList
              locations={[]}
              searchResult={searchResult}
              selectedResult={selectedResult}
              handleSumbit={handleSubmit}
              handleSearch={handleSearch}
              handleSearchSelect={handleSearchSelect}
            />
          </ModalContent>
        }
      />
    </StyledMain>
  );
}

export default MainPage;
