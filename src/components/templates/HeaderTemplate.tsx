import Image from 'next/image';
import SelectBox from '../atoms/SelectBox';

import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;

  padding: 0 1.5rem;
`;

interface IHeaderTemplate {
  logoURL: string;
  location: string;
  locationOptions: string[];
  handleLocationSelect: (option: string, index: number) => any;
}

function HeaderTemplate({
  logoURL,
  location,
  locationOptions,
  handleLocationSelect,
}: IHeaderTemplate) {
  return (
    <StyledHeader>
      <Image src={logoURL} alt="logo" width={160} height={80} />
      <SelectBox
        width={10}
        label={location}
        options={locationOptions}
        handleSelect={handleLocationSelect}
      />
    </StyledHeader>
  );
}

export default HeaderTemplate;
