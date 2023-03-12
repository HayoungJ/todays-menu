import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import HeaderTemplate from '../../components/templates/HeaderTemplate';
import PickerTemplate from '../../components/templates/PickerTemplate';

import { googleLogout } from '../../api/auth';
import { useUser } from '../../contexts/UserContext';

import styled from 'styled-components';

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

const MainPage: FC = () => {
  const router = useRouter();
  const locationOptions = ['회사', '집'];
  const userMenus = [
    {
      label: '계정 설정',
      onClick: () => {},
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

  const [location, setLocation] = useState(locationOptions[0]);

  const onLocationSelect = (option: string, index: number) => {
    setLocation(option);
  };

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
    </StyledMain>
  );
}

export default MainPage;
