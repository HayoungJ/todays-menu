import { useState } from 'react';
import HeaderTemplate from '../../components/templates/HeaderTemplate';

function MainPage() {
  const locationOptions = ['회사'];

  const [location, setLocation] = useState(locationOptions[0]);

  const onLocationSelect = (option: string, index: number) => {
    setLocation(option);
  };

  return (
    <HeaderTemplate
      logoURL="/assets/images/text_logo.png"
      location={location}
      locationOptions={locationOptions}
      handleLocationSelect={(option, index) => onLocationSelect(option, index)}
    />
  );
}

export default MainPage;
