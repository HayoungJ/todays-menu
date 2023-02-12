import Image from 'next/image';
import SelectBox from '../atoms/SelectBox';

import styled from 'styled-components';
import UserMenu from '../organisms/UserMenu';
import { IMenu } from '../../types/types';

const StyledHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;

  padding: 0 1.5rem;

  z-index: 10;
`;

const LocationSelectBox = styled(SelectBox)`
  margin-left: auto;
  margin-right: 2.2rem;
`;

interface IHeaderTemplate {
  logoURL: string;
  profileURL: string;
  location: string;
  locationOptions: string[];
  userMenus: IMenu[];
  handleLocationSelect: (option: string, index: number) => any;
}

function HeaderTemplate({
  logoURL,
  profileURL,
  location,
  locationOptions,
  userMenus,
  handleLocationSelect,
  ...props
}: IHeaderTemplate) {
  return (
    <StyledHeader {...props}>
      <Image src={logoURL} alt="logo" width={160} height={80} />
      <LocationSelectBox
        width={10}
        label={location}
        options={locationOptions}
        handleSelect={handleLocationSelect}
      />
      <UserMenu profileURL={profileURL} userMenus={userMenus} />
    </StyledHeader>
  );
}

export default HeaderTemplate;
