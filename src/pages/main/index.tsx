import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeaderTemplate from '../../components/templates/HeaderTemplate';
import PickerTemplate from '../../components/templates/PickerTemplate';

import { googleLogout } from '../../api/auth';
import { useUser } from '../../contexts/UserContext';
import { deleteCookie, getCookie } from '../../utils/cookie';

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

function MainPage() {
  const router = useRouter();

  const token = getCookie('token');

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
        deleteCookie('token');
      },
    },
  ];

  const user = useUser();

  const [location, setLocation] = useState(locationOptions[0]);

  const onLocationSelect = (option: string, index: number) => {
    setLocation(option);
  };

  useEffect(() => {
    // todo: 사용자가 사용 중인 상태에서 (다른 페이지 로그인 등으로) 쿠키에 토큰이 추가되었을 때는 자동 확인이 되지 않음
    if (!token) router.push('/login');
  }, []);

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
